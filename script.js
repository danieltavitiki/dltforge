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

// Header shadow on scroll
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
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
  
  // Here you would typically send the form data to a server
  // For now, we'll just show a confirmation message
  
  // Example: Send to Formspree (replace with your endpoint)
   fetch('https://formspree.io/f/mrbonvgl', {
     method: 'POST',
     body: formData,
     headers: {
       'Accept': 'application/json'
     }
   })
   .then(response => {
     if (response.ok) {
       alert('Thank you for your message! I will get back to you soon.');
       contactForm.reset();
     } else {
       alert('Oops! There was a problem submitting your form.');
     }
   })
   .catch(error => {
     alert('Oops! There was a problem submitting your form.');
   });
  
  // Temporary alert for demo purposes
  alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
  contactForm.reset();
});

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
animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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

