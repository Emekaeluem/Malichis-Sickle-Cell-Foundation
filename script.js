(function () {
  'use strict';

  /* ---------- Year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky Nav ---------- */
  var nav = document.getElementById('siteNav');
  var onScrollNav = function () {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Mobile Menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  var navScrim = document.getElementById('navScrim');

  function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navScrim.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    var isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navScrim.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }
  navToggle.addEventListener('click', toggleMenu);
  navScrim.addEventListener('click', closeMenu);
  navMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* ---------- Hero Slider ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.dot'));
  var current = 0;
  var slideTimer = null;
  var SLIDE_DURATION = 9500;

  function goTo(index) {
    if (index === current) return;
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    dots[current].setAttribute('aria-selected', 'false');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-selected', 'true');
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function startAuto() {
    stopAuto();
    slideTimer = setInterval(next, SLIDE_DURATION);
  }
  function stopAuto() {
    if (slideTimer) clearInterval(slideTimer);
  }

  document.getElementById('heroNext').addEventListener('click', function () { next(); startAuto(); });
  document.getElementById('heroPrev').addEventListener('click', function () { prev(); startAuto(); });
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(dot.getAttribute('data-goto'), 10));
      startAuto();
    });
  });

  var heroSection = document.querySelector('.hero');
  heroSection.addEventListener('mouseenter', stopAuto);
  heroSection.addEventListener('mouseleave', startAuto);
  startAuto();

  /* Mouse parallax on hero content */
  var heroSlides = document.getElementById('heroSlides');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    heroSection.addEventListener('mousemove', function (e) {
      var rect = heroSection.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;
      var activeContent = heroSlides.querySelector('.slide.is-active .slide-content');
      if (activeContent) {
        activeContent.style.transform = 'translate(' + (relX * -14) + 'px, ' + (relY * -10) + 'px)';
      }
    });
    heroSection.addEventListener('mouseleave', function () {
      var activeContent = heroSlides.querySelector('.slide.is-active .slide-content');
      if (activeContent) activeContent.style.transform = 'translate(0,0)';
    });
  }

  /* ---------- Scroll Parallax ---------- */
  /* Elements marked data-parallax-speed drift as the page scrolls, layered depth
     effect (no external library needed). Speed is a small multiplier — higher
     numbers drift further. Skipped entirely for reduced-motion users. */
  if (!prefersReduced) {
    var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax-speed]'));
    if (parallaxEls.length) {
      var parallaxTicking = false;
      var updateParallax = function () {
        var vh = window.innerHeight;
        parallaxEls.forEach(function (el) {
          var speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.1;
          var rect = el.getBoundingClientRect();
          var distanceFromCenter = (rect.top + rect.height / 2) - vh / 2;
          el.style.setProperty('--parallax-y', (distanceFromCenter * speed * -1) + 'px');
        });
        parallaxTicking = false;
      };
      var onParallaxScroll = function () {
        if (!parallaxTicking) {
          requestAnimationFrame(updateParallax);
          parallaxTicking = true;
        }
      };
      window.addEventListener('scroll', onParallaxScroll, { passive: true });
      window.addEventListener('resize', updateParallax);
      updateParallax();
    }
  }

  /* ---------- Reveal on Scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal, .reveal-scale'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Animated Counters ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('.counter'));
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterIO.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute('data-target') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* ---------- Back To Top ---------- */
  var backToTop = document.getElementById('backToTop');
  document.addEventListener('scroll', function () {
    if (window.scrollY > 700) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  }, { passive: true });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });

  /* ---------- Newsletter (front-end only demo) ---------- */
  var newsletterForm = document.getElementById('newsletterForm');
  var newsletterNote = document.getElementById('newsletterNote');
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    newsletterNote.textContent = 'Thank you for subscribing! We\u2019ll keep you updated.';
    newsletterForm.reset();
  });

  /* ---------- Contact Form (front-end only demo) ---------- */
  var contactForm = document.getElementById('contactForm');
  var contactFormNote = document.getElementById('contactFormNote');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactFormNote.textContent = 'Thank you for reaching out! We\u2019ll get back to you soon.';
      contactForm.reset();
    });
  }

})();
