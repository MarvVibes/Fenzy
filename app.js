/**
 * FINLEY - INTERACTIVE FINTECH APPLICATION LOGIC
 * High-converting interactions, 3D mouse parallax, dynamic calculations, live charts & state
 */

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-reveal');
  initNavbarScroll();
  initMobileMenu();
  initHeroParallax();
  initHeroHeadlineRotator();
  initCardSpotlightHover();
  initCardEntranceAnimations();
  initAiPipelineSimulation();
  initCreditScoreCounter();
  initCountersOnScroll();
});

// 1. Sticky Navigation on Scroll
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// 2. Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

// 3. 3D Mouse Parallax on Hero Stage
function initHeroParallax() {
  const stage = document.querySelector('.phone-showcase-stage');
  const iphone = document.getElementById('iphoneFrame');
  const cardSaves = document.getElementById('floatCardSaves');
  const cardSplit = document.getElementById('floatCardSplit');

  if (!stage || !iphone || window.innerWidth < 1024) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / rect.height) * 10;
    const rotY = (x / rect.width) * 12;

    iphone.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;

    if (cardSaves) {
      cardSaves.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
    }
    if (cardSplit) {
      cardSplit.style.transform = `translate(${x * -0.04}px, ${y * -0.04}px)`;
    }
  });

  stage.addEventListener('mouseleave', () => {
    iphone.style.transform = '';
    if (cardSaves) cardSaves.style.transform = '';
    if (cardSplit) cardSplit.style.transform = '';
  });
}

// Interactive Phone App handlers
window.switchAppTab = function(tab) {
  const tabPayout = document.getElementById('tabPayout');
  const tabCard = document.getElementById('tabCard');
  if (tab === 'payout') {
    tabPayout?.classList.add('active');
    tabCard?.classList.remove('active');
    showToast('Payout mode active: direct bank wire enabled');
  } else {
    tabCard?.classList.add('active');
    tabPayout?.classList.remove('active');
    showToast('Virtual Apple Pay debit card selected');
  }
};

window.triggerGetPaid = function() {
  showToast('Processing instant transfer of $1,469.00 to checking...', 'success');
};


// 4. Interactive Phone Screen Chart Switcher
const phoneChartData = {
  '1D': {
    dArea: 'M 0,65 Q 40,60 80,45 T 160,50 T 260,35 L 260,85 L 0,85 Z',
    dLine: 'M 0,65 Q 40,60 80,45 T 160,50 T 260,35',
    dotY: 35
  },
  '1W': {
    dArea: 'M 0,70 Q 50,65 100,55 T 180,40 T 260,25 L 260,85 L 0,85 Z',
    dLine: 'M 0,70 Q 50,65 100,55 T 180,40 T 260,25',
    dotY: 25
  },
  '1M': {
    dArea: 'M 0,72 Q 40,68 90,52 T 170,42 T 260,18 L 260,85 L 0,85 Z',
    dLine: 'M 0,72 Q 40,68 90,52 T 170,42 T 260,18',
    dotY: 18
  },
  '3M': {
    dArea: 'M 0,75 Q 40,65 80,50 T 160,35 T 260,10 L 260,85 L 0,85 Z',
    dLine: 'M 0,75 Q 40,65 80,50 T 160,35 T 260,10',
    dotY: 10
  },
  '1Y': {
    dArea: 'M 0,80 Q 60,60 120,40 T 200,20 T 260,6 L 260,85 L 0,85 Z',
    dLine: 'M 0,80 Q 60,60 120,40 T 200,20 T 260,6',
    dotY: 6
  }
};

