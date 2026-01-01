// =====================================================
// AttenX-AI Main JavaScript
// Dynamic interactions and animations
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all modules
  initLoader();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initBackToTop();
  initCounterAnimation();
  initToolsFilter();
  
});

// =====================================================
// Page Loader
// =====================================================
function initLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        loader.classList.add('hidden');
      }, 500);
    });
  }
}

// =====================================================
// Navbar Scroll Effect
// =====================================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// =====================================================
// Mobile Menu Toggle
// =====================================================
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!toggle || !navLinks) return;
  
  toggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    toggle.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      toggle.classList.remove('active');
    }
  });
}

// =====================================================
// Scroll Reveal Animations
// =====================================================
function initScrollAnimations() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animateElements.length === 0) return;
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateElements.forEach(function(el) {
    observer.observe(el);
  });
}

// =====================================================
// Back to Top Button
// =====================================================
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// =====================================================
// Animated Counters
// =====================================================
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  
  if (counters.length === 0) return;
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(function(counter) {
    observer.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count')) || 0;
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(function() {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, 16);
}

// =====================================================
// AI Tools Filter
// =====================================================
function initToolsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const toolCards = document.querySelectorAll('.tool-card');
  
  if (filterBtns.length === 0) return;
  
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      // Update active state
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      toolCards.forEach(function(card) {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// =====================================================
// Smooth Scroll for Anchor Links
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// =====================================================
// Parallax Effect for Hero
// =====================================================
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const scrolled = window.scrollY;
  const floatingCards = hero.querySelectorAll('.floating-card');
  
  floatingCards.forEach(function(card, index) {
    const speed = 0.1 + (index * 0.05);
    card.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
  });
});

// =====================================================
// Form Validation
// =====================================================
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const inputs = form.querySelectorAll('.form-input[required]');
      let isValid = true;
      
      inputs.forEach(function(input) {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // Success animation
        const btn = form.querySelector('.btn');
        if (btn) {
          btn.textContent = 'Message Sent! ✓';
          btn.style.background = '#10B981';
          
          setTimeout(function() {
            form.reset();
            btn.textContent = 'Send Message';
            btn.style.background = '';
          }, 3000);
        }
      }
    });
  });
}

// =====================================================
// Typing Effect for Hero Title
// =====================================================
function initTypingEffect() {
  const typingElements = document.querySelectorAll('.typing-effect');
  
  typingElements.forEach(function(element) {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, 50);
      }
    }
    
    type();
  });
}

// =====================================================
// Cursor Glow Effect (Optional)
// =====================================================
function initCursorGlow() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  cursor.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}
