// Theme and Cookie Consent Management
class SiteManager {
  constructor() {
    this.hasConsent = false;
    this.currentTheme = 'light';
    this.init();
  }

  init() {
    this.checkConsent();
    this.setupEventListeners();
    this.setupSmoothScrolling();
    this.updateThemeIcon();
  }

  // Cookie Consent Management
  checkConsent() {
    // Check if user has already given or declined consent
    const consentStatus = localStorage.getItem('cookie-consent');
    
    if (!consentStatus) {
      this.showCookieConsent();
    } else {
      this.hasConsent = consentStatus === 'accepted';
      if (this.hasConsent) {
        this.loadThemePreference();
      }
    }
  }

  showCookieConsent() {
    const consentBanner = document.getElementById('cookie-consent');
    consentBanner.style.display = 'block';
  }

  hideCookieConsent() {
    const consentBanner = document.getElementById('cookie-consent');
    consentBanner.style.display = 'none';
  }

  acceptCookies() {
    this.hasConsent = true;
    localStorage.setItem('cookie-consent', 'accepted');
    this.hideCookieConsent();
    this.loadThemePreference();
  }

  declineCookies() {
    this.hasConsent = false;
    localStorage.setItem('cookie-consent', 'declined');
    this.hideCookieConsent();
    // Don't load theme preferences, use default
    this.applyTheme('light');
  }

  // Theme Management
  loadThemePreference() {
    if (!this.hasConsent) return;
    
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.applyTheme(savedTheme);
    } else {
      // Check user's system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
      this.applyTheme(this.currentTheme);
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    
    if (this.hasConsent) {
      localStorage.setItem('site-theme', this.currentTheme);
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
    }
  }

  // Event Listeners
  setupEventListeners() {
    // Cookie consent buttons
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => this.acceptCookies());
    }
    
    if (declineBtn) {
      declineBtn.addEventListener('click', () => this.declineCookies());
    }

    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.hasConsent && !localStorage.getItem('site-theme')) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
      }
    });

    // Mobile menu toggle (if needed)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
        mobileToggle.classList.toggle('active');
      });
    }
  }

  // Smooth Scrolling Navigation
  setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle anchor links (starting with #)
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const navHeight = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // Highlight active navigation link
  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.main-nav').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 50;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
}

// Navigation scroll effects
class NavigationEffects {
  constructor() {
    this.nav = document.querySelector('.main-nav');
    this.init();
  }

  init() {
    this.setupScrollEffects();
  }

  setupScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add shadow on scroll
      if (scrollTop > 10) {
        this.nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
      } else {
        this.nav.style.boxShadow = 'none';
      }
      
      lastScrollTop = scrollTop;
    });
  }
}

// Interactive Calculator for Immigration Economics
class ImmigrationCalculator {
  constructor() {
    this.scenarios = {
      pessimistic: {
        employmentRate: 30,
        salary: 20000,
        multiplier: 2.0,
        integrationCost: 8000
      },
      realistic: {
        employmentRate: 52,
        salary: 23760,
        multiplier: 3.4,
        integrationCost: 5428
      },
      optimistic: {
        employmentRate: 70,
        salary: 28000,
        multiplier: 4.3,
        integrationCost: 4000
      }
    };
    
    this.init();
  }

  init() {
    this.setupCalculator();
    this.setupScenarioCards();
  }

  setupCalculator() {
    const calculatorElement = document.getElementById('immigration-calculator');
    if (!calculatorElement) return;

    // Setup input listeners
    const inputs = calculatorElement.querySelectorAll('input, select');
    inputs.forEach(input => {
      input.addEventListener('input', () => this.updateResults());
    });

    // Initial calculation
    this.updateResults();
  }

  setupScenarioCards() {
    const scenarioCards = document.querySelectorAll('.scenario-card');
    scenarioCards.forEach(card => {
      card.addEventListener('click', () => {
        const scenario = card.dataset.scenario;
        if (scenario && this.scenarios[scenario]) {
          this.applyScenario(scenario);
        }
      });
    });
  }

  applyScenario(scenarioName) {
    const scenario = this.scenarios[scenarioName];
    
    // Update form inputs
    const employmentInput = document.getElementById('employment-rate');
    const salaryInput = document.getElementById('annual-salary');
    const multiplierInput = document.getElementById('multiplier');
    const integrationInput = document.getElementById('integration-cost');

    if (employmentInput) employmentInput.value = scenario.employmentRate;
    if (salaryInput) salaryInput.value = scenario.salary;
    if (multiplierInput) multiplierInput.value = scenario.multiplier;
    if (integrationInput) integrationInput.value = scenario.integrationCost;

    this.updateResults();
  }

