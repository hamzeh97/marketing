// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// =====================
// Dark Mode Toggle
// =====================
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Load stored theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  html.classList.add('dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// =====================
// Language Toggle
// =====================
const langToggle = document.querySelector('.lang-toggle');
const currentLang = localStorage.getItem('language') || 'en';

// Set initial language
setLanguage(currentLang);

langToggle.addEventListener('click', () => {
  const newLang = html.lang === 'en' ? 'ar' : 'en';
  setLanguage(newLang);
  localStorage.setItem('language', newLang);
});

function setLanguage(lang) {
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  // Update all elements with data attributes
  document.querySelectorAll('[data-en][data-ar]').forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    } else if (el.tagName === 'LABEL') {
      const textNode = el.childNodes[0];
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        textNode.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      }
    } else {
      el.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    }
  });
  
  // Update language toggle button text
  langToggle.textContent = lang === 'ar' ? 'English' : 'العربية';
}

// =====================
// Contact Form Handler
// =====================
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(form);
  
  // Show success message
  const currentLang = html.lang;
  const successText = currentLang === 'ar' 
    ? 'شكرا! تلقينا رسالتك وسنرد عليك في غضون 24 ساعة.'
    : 'Thanks! We received your message and will respond within one business day.';
  
  formMessage.textContent = successText;
  formMessage.classList.add('show');
  formMessage.style.color = '#16a34a';
  
  form.reset();
  
  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.classList.remove('show');
    formMessage.textContent = '';
  }, 5000);
});

// =====================
// Smooth Scroll Navigation
// =====================
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
