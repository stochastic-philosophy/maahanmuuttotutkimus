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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const siteManager = new SiteManager();
  const navEffects = new NavigationEffects();
  
  // Update active nav link on scroll
  window.addEventListener('scroll', () => {
    siteManager.updateActiveNavLink();
  });
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
