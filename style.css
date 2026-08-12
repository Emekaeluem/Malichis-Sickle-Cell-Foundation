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

  /* ---------- Hero Video ---------- */
  var heroSection = document.querySelector('.hero');
  var heroVideo = document.getElementById('heroVideo');
  var soundToggle = document.getElementById('soundToggle');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroSection && heroVideo && soundToggle) {
    (function () {
      function setSoundState(isOn) {
        soundToggle.classList.toggle('is-unmuted', isOn);
        soundToggle.setAttribute('aria-pressed', String(isOn));
        soundToggle.setAttribute('aria-label', isOn ? 'Turn video sound off' : 'Turn video sound on');
      }

      /* Try to start the video WITH sound. Browsers only allow this in limited
         cases (e.g. the visitor has interacted with this site before) — if the
         browser blocks it, we fall back to muted playback and let the visitor
         opt in with one tap. */
      function tryUnmutedAutoplay() {
        heroVideo.muted = false;
        var playPromise = heroVideo.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.then(function () {
            setSoundState(!heroVideo.muted);
          }).catch(function () {
            heroVideo.muted = true;
            heroVideo.play();
            setSoundState(false);
          });
        } else {
          setSoundState(!heroVideo.muted);
        }
      }
      tryUnmutedAutoplay();

      soundToggle.addEventListener('click', function () {
        heroVideo.muted = !heroVideo.muted;
        if (!heroVideo.muted) { heroVideo.play(); }
        setSoundState(!heroVideo.muted);
      });

      /* Mouse parallax on hero text */
      var heroContentEl = document.querySelector('.hero-content');
      if (!prefersReduced && heroContentEl) {
        heroSection.addEventListener('mousemove', function (e) {
          var rect = heroSection.getBoundingClientRect();
          var relX = (e.clientX - rect.left) / rect.width - 0.5;
          var relY = (e.clientY - rect.top) / rect.height - 0.5;
          heroContentEl.style.transform = 'translate(' + (relX * -14) + 'px, ' + (relY * -10) + 'px)';
        });
        heroSection.addEventListener('mouseleave', function () {
          heroContentEl.style.transform = 'translate(0,0)';
        });
      }
    })();
  }


  /* ---------- Feature Videos (About page) — play only when in view ---------- */
  var featureVideos = Array.prototype.slice.call(document.querySelectorAll('.feature-video'));
  if (featureVideos.length) {
    if ('IntersectionObserver' in window) {
      var featureVideoIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.play().catch(function () {}); }
          else { entry.target.pause(); }
        });
      }, { threshold: 0.35 });
      featureVideos.forEach(function (v) { featureVideoIO.observe(v); });
    } else {
      featureVideos.forEach(function (v) { v.play().catch(function () {}); });
    }
  }

  /* ---------- Bloom Signature (About page hero) ---------- */
  var bloomPath = document.getElementById('bloomSignaturePath');
  if (bloomPath) {
    var bloomLen = bloomPath.getTotalLength();
    bloomPath.style.strokeDasharray = bloomLen;
    bloomPath.style.strokeDashoffset = bloomLen;
    if (prefersReduced) {
      bloomPath.style.opacity = '0.5';
      bloomPath.style.strokeDashoffset = '0';
    } else {
      requestAnimationFrame(function () {
        bloomPath.style.transition = 'stroke-dashoffset 2.2s cubic-bezier(.16,.84,.44,1), opacity 1s ease';
        bloomPath.style.opacity = '0.5';
        bloomPath.style.strokeDashoffset = '0';
      });
    }
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

  /* ---------- Donate Tabs (Donate page) ---------- */
  var donateTabs = Array.prototype.slice.call(document.querySelectorAll('.donate-tab'));
  var donatePanels = Array.prototype.slice.call(document.querySelectorAll('.donate-panel'));
  var donateFormNote = document.getElementById('donateFormNote');
  if (donateTabs.length && donatePanels.length) {
    donateTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-tab');
        donateTabs.forEach(function (t) {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', String(t === tab));
        });
        donatePanels.forEach(function (p) {
          p.classList.toggle('is-active', p.getAttribute('data-panel') === target);
        });
        if (donateFormNote) { donateFormNote.textContent = 'Choose a category above to get started.'; }
      });
    });
  }

  /* ---------- Donate Forms (front-end only demo) ---------- */
  var donateForms = Array.prototype.slice.call(document.querySelectorAll('.donate-form'));
  donateForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (donateFormNote) {
        var successMsg = form.getAttribute('data-success');
        if (successMsg === 'AMOUNT_MESSAGE') {
          var amountField = form.querySelector('[name="amount"]');
          var amount = amountField ? amountField.value : '';
          successMsg = amount
            ? 'Thank you! Redirecting you to complete your \u20a6' + amount + ' donation securely.'
            : 'Thank you! Redirecting you to complete your donation securely.';
        }
        donateFormNote.textContent = successMsg;
      }
      form.reset();
    });
  });

})();