  updateResults() {
    const employmentRate = parseFloat(document.getElementById('employment-rate')?.value) || 52;
    const annualSalary = parseFloat(document.getElementById('annual-salary')?.value) || 23760;
    const multiplier = parseFloat(document.getElementById('multiplier')?.value) || 3.4;
    const integrationCost = parseFloat(document.getElementById('integration-cost')?.value) || 5428;
    const timeHorizon = parseInt(document.getElementById('time-horizon')?.value) || 20;

    // Tax calculations
    const totalTaxRate = 0.45; // 45% total tax burden
    const consumptionTaxRate = 0.20; // 20% weighted VAT
    const consumptionRate = 0.95; // 95% of income consumed

    // Annual calculations
    const directTaxes = annualSalary * totalTaxRate * (employmentRate / 100);
    const consumptionTaxes = annualSalary * consumptionRate * consumptionTaxRate * (employmentRate / 100);
    const indirectTaxes = annualSalary * (multiplier - 1) * totalTaxRate * 0.5 * (employmentRate / 100);
    
    const totalAnnualRevenue = directTaxes + consumptionTaxes + indirectTaxes;
    
    // Social benefits for unemployed
    const unemploymentRate = (100 - employmentRate) / 100;
    const socialBenefits = unemploymentRate * (9600 + 4200 + 3600); // unemployment + housing + basic income support
    
    // Net annual impact after first few years (when integration costs end)
    const netAnnualImpact = totalAnnualRevenue - socialBenefits;
    
    // NPV calculation
    let npv = 0;
    const discountRate = 0.03;
    
    for (let year = 1; year <= timeHorizon; year++) {
      let yearlyBenefit;
      if (year <= 3) {
        // First 3 years include integration costs
        yearlyBenefit = totalAnnualRevenue - socialBenefits - integrationCost;
      } else {
        yearlyBenefit = netAnnualImpact;
      }
      
      npv += yearlyBenefit / Math.pow(1 + discountRate, year);
    }

    // Payback period calculation
    let cumulativeCashFlow = 0;
    let paybackPeriod = 0;
    
    for (let year = 1; year <= 10; year++) {
      let yearlyBenefit;
      if (year <= 3) {
        yearlyBenefit = totalAnnualRevenue - socialBenefits - integrationCost;
      } else {
        yearlyBenefit = netAnnualImpact;
      }
      
      cumulativeCashFlow += yearlyBenefit;
      
      if (cumulativeCashFlow > 0 && paybackPeriod === 0) {
        paybackPeriod = year;
        break;
      }
    }

    // Update display
    this.displayResults({
      npv: npv,
      paybackPeriod: paybackPeriod,
      annualRevenue: totalAnnualRevenue,
      netAnnualImpact: netAnnualImpact,
      directTaxes: directTaxes,
      indirectTaxes: indirectTaxes,
      socialBenefits: socialBenefits
    });
  }

  displayResults(results) {
    const displayElements = {
      'npv-result': this.formatCurrency(results.npv),
      'payback-result': results.paybackPeriod > 0 ? `${results.paybackPeriod} vuotta` : 'Ei maksa takaisin 10 vuodessa',
      'annual-revenue-result': this.formatCurrency(results.annualRevenue),
      'net-annual-result': this.formatCurrency(results.netAnnualImpact),
      'direct-taxes-result': this.formatCurrency(results.directTaxes),
      'indirect-taxes-result': this.formatCurrency(results.indirectTaxes),
      'social-benefits-result': this.formatCurrency(results.socialBenefits)
    };

    Object.entries(displayElements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
        
        // Add color coding for NPV and net annual impact
        if (id === 'npv-result' || id === 'net-annual-result') {
          const parentDisplay = element.closest('.result-display');
          if (parentDisplay) {
            parentDisplay.classList.remove('positive', 'negative');
            if (results.npv > 0 || results.netAnnualImpact > 0) {
              parentDisplay.classList.add('positive');
            } else {
              parentDisplay.classList.add('negative');
            }
          }
        }
      }
    });
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }
}

// Animation utilities
class AnimationUtils {
  static observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1
    });

    // Observe cards and result elements
    document.querySelectorAll('.country-card, .method-card, .result-item, .info-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  }

  static counterAnimation(element, targetValue, suffix = '') {
    let currentValue = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      element.textContent = Math.round(currentValue) + suffix;
    }, 20);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const siteManager = new SiteManager();
  const navEffects = new NavigationEffects();
  const calculator = new ImmigrationCalculator();
  
  // Setup animations
  AnimationUtils.observeElements();
  
  // Update active nav link on scroll
  window.addEventListener('scroll', () => {
    siteManager.updateActiveNavLink();
  });
  
  // Animate result numbers on page load
  setTimeout(() => {
    document.querySelectorAll('.result-number').forEach(el => {
      const value = parseInt(el.textContent.replace(/\D/g, ''));
      if (value) {
        AnimationUtils.counterAnimation(el, value, el.textContent.replace(/\d/g, ''));
      }
    });
  }, 500);
});

// Handle page visibility change (for better UX)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Page became visible, check if theme needs updating
    const siteManager = window.siteManager;
    if (siteManager && siteManager.hasConsent) {
      siteManager.loadThemePreference();
    }
  }
});

// Export for global access
window.SiteManager = SiteManager;
window.ImmigrationCalculator = ImmigrationCalculator;
