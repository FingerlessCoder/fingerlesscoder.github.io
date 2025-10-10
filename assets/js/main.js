// Main site interactions: mobile nav, theme toggle, year injection, modern animations
(function() {
  const root = document.documentElement;
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navMenu');
  const themeToggle = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');

  // Set current year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme persistence
  const THEME_KEY = 'site-theme-v1';
  const preferred = localStorage.getItem(THEME_KEY);
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (!preferred) {
    root.dataset.theme = systemDark ? 'dark' : 'light';
  } else {
    root.dataset.theme = preferred;
  }

  function toggleTheme() {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem(THEME_KEY, next);
    if (themeToggle) themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    // Set initial icon
    themeToggle.textContent = root.dataset.theme === 'dark' ? '🌙' : '☀️';
  }

  // Mobile curtain menu (slide down)
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('menu-backdrop');
  const closeBtn = document.getElementById('close-menu-btn');

  function openMenu() {
    if (menu && backdrop) {
      menu.style.height = '100vh';
      backdrop.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  function closeMenu() {
    if (menu && backdrop) {
      menu.style.height = '0';
      backdrop.classList.add('hidden');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }

  if (btn && menu) {
    btn.addEventListener('click', () => {
      const isOpen = menu.style.height === '100vh';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Close menu when clicking backdrop
  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Close menu when clicking close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu && menu.style.height === '100vh') {
      closeMenu();
    }
  });

  // Make closeMenu available globally for onclick handlers
  window.closeMenu = closeMenu;

  // Make closeMenu available globally for onclick handlers
  window.closeMenu = closeMenu;

  // Reduce motion preference: skip animations if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.removeAttribute('data-animate');
    });
  }

  // Modern Interactive Features

  // 1. Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 2. Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for multiple items
        setTimeout(() => {
          entry.target.classList.add('animate-scale-in');
          entry.target.style.opacity = '1';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation with initial opacity 0
  document.querySelectorAll('.card:not(.animate-fade-in-up), .project-card, .skill-badge, .chip').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // 3. Parallax effect for hero background
  let ticking = false;
  function updateParallax() {
    // Use a robust scrollTop read that covers different browsers and autoscroll modes
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
  }

  function requestParallaxUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestParallaxUpdate);

  // 4. Enhanced button hover effects
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // 5. Dynamic cursor effect (optional - modern touch)
  // const cursor = document.createElement('div');
  // cursor.className = 'custom-cursor';
  // cursor.style.cssText = `
  //   position: fixed;
  //   width: 20px;
  //   height: 20px;
  //   background: rgba(59, 130, 246, 0.3);
  //   border-radius: 50%;
  //   pointer-events: none;
  //   z-index: 9999;
  //   transition: transform 0.1s ease;
  //   display: none;
  // `;
  // document.body.appendChild(cursor);

  // let mouseX = 0, mouseY = 0;

  // document.addEventListener('mousemove', (e) => {
  //   mouseX = e.clientX;
  //   mouseY = e.clientY;

  //   cursor.style.left = mouseX - 10 + 'px';
  //   cursor.style.top = mouseY - 10 + 'px';
  //   cursor.style.display = 'block';
  // });

  // // Hide cursor when leaving window
  // document.addEventListener('mouseleave', () => {
  //   cursor.style.display = 'none';
  // });

  // 6. Dynamic Color System - Auto Hue Rotation
  class DynamicColorSystem {
    constructor() {
      this.currentHue = 280; // Starting purple
      this.isAutoMode = true;
      this.autoInterval = null;
      this.colorPresets = [
        { name: 'Purple Magic', hue: 280, sat: 70, light: 60 },
        { name: 'Electric Blue', hue: 220, sat: 80, light: 65 },
        { name: 'Cyber Green', hue: 120, sat: 75, light: 55 },
        { name: 'Neon Pink', hue: 320, sat: 85, light: 70 },
        { name: 'Solar Orange', hue: 30, sat: 90, light: 60 },
        { name: 'Arctic Cyan', hue: 180, sat: 70, light: 65 },
        { name: 'Royal Red', hue: 0, sat: 80, light: 60 }
      ];
      this.init();
    }

    init() {
      // Only create color controls on larger screens to avoid mobile layout issues
      if (window.innerWidth >= 768) {
        this.createColorControls();
      }
      this.startAutoMode();
      this.bindEvents();
    }

    createColorControls() {
      // Create floating color control panel
      const panel = document.createElement('div');
      panel.className = 'color-control-panel';
      panel.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: rgba(10, 10, 10, 0.9);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 16px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 200px;
        max-width: calc(100vw - 40px);
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      `;

      // Toggle button
      const toggleBtn = document.createElement('button');
      toggleBtn.innerHTML = '🎨';
      toggleBtn.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(10, 10, 10, 0.8);
        color: white;
        font-size: 20px;
        cursor: pointer;
        z-index: 1001;
        transition: all 0.3s ease;
      `;

      // Auto mode toggle
      const autoToggle = document.createElement('button');
      autoToggle.textContent = 'Auto Mode: ON';
      autoToggle.className = 'auto-toggle';
      autoToggle.style.cssText = `
        padding: 8px 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
      `;

      // Color presets
      const presetsContainer = document.createElement('div');
      presetsContainer.style.cssText = `
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
      `;

      this.colorPresets.forEach(preset => {
        const btn = document.createElement('button');
        btn.textContent = preset.name.split(' ')[0];
        btn.style.cssText = `
          padding: 6px 8px;
          border: 1px solid hsl(${preset.hue}, ${preset.sat}%, ${preset.light}%);
          background: hsl(${preset.hue}, ${preset.sat}%, ${preset.light}%, 0.2);
          color: hsl(${preset.hue}, ${preset.sat}%, 80%);
          border-radius: 4px;
          cursor: pointer;
          font-size: 10px;
          transition: all 0.3s ease;
        `;
        btn.onclick = () => this.setColor(preset.hue, preset.sat, preset.light);
        presetsContainer.appendChild(btn);
      });

      panel.appendChild(autoToggle);
      panel.appendChild(presetsContainer);
      document.body.appendChild(toggleBtn);
      document.body.appendChild(panel);

      // Toggle panel visibility
      toggleBtn.onclick = () => {
        const isOpen = panel.style.transform === 'translateX(0%)';
        panel.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0%)';
        toggleBtn.style.left = isOpen ? '20px' : '220px';
      };

      // Auto mode toggle
      autoToggle.onclick = () => {
        this.isAutoMode = !this.isAutoMode;
        autoToggle.textContent = `Auto Mode: ${this.isAutoMode ? 'ON' : 'OFF'}`;
        if (this.isAutoMode) {
          this.startAutoMode();
        } else {
          this.stopAutoMode();
        }
      };
    }

    setColor(hue, saturation = 70, lightness = 60) {
      this.currentHue = hue;
      document.documentElement.style.setProperty('--dynamic-hue', hue);
      document.documentElement.style.setProperty('--dynamic-saturation', saturation + '%');
      document.documentElement.style.setProperty('--dynamic-lightness', lightness + '%');

      // Smooth transition effect
      document.body.style.transition = 'all 0.8s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 800);
    }

    startAutoMode() {
      if (this.autoInterval) clearInterval(this.autoInterval);

      this.autoInterval = setInterval(() => {
        if (this.isAutoMode) {
          // Smooth hue rotation
          this.currentHue = (this.currentHue + 2) % 360;
          this.setColor(this.currentHue);
        }
      }, 100); // Update every 100ms for smooth animation
    }

    stopAutoMode() {
      if (this.autoInterval) {
        clearInterval(this.autoInterval);
        this.autoInterval = null;
      }
    }

    bindEvents() {
      // Mouse movement influences hue (subtle effect)
      let mouseInfluence = 0;
      document.addEventListener('mousemove', (e) => {
        if (!this.isAutoMode) {
          const mouseX = e.clientX / window.innerWidth;
          mouseInfluence = mouseX * 60; // 0-60 degree influence
          this.setColor(this.currentHue + mouseInfluence);
        }
      });

      // Scroll influences saturation
      let scrollInfluence = 70;
      window.addEventListener('scroll', () => {
        // Compute scroll percent using documentElement which is more reliable across browsers
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const scrollPercent = scrollTop / (docHeight - window.innerHeight || 1);
        scrollInfluence = 50 + (scrollPercent * 40); // 50-90% saturation
        document.documentElement.style.setProperty('--dynamic-saturation', scrollInfluence + '%');
      });
    }
  }

  // 7. Enhanced Micro-interactions
  class MicroInteractions {
    constructor() {
      this.init();
    }

    init() {
      this.addPageLoadAnimation();
      this.enhanceSocialLinks();
      this.addKeyboardNavigation();
      this.addLoadingStates();
      this.addImageLazyLoading();
    }

    addPageLoadAnimation() {
      // Add fade-in animation to body
      document.body.style.opacity = '0';
      document.body.style.transform = 'translateY(20px)';
      document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

      // Trigger animation after a short delay
      setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
      }, 100);
    }

    enhanceSocialLinks() {
      // Enhanced hover effects for social links
      document.querySelectorAll('a[href*="github"], a[href*="linkedin"], a[href*="mailto"]').forEach(link => {
        link.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-3px) scale(1.1)';
          this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
        });

        link.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
          this.style.boxShadow = '';
        });

        // Add ripple effect on click
        link.addEventListener('click', function(e) {
          const ripple = document.createElement('span');
          ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
          `;

          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          ripple.style.width = ripple.style.height = size + 'px';
          ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
          ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

          this.appendChild(ripple);
          setTimeout(() => ripple.remove(), 600);
        });
      });
    }

    addKeyboardNavigation() {
      // Enhanced keyboard navigation
      document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape' && navList.classList.contains('is-open')) {
          toggleNav();
        }

        // Tab navigation improvements
        if (e.key === 'Tab') {
          const focusableElements = document.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      });
    }

    addLoadingStates() {
      // Add loading states for navigation links
      document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
          if (this.hostname === window.location.hostname) {
            // Internal link - add loading state
            this.style.pointerEvents = 'none';
            this.style.opacity = '0.7';

            // Remove loading state after navigation (fallback)
            setTimeout(() => {
              this.style.pointerEvents = '';
              this.style.opacity = '';
            }, 1000);
          }
        });
      });
    }

    addImageLazyLoading() {
      // Enhanced lazy loading for images with proper loaded class handling
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            // Add loaded class when image comes into view
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '50px' });

      // Handle images with lazy class
      document.querySelectorAll('img.lazy').forEach(img => {
        // Add load event listener to ensure loaded class is added when image loads
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });

        // If image is already loaded (cached), add loaded class immediately
        if (img.complete && img.naturalHeight !== 0) {
          img.classList.add('loaded');
        }

        // Observe for intersection
        imageObserver.observe(img);
      });
    }
  }

  // Initialize the dynamic color system
  const colorSystem = new DynamicColorSystem();

  // Initialize micro-interactions
  const microInteractions = new MicroInteractions();
})();
