// Custom Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

if (cursor && ring) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a, button, .product-card, .size-btn').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
  });
}

// Sticky header
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Product page: size selector
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.size-grid').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const variantInput = document.querySelector('[name="id"]');
    if (variantInput) variantInput.value = btn.dataset.variantId || variantInput.value;
  });
});

// Product gallery thumbnails
document.querySelectorAll('.product-gallery-thumb').forEach((thumb, i) => {
  thumb.addEventListener('click', () => {
    const main = document.querySelector('.product-gallery-main img');
    if (main) main.src = thumb.querySelector('img').src.replace('_100x', '_800x');
    document.querySelectorAll('.product-gallery-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });
});