window.switchPhoneChart = function(tf, balance, gain) {
  // Update active pill
  document.querySelectorAll('.screen-time-pills .t-pill').forEach(btn => {
    btn.classList.toggle('active', btn.innerText === tf);
  });

  // Update balance & gain
  const balElem = document.getElementById('phoneBalance');
  const gainElem = document.getElementById('phoneGain');

  if (balElem) {
    balElem.innerText = `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (gainElem) {
    gainElem.innerText = gain;
  }

  // Morph SVG path
  const area = document.getElementById('chartAreaPath');
  const line = document.getElementById('chartLinePath');
  const dot = document.getElementById('chartPulseDot');

  if (phoneChartData[tf] && area && line && dot) {
    area.setAttribute('d', phoneChartData[tf].dArea);
    line.setAttribute('d', phoneChartData[tf].dLine);
    dot.setAttribute('cy', phoneChartData[tf].dotY);
  }
};

// 5. Dismiss Hero Alerts & Apply Tips
window.dismissHeroAlert = function(button, action) {
  const card = document.getElementById('floatCardAlert');
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.85)';
    setTimeout(() => card.remove(), 250);

    if (action === 'canceled') {
      showToast('Adobe Creative Cloud auto-renewal stopped. Saved $29.99/mo!', 'success');
    } else {
      showToast('Renewal alert dismissed for 30 days.');
    }
  }
};

window.applyHeroTip = function(button) {
  button.innerText = '✓ Yield Activated';
  button.disabled = true;
  button.style.color = '#15803D';
  showToast('+$245/yr yield optimization scheduled to your treasury account!', 'success');
};

// 6. Bento Card 1: Interactive Category Selector
window.selectSpendCategory = function(cat, amount, trend, tip) {
  document.querySelectorAll('.category-interactive-pills .cat-pill').forEach(btn => {
    btn.classList.remove('active');
  });
  if (event && event.target) {
    event.target.classList.add('active');
  }

  const figure = document.getElementById('bentoSpendTotal');
  const trendElem = document.getElementById('bentoSpendTrend');
  const tipElem = document.getElementById('spendAiTip');
  const badge = document.getElementById('spendFilterBadge');

  if (figure) figure.innerText = `$${amount.toLocaleString()}`;
  if (trendElem) trendElem.innerText = trend;
  if (tipElem) tipElem.innerText = `AI Insight: ${tip}`;
  if (badge) badge.innerText = cat === 'all' ? 'This Month' : `${cat.toUpperCase()} Focus`;

  // Highlight corresponding bar
  const bars = ['barHousing', 'barFood', 'barFun'];
  bars.forEach(bId => {
    const el = document.getElementById(bId);
    if (el) {
      if (cat === 'all') {
        el.style.opacity = '1';
      } else if ((cat === 'housing' && bId === 'barHousing') ||
                 (cat === 'food' && bId === 'barFood') ||
                 (cat === 'fun' && bId === 'barFun')) {
        el.style.opacity = '1';
        el.querySelector('.p-bar-track').style.transform = 'scaleY(1.3)';
      } else {
        el.style.opacity = '0.35';
        el.querySelector('.p-bar-track').style.transform = 'scaleY(1)';
      }
    }
  });
};

// 7. Bento Card 2: Interactive Monthly Budget Slider
window.updateBudgetSlider = function(val) {
  const income = parseInt(val);
  const incomeLbl = document.getElementById('sliderIncomeVal');
  const budgetVal = document.getElementById('liveBudgetValue');
  const fixedVal = document.getElementById('fixedVal');
  const bufferVal = document.getElementById('bufferVal');
  const reserveVal = document.getElementById('reserveVal');

  if (incomeLbl) incomeLbl.innerText = `$${income.toLocaleString()}/mo`;

  // Dynamic calculations:
  // Fixed expenses ~ 46% of income
  // Dynamic buffer ~ 20%
  // Emergency reserve ~ 34%
  const fixed = Math.round(income * 0.46);
  const buffer = Math.round(income * 0.20);
  const reserve = income - fixed - buffer;
  const targetBudget = fixed + buffer;

  if (budgetVal) budgetVal.innerText = `$${targetBudget.toLocaleString()}`;
  if (fixedVal) fixedVal.innerText = `$${fixed.toLocaleString()} allocated automatically`;
  if (bufferVal) bufferVal.innerText = `Flexible reserve: $${buffer.toLocaleString()}`;
  if (reserveVal) reserveVal.innerText = `Projected growth: +$${reserve.toLocaleString()}/mo`;
};

window.toggleStepDetails = function(stepElem) {
  stepElem.classList.toggle('active');
};

// 8. Bento Card 3: Subscription Manager
let activeSubs = {
  'Amazon Prime': { price: 14.99, active: true },
  'Notion Team': { price: 10.00, active: true },
  'Adobe Creative Cloud': { price: 29.99, active: false } // starts canceled in demo
};

window.toggleSubscriptionState = function(button, price, name) {
  const item = button.closest('.sub-item');
  const isCanceled = button.classList.contains('cancel-btn');

  if (isCanceled) {
    // Reactivate
    button.innerText = 'Active';
    button.className = 'sub-action-btn';
    item.classList.remove('flagged');
    activeSubs[name].active = true;
    showToast(`Reactivated subscription for ${name}`);
  } else {
    // Cancel
    button.innerText = 'Cancel';
    button.className = 'sub-action-btn cancel-btn';
    item.classList.add('flagged');
    activeSubs[name].active = false;
    showToast(`Stopped auto-renewal for ${name}!`, 'success');
  }

  // Recalculate annual savings
  let annualSavings = 0;
  Object.keys(activeSubs).forEach(key => {
    if (!activeSubs[key].active) {
      annualSavings += activeSubs[key].price * 12;
    }
  });

  const savedTag = document.getElementById('subSavedTag');
  if (savedTag) {
    savedTag.innerText = `$${annualSavings.toFixed(2)}/yr potential savings`;
    savedTag.style.transform = 'scale(1.08)';
    setTimeout(() => savedTag.style.transform = 'scale(1)', 200);
  }
};

// 9. Bento Card 4: Europe Trip Goal Deposit Boost
let currentGoalSaved = 2400;
const goalTarget = 5000;

window.boostGoalDeposit = function(amount) {
  currentGoalSaved = Math.min(goalTarget, currentGoalSaved + amount);
  updateGoalUI();
  showToast(`Added +$${amount} deposit to Europe Trip 2027!`, 'success');
};

window.resetGoalDeposit = function() {
  currentGoalSaved = 2400;
  updateGoalUI();
  showToast('Goal savings reset to default snapshot');
};

function updateGoalUI() {
  const currentElem = document.getElementById('goalCurrentVal');
  const percentElem = document.getElementById('goalPercent');
  const fillElem = document.getElementById('goalProgressFill');
  const monthsElem = document.getElementById('goalMonthsLeft');
  const statusElem = document.getElementById('goalStatus');

  const pct = Math.round((currentGoalSaved / goalTarget) * 100);
  const remaining = goalTarget - currentGoalSaved;
  const months = Math.ceil(remaining / 320);

  if (currentElem) currentElem.innerText = `$${currentGoalSaved.toLocaleString()}`;
  if (percentElem) percentElem.innerText = `${pct}%`;
  if (fillElem) fillElem.style.width = `${pct}%`;
  if (monthsElem) monthsElem.innerText = months > 0 ? `${months} months left` : 'Goal reached! 🎉';
  if (statusElem) {
    statusElem.innerText = pct >= 100 ? 'Achieved!' : 'On Track';
  }
}

// 10. Bento Card 5: Investment Timeframe Switcher
const bentoChartConfigs = {
  '1M': { pathArea: 'M 0,65 Q 50,60 90,45 T 180,40 T 280,25 L 280,70 L 0,70 Z', pathLine: 'M 0,65 Q 50,60 90,45 T 180,40 T 280,25' },
  '6M': { pathArea: 'M 0,62 Q 50,58 90,42 T 180,32 T 280,18 L 280,70 L 0,70 Z', pathLine: 'M 0,62 Q 50,58 90,42 T 180,32 T 280,18' },
  '1Y': { pathArea: 'M 0,60 Q 50,55 90,38 T 180,28 T 280,8 L 280,70 L 0,70 Z', pathLine: 'M 0,60 Q 50,55 90,38 T 180,28 T 280,8' },
  'ALL': { pathArea: 'M 0,68 Q 60,52 110,30 T 200,18 T 280,4 L 280,70 L 0,70 Z', pathLine: 'M 0,68 Q 60,52 110,30 T 200,18 T 280,4' }
};

window.switchBentoChart = function(tf, value, gain) {
  document.querySelectorAll('.bento-chart-tabs .bc-tab').forEach(b => {
    b.classList.toggle('active', b.innerText === tf);
  });

  const valElem = document.getElementById('bentoInvVal');
  const gainElem = document.getElementById('bentoInvGain');

  if (valElem) valElem.innerText = `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (gainElem) gainElem.querySelector('span').innerText = gain;

  const area = document.getElementById('bentoAreaPath');
  const line = document.getElementById('bentoLinePath');

  if (bentoChartConfigs[tf] && area && line) {
    area.setAttribute('d', bentoChartConfigs[tf].pathArea);
    line.setAttribute('d', bentoChartConfigs[tf].pathLine);
  }
};

// 11. Bento Card 6: Credit Score Hover & Guidance
window.gaugeHoverEffect = function(e) {
  const arc = document.getElementById('creditArc');
  if (arc) {
    arc.style.strokeWidth = '14';
  }
};

window.gaugeHoverReset = function() {
  const arc = document.getElementById('creditArc');
  if (arc) {
    arc.style.strokeWidth = '12';
  }
};

window.showFactorTip = function(tipText) {
  showToast(tipText, 'info');
};

function initCreditScoreCounter() {
  const creditElem = document.getElementById('liveCreditScore');
  if (!creditElem) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateScore(creditElem, 680, 742, 1000);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(creditElem);
}

function animateScore(elem, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    elem.innerText = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// 12. Kinetic Animated Hero Headline Rotator
function initHeroHeadlineRotator() {
  const container = document.getElementById('heroRotatorWrap');
  if (!container) return;

  const words = container.querySelectorAll('.hero-rotator-text');
  if (words.length <= 1) return;

  let currentIndex = 0;

  setInterval(() => {
    const currentWord = words[currentIndex];
    currentWord.classList.remove('active');
    currentWord.classList.add('exit');

    setTimeout(() => {
      currentWord.classList.remove('exit');
    }, 600);

    currentIndex = (currentIndex + 1) % words.length;
    const nextWord = words[currentIndex];
    nextWord.classList.add('active');
  }, 2800);
}

// Interactive Spotlight Hover Effect on Cards
function initCardSpotlightHover() {
  const cards = document.querySelectorAll('.bento-card, .pricing-card, .float-card-saves, .float-card-split');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// 13. Smooth Staggered Card Entrance Animations on Scroll
function initCardEntranceAnimations() {
  const entranceCards = document.querySelectorAll('.card-entrance');
  if (!entranceCards.length) return;

  if (!('IntersectionObserver' in window)) {
    entranceCards.forEach(card => card.classList.add('is-entered'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-entered');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  entranceCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
      // If already in initial viewport, enter immediately
      card.classList.add('is-entered');
    } else {
      observer.observe(card);
    }
  });
}

// Number Count-up on scroll
function initCountersOnScroll() {
  const animatedElements = document.querySelectorAll('[data-count-target]');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count-target'));
        const prefix = el.getAttribute('data-count-prefix') || '';
        const suffix = el.getAttribute('data-count-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
        animateNumericValue(el, 0, target, 1200, prefix, suffix, decimals);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  animatedElements.forEach(el => observer.observe(el));
}

function animateNumericValue(elem, start, end, duration, prefix = '', suffix = '', decimals = 0) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const val = (easeOut * (end - start) + start).toFixed(decimals);
    elem.innerText = `${prefix}${parseFloat(val).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// 13. Deep Dive: AI Neural Pipeline Simulation
let pipelineActiveIdx = 2;

function initAiPipelineSimulation() {
  const pipeline = document.getElementById('aiPipeline');
  if (!pipeline) return;

  setInterval(() => {
    pipelineActiveIdx = (pipelineActiveIdx + 1) % 4;
    setPipelineActive(pipelineActiveIdx);
  }, 3200);
}

window.setPipelineActive = function(index) {
  pipelineActiveIdx = index;
  const pipeline = document.getElementById('aiPipeline');
  if (!pipeline) return;

  const steps = pipeline.querySelectorAll('.pipeline-step');
  steps.forEach((step, idx) => {
    if (idx < index) {
      step.className = 'pipeline-step completed';
      step.querySelector('.step-check').innerHTML = '✓';
    } else if (idx === index) {
      step.className = 'pipeline-step active';
      step.querySelector('.step-check').innerHTML = '<div class="mini-spinner"></div>';
    } else {
      step.className = 'pipeline-step queued';
      step.querySelector('.step-check').innerHTML = '○';
    }
  });

  // Highlight step 3 when reached
  if (index === 3) {
    setTimeout(() => {
      if (pipelineActiveIdx === 3) {
        const lastStep = steps[3];
        if (lastStep) {
          lastStep.className = 'pipeline-step completed pulse-glow';
          lastStep.querySelector('.step-check').innerHTML = '✓';
        }
      }
    }, 1800);
  }
};

// 13. Deep Dive: Apply Recommendation
window.applyRecommendation = function(button) {
  button.innerText = 'Optimizing...';
  button.disabled = true;

  setTimeout(() => {
    button.innerText = '✓ Applied (+$320/mo)';
    button.style.backgroundColor = '#16A34A';
    showToast('Applied recommendation: $320 redirected into High-Yield Cash reserve!', 'success');
  }, 700);
};

// 14. Pricing Toggle Logic
let currentBilling = 'monthly';

const pricingData = {
  monthly: {
    personal: { amount: '19', period: '/month', note: 'Billed monthly' },
    pro: { amount: '39', period: '/month', note: 'Billed monthly' }
  },
  yearly: {
    personal: { amount: '15', period: '/month', note: 'Billed annually ($180/yr - Save $48)' },
    pro: { amount: '31', period: '/month', note: 'Billed annually ($372/yr - Save $96)' }
  }
};

window.setBillingCycle = function(cycle) {
  currentBilling = cycle;
  const btnMonthly = document.getElementById('btnMonthly');
  const btnYearly = document.getElementById('btnYearly');

  const personalAmt = document.getElementById('personalAmount');
  const personalPeriod = document.getElementById('personalPeriod');
  const personalNote = document.getElementById('personalBilledNote');

  const proAmt = document.getElementById('proAmount');
  const proPeriod = document.getElementById('proPeriod');
  const proNote = document.getElementById('proBilledNote');

  if (cycle === 'yearly') {
    btnYearly.classList.add('active');
    btnMonthly.classList.remove('active');
  } else {
    btnMonthly.classList.add('active');
    btnYearly.classList.remove('active');
  }

  animateValue(personalAmt, parseInt(personalAmt.innerText), parseInt(pricingData[cycle].personal.amount), 250);
  personalPeriod.innerText = pricingData[cycle].personal.period;
  personalNote.innerText = pricingData[cycle].personal.note;

  animateValue(proAmt, parseInt(proAmt.innerText), parseInt(pricingData[cycle].pro.amount), 250);
  proPeriod.innerText = pricingData[cycle].pro.period;
  proNote.innerText = pricingData[cycle].pro.note;

  showToast(`Switched to ${cycle} billing`);
};

function animateValue(elem, start, end, duration) {
  if (start === end) return;
  const range = end - start;
  let current = start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  const timer = setInterval(() => {
    current += increment;
    elem.innerText = current;
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// 15. Plan Selection & Modal
window.selectPlan = function(planName) {
  const selectElem = document.getElementById('selectedPlanInput');
  if (selectElem) selectElem.value = planName;
  openAuthModal('signup', planName);
};

window.openAuthModal = function(type = 'signup', planName = 'Pro') {
  const modal = document.getElementById('authModal');
  const title = document.getElementById('modalTitle');
  const planSelect = document.getElementById('selectedPlanInput');

  if (planSelect && planName) planSelect.value = planName;
  if (title) title.innerText = `Get Started with Finley ${planName}`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeAuthModal = function() {
  const modal = document.getElementById('authModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
};

window.addEventListener('click', (e) => {
  const modal = document.getElementById('authModal');
  if (e.target === modal) closeAuthModal();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAuthModal();
});

window.handleAuthSubmit = function(event) {
  event.preventDefault();
  const name = document.getElementById('fullNameInput').value;
  const plan = document.getElementById('selectedPlanInput').value;

  closeAuthModal();
  showToast(`Welcome to Finley, ${name}! Your 14-day free ${plan} trial is now active.`, 'success');
};

// 16. Toast Utility
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item ${type === 'success' ? 'success' : ''}`;
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#22C55E' : '#FFFFFF'}" stroke-width="2.5">
      ${type === 'success' ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
};
