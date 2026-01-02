// =====================================================
// AttenX-AI Main JavaScript
// Dynamic interactions and animations
// =====================================================

document.addEventListener('DOMContentLoaded', function () {

  // Initialize all modules
  initLoader();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initBackToTop();
  initCounterAnimation();
  initToolsFilter();
  initCopyButtons(); // Initialize copy buttons
  initAuth(); // Initialize authentication

});

// =====================================================
// Page Loader
// =====================================================
function initLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
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

  window.addEventListener('scroll', function () {
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

  toggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('active');
      toggle.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
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

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(function (el) {
    observer.observe(el);
  });
}

// =====================================================
// Back to Top Button
// =====================================================
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', function (e) {
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

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count')) || 0;
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(function () {
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

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active state
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      toolCards.forEach(function (card) {
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
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
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
window.addEventListener('scroll', function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const scrolled = window.scrollY;
  const floatingCards = hero.querySelectorAll('.floating-card');

  floatingCards.forEach(function (card, index) {
    const speed = 0.1 + (index * 0.05);
    card.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
  });
});

// =====================================================
// Form Validation
// =====================================================
function initFormValidation() {
  const forms = document.querySelectorAll('form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const inputs = form.querySelectorAll('.form-input[required]');
      let isValid = true;

      inputs.forEach(function (input) {
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

          setTimeout(function () {
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

  typingElements.forEach(function (element) {
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

  document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

// =====================================================
// Authentication System (LocalStorage-based)
// =====================================================

// Initialize auth state on page load
function initAuth() {
  updateNavForAuth();
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('attenx_token') !== null;
}

// Get current user data
function getCurrentUser() {
  const userData = localStorage.getItem('attenx_user');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (e) {
      return null;
    }
  }
  return null;
}

// Get stored users from localStorage
function getStoredUsers() {
  const users = localStorage.getItem('attenx_users');
  if (users) {
    try {
      return JSON.parse(users);
    } catch (e) {
      return {};
    }
  }
  return {};
}

// Save users to localStorage
function saveStoredUsers(users) {
  localStorage.setItem('attenx_users', JSON.stringify(users));
}

// Simple hash function for password (NOT secure for production)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

// Register a new user
function registerUser(name, email, password) {
  const users = getStoredUsers();

  if (users[email]) {
    return { success: false, message: 'Email already registered' };
  }

  const user = {
    name: name,
    email: email,
    password: simpleHash(password),
    createdAt: new Date().toISOString()
  };

  users[email] = user;
  saveStoredUsers(users);

  // Auto login after register
  const token = 'atx_' + Date.now() + '_' + simpleHash(email);
  localStorage.setItem('attenx_token', token);
  localStorage.setItem('attenx_user', JSON.stringify({ name, email }));

  return { success: true, user: { name, email }, token };
}

// Login user
function loginUser(email, password) {
  const users = getStoredUsers();
  const user = users[email];

  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  if (user.password !== simpleHash(password)) {
    return { success: false, message: 'Invalid email or password' };
  }

  const token = 'atx_' + Date.now() + '_' + simpleHash(email);
  localStorage.setItem('attenx_token', token);
  localStorage.setItem('attenx_user', JSON.stringify({ name: user.name, email: user.email }));

  return { success: true, user: { name: user.name, email: user.email }, token };
}

// Logout user
function logout() {
  localStorage.removeItem('attenx_token');
  localStorage.removeItem('attenx_user');
  updateNavForAuth();

  // Determine correct path for redirect
  const isInPages = window.location.pathname.includes('/pages/');
  window.location.href = isInPages ? '../index.html' : 'index.html';
}

// Update navigation based on auth state
function updateNavForAuth() {
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;

  const user = getCurrentUser();
  const isInPages = window.location.pathname.includes('/pages/');
  const loginPath = isInPages ? 'login.html' : 'pages/login.html';

  if (user) {
    // User is logged in - show profile dropdown
    navActions.innerHTML = `
      <div class="user-menu">
        <button class="user-menu-btn" onclick="toggleUserMenu()">
          <span class="user-avatar">${user.name.charAt(0).toUpperCase()}</span>
          <span class="user-name">${user.name.split(' ')[0]}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        <div class="user-dropdown" id="userDropdown">
          <div class="dropdown-header">
            <span class="user-avatar-lg">${user.name.charAt(0).toUpperCase()}</span>
            <div>
              <div class="dropdown-name">${user.name}</div>
              <div class="dropdown-email">${user.email}</div>
            </div>
          </div>
          <hr style="border-color: rgba(255,255,255,0.1); margin: 0.5rem 0;">
          <button class="dropdown-item" onclick="logout()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    `;

    // Add user menu styles if not exists
    if (!document.getElementById('auth-styles')) {
      const style = document.createElement('style');
      style.id = 'auth-styles';
      style.textContent = `
        .user-menu { position: relative; }
        .user-menu-btn {
          display: flex; align-items: center; gap: 0.5rem;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px; padding: 0.4rem 0.8rem 0.4rem 0.4rem;
          color: white; cursor: pointer; transition: all 0.3s ease;
        }
        .user-menu-btn:hover { background: rgba(255,255,255,0.1); }
        .user-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, #7C3AED, #06B6D4);
          display: flex; align-items: center; justify-content: center;
          font-weight: 600; font-size: 0.85rem;
        }
        .user-name { font-weight: 500; font-size: 0.9rem; }
        .user-dropdown {
          position: absolute; top: calc(100% + 0.5rem); right: 0;
          background: rgba(15, 15, 20, 0.95); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          min-width: 220px; padding: 0.5rem;
          opacity: 0; visibility: hidden; transform: translateY(-10px);
          transition: all 0.3s ease; z-index: 1000;
        }
        .user-dropdown.active { opacity: 1; visibility: visible; transform: translateY(0); }
        .dropdown-header { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; }
        .user-avatar-lg {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, #7C3AED, #06B6D4);
          display: flex; align-items: center; justify-content: center;
          font-weight: 600; font-size: 1.1rem;
        }
        .dropdown-name { font-weight: 600; font-size: 0.95rem; }
        .dropdown-email { font-size: 0.8rem; color: #A1A1AA; }
        .dropdown-item {
          display: flex; align-items: center; gap: 0.75rem; width: 100%;
          padding: 0.75rem; background: none; border: none;
          color: #EF4444; cursor: pointer; border-radius: 8px;
          font-size: 0.9rem; transition: background 0.2s ease;
        }
        .dropdown-item:hover { background: rgba(239, 68, 68, 0.1); }
      `;
      document.head.appendChild(style);
    }
  } else {
    // User is logged out - show login button
    navActions.innerHTML = `
      <a href="${loginPath}" class="btn btn-primary">Login</a>
    `;
  }
}

// Toggle user menu dropdown
function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
  const dropdown = document.getElementById('userDropdown');
  const menuBtn = document.querySelector('.user-menu-btn');
  if (dropdown && menuBtn && !menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});

// =====================================================
// Newsletter Subscription System
// =====================================================

// Add newsletter styles
function initNewsletterStyles() {
  if (document.getElementById('newsletter-styles')) return;

  const style = document.createElement('style');
  style.id = 'newsletter-styles';
  style.textContent = `
    /* Newsletter Box */
    .newsletter-box {
      margin-top: 3rem;
      padding: 2rem;
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(6, 182, 212, 0.1));
      border: 1px solid rgba(124, 58, 237, 0.3);
      border-radius: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .newsletter-content { display: flex; align-items: center; gap: 1.5rem; flex: 1; }
    .newsletter-icon {
      width: 60px; height: 60px; border-radius: 12px;
      background: linear-gradient(135deg, #7C3AED, #06B6D4);
      display: flex; align-items: center; justify-content: center;
      color: white; flex-shrink: 0;
    }
    .newsletter-text h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem; }
    .newsletter-text p { color: #A1A1AA; font-size: 0.95rem; }
    .newsletter-btn { white-space: nowrap; }
    
    /* Subscribe Modal */
    .subscribe-modal {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      z-index: 10000; display: flex; align-items: center; justify-content: center;
      opacity: 0; visibility: hidden; transition: all 0.3s ease;
    }
    .subscribe-modal.active { opacity: 1; visibility: visible; }
    .modal-overlay {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px);
    }
    .modal-content {
      position: relative; background: #0f0f14;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px; padding: 2.5rem;
      max-width: 480px; width: 90%; text-align: center;
      transform: scale(0.9); transition: transform 0.3s ease;
    }
    .subscribe-modal.active .modal-content { transform: scale(1); }
    .modal-close {
      position: absolute; top: 1rem; right: 1rem;
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(255, 255, 255, 0.05); border: none;
      color: #A1A1AA; cursor: pointer; display: flex;
      align-items: center; justify-content: center; transition: all 0.2s ease;
    }
    .modal-close:hover { background: rgba(255, 255, 255, 0.1); color: white; }
    .modal-icon { margin-bottom: 1.5rem; }
    .modal-title {
      font-size: 1.75rem; font-weight: 800; margin-bottom: 0.75rem;
      background: linear-gradient(135deg, #7C3AED, #06B6D4);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .modal-subtitle { color: #A1A1AA; margin-bottom: 2rem; }
    .subscribe-form { margin-bottom: 1rem; }
    .subscribe-input-group { display: flex; gap: 0.75rem; margin-bottom: 1rem; }
    .subscribe-input {
      flex: 1; padding: 0.875rem 1rem; background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px;
      color: white; font-size: 1rem; transition: all 0.3s ease;
    }
    .subscribe-input:focus {
      outline: none; border-color: #7C3AED;
      box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
    }
    .subscribe-input::placeholder { color: #71717A; }
    .subscribe-submit { white-space: nowrap; padding: 0.875rem 1.5rem; }
    .subscribe-note { font-size: 0.8rem; color: #71717A; }
    .subscribe-success { padding: 2rem 0; }
    .success-icon {
      width: 60px; height: 60px; margin: 0 auto 1rem;
      background: linear-gradient(135deg, #10B981, #06B6D4);
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 1.5rem; color: white;
    }
    .subscribe-success h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }
    .subscribe-success p { color: #A1A1AA; }
    
    @media (max-width: 640px) {
      .newsletter-box { flex-direction: column; text-align: center; }
      .newsletter-content { flex-direction: column; }
      .subscribe-input-group { flex-direction: column; }
    }
  `;
  document.head.appendChild(style);
}

// Initialize styles on load
document.addEventListener('DOMContentLoaded', initNewsletterStyles);

// Open subscribe modal
function openSubscribeModal() {
  const modal = document.getElementById('subscribeModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Reset form state
    document.getElementById('subscribeEmail').value = '';
    document.querySelector('.subscribe-form').style.display = 'block';
    document.getElementById('subscribeSuccess').style.display = 'none';
  }
}

// Close subscribe modal
function closeSubscribeModal() {
  const modal = document.getElementById('subscribeModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeSubscribeModal();
  }
});

// Get newsletter subscribers
function getSubscribers() {
  const subscribers = localStorage.getItem('attenx_subscribers');
  if (subscribers) {
    try {
      return JSON.parse(subscribers);
    } catch (e) {
      return [];
    }
  }
  return [];
}

// Save subscriber
function saveSubscriber(email) {
  const subscribers = getSubscribers();
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    localStorage.setItem('attenx_subscribers', JSON.stringify(subscribers));
    return true;
  }
  return false; // Already subscribed
}

// Handle subscribe form
function handleSubscribe(e) {
  e.preventDefault();

  const email = document.getElementById('subscribeEmail').value;
  const btn = document.getElementById('subscribeBtn');

  btn.textContent = 'Subscribing...';
  btn.disabled = true;

  // Simulate network delay
  setTimeout(() => {
    const isNew = saveSubscriber(email);

    // Show success
    document.querySelector('.subscribe-form').style.display = 'none';
    document.getElementById('subscribeSuccess').style.display = 'block';

    // Log for demo purposes
    console.log('Newsletter subscription:', email);
    console.log('All subscribers:', getSubscribers());

    // Close modal after 3 seconds
    setTimeout(() => {
      closeSubscribeModal();
      btn.textContent = 'Subscribe';
      btn.disabled = false;
    }, 3000);
  }, 800);
}

// Function to send newsletter to all subscribers (for integration with backend)
function sendNewsletterToSubscribers(blogTitle, blogContent) {
  const subscribers = getSubscribers();

  if (subscribers.length === 0) {
    console.log('No subscribers to send newsletter to.');
    return;
  }

  // This is where you would integrate with an email service like:
  // - SendGrid
  // - Mailchimp
  // - AWS SES
  // - Resend

  console.log('Sending newsletter to subscribers:');
  console.log('Blog Title:', blogTitle);
  console.log('Recipients:', subscribers);

  // Example API call structure (requires backend):
  /*
  fetch('/api/newsletter/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipients: subscribers,
      subject: `New Blog Post: ${blogTitle}`,
      content: blogContent
    })
  });
  */

  return subscribers;
}

// =====================================================
// Copy Prompt Functionality
// =====================================================
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Find the code block associated with this button
      // Assuming the code block is within the same parent or immediately preceding
      const container = btn.closest('.prompt-content') || btn.parentElement;
      const codeBlock = container.querySelector('.code-block');

      if (codeBlock) {
        // Get the text content (preserves newlines, ignores HTML tags)
        const textToCopy = codeBlock.innerText;

        navigator.clipboard.writeText(textToCopy).then(() => {
          // Success feedback
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';

          // Optional: Add a success class color if defined, or just rely on text
          const originalBg = btn.style.background;
          btn.style.background = '#10B981'; // Green success color
          btn.disabled = true;

          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = originalBg;
            btn.disabled = false;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
          btn.textContent = 'Error!';
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        });
      }
    });
  });
}
