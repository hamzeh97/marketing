document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(form);
  formMessage.textContent = 'Thanks! We received your message and will respond within one business day.';
  formMessage.style.color = '#16a34a';
  form.reset();
  setTimeout(() => formMessage.textContent = '', 5000);
});
