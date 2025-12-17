// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

navToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile nav when clicking on a link
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
    navList.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Smooth scroll for anchor links (fallback for browsers that don't support CSS scroll-behavior)
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

// Header glow effect on scroll
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.1)';
    header.style.borderBottomColor = 'rgba(0, 255, 255, 0.3)';
  } else {
    header.style.boxShadow = 'none';
    header.style.borderBottomColor = '#333333';
  }
  
  lastScroll = currentScroll;
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Send to Formspree
  fetch('https://formspree.io/f/mrbonvgl', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      showNotification(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
      contactForm.reset();
    } else {
      showNotification('Oops! There was a problem submitting your form.', 'error');
    }
  })
  .catch(error => {
    showNotification('Oops! There was a problem submitting your form.', 'error');
  });
});

// Custom notification function for terminal aesthetic
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span class="notification-icon">${type === 'success' ? '✓' : '✗'}</span>
    <span class="notification-message">${message}</span>
  `;
  
  // Add styles dynamically
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
    border: 1px solid ${type === 'success' ? '#00ff00' : '#ff4444'};
    border-radius: 4px;
    color: ${type === 'success' ? '#00ff00' : '#ff4444'};
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 0 20px ${type === 'success' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'};
  `;
  
  // Add animation keyframes
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply fade-in effect to cards and sections
const animatedElements = document.querySelectorAll('.card, .project-card, .service-card, .skills-card, .highlights-card');
animatedElements.forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(el);
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id], main[id]');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add loaded class to body for any CSS animations that should trigger on page load
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

// Web Share API - works perfectly on iOS devices
const shareBtn = document.getElementById('shareBtn');

if (shareBtn) {
  // Hide share button if Web Share API is not supported
  if (!navigator.share) {
    shareBtn.style.display = 'none';
  }

  shareBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const shareData = {
      title: 'DLT Forge | Daniel Tavitiki',
      text: 'Check out Daniel Tavitiki\'s portfolio - iOS & Google App Developer',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Shared successfully');
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        showNotification('Link copied to clipboard!', 'success');
      }
    } catch (err) {
      // User cancelled the share or an error occurred
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err);
        // Fallback: Copy to clipboard
        try {
          await navigator.clipboard.writeText(window.location.href);
          showNotification('Link copied to clipboard!', 'success');
        } catch (clipboardErr) {
          console.error('Clipboard error:', clipboardErr);
        }
      }
    }
  });
}

// Terminal cursor animation for hero section
const cursorElement = document.querySelector('.terminal-prompt .cursor');
if (cursorElement) {
  // Already handled by CSS animation, but we can add typing effect later if needed
}

// Add hover sound effect (optional - commented out for now)
// const cards = document.querySelectorAll('.project-card, .service-card');
// cards.forEach(card => {
//   card.addEventListener('mouseenter', () => {
//     // Play subtle hover sound
//   });
// });
