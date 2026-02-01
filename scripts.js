/**
 * Portfolio Website - Core Features
 * Dark mode, smooth scroll, scroll reveal
 */

(function () {
  'use strict';

  // ============================================
  // DARK MODE
  // ============================================
  const toggle = document.querySelector('.theme-toggle');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (toggle) toggle.textContent = theme === 'light' ? '\u263E' : '\u2600';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // Apply saved theme or keep dark default (CSS :root is dark)
  var saved = localStorage.getItem('theme');
  if (saved) setTheme(saved);
  else if (toggle) toggle.textContent = '\u2600';

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // SCROLL REVEAL
  // ============================================
  var reveals = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    reveals.forEach(function (el) {
      el.classList.add('revealed');
    });
  } else if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    reveals.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // ============================================
  // CONSOLE EASTER EGG
  // ============================================
  console.log(
    '%c Built with vanilla HTML, CSS & JS. No frameworks, no build tools. ',
    'background: #111827; color: #e5e5e5; font-size: 12px; padding: 6px 12px; border-radius: 4px;'
  );
})();
