Add-Type -AssemblyName System.Drawing
$imgPath = "c:\Users\NEW\Desktop\Fenzy\assets\hand_phone.jpg"
$outPath = "c:\Users\NEW\Desktop\Fenzy\assets\hand_phone_transparent.png"

$src = [System.Drawing.Bitmap]::FromFile($imgPath)
$bmp = New-Object System.Drawing.Bitmap($src.Width, $src.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Lock bits for blazing fast execution
$rect = New-Object System.Drawing.Rectangle(0, 0, $src.Width, $src.Height)
$srcData = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$dstData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$bytes = $src.Width * $src.Height * 4
$srcBuffer = New-Object byte[] $bytes
$dstBuffer = New-Object byte[] $bytes

[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcBuffer, 0, $bytes)

for ($i = 0; $i -lt $bytes; $i += 4) {
    $b = [int]$srcBuffer[$i]
    $g = [int]$srcBuffer[$i+1]
    $r = [int]$srcBuffer[$i+2]
    
    # Check if pixel is white/near-white background
    if ($r -gt 238 -and $g -gt 238 -and $b -gt 238) {
        $dstBuffer[$i] = 0
        $dstBuffer[$i+1] = 0
        $dstBuffer[$i+2] = 0
        $dstBuffer[$i+3] = 0 # Alpha = 0
    } elseif ($r -gt 225 -and $g -gt 225 -and $b -gt 225) {
        # Soft antialiasing falloff
        $avg = ($r + $g + $b) / 3.0
        $alpha = [byte]([math]::Max(0, [math]::Min(255, (238 - $avg) * 19.6)))
        $dstBuffer[$i] = $b
        $dstBuffer[$i+1] = $g
        $dstBuffer[$i+2] = $r
        $dstBuffer[$i+3] = $alpha
    } else {
        $dstBuffer[$i] = $b
        $dstBuffer[$i+1] = $g
        $dstBuffer[$i+2] = $r
        $dstBuffer[$i+3] = 255 # Opaque
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($dstBuffer, 0, $dstData.Scan0, $bytes)

$src.UnlockBits($srcData)
$bmp.UnlockBits($dstData)

$src.Dispose()
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "Success: Generated transparent hand phone PNG"
