/* =========================================================
   common.js — Shared JavaScript for portfolio site
   ========================================================= */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Abstract toggle
     Clicking a .btn-abstract button shows/hides the adjacent
     .abstract-text element and updates the button label.
  ---------------------------------------------------------- */
  function initAbstractToggles() {
    var buttons = document.querySelectorAll('.btn-abstract');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pubItem = btn.closest('.pub-item');
        if (!pubItem) return;

        var abstractEl = pubItem.querySelector('.abstract-text');
        if (!abstractEl) return;

        var isOpen = abstractEl.classList.contains('open');

        if (isOpen) {
          abstractEl.classList.remove('open');
          btn.textContent = 'abstract';
          btn.setAttribute('aria-expanded', 'false');
        } else {
          abstractEl.classList.add('open');
          btn.textContent = 'hide abstract';
          btn.setAttribute('aria-expanded', 'true');
        }
      });

      /* Accessibility: allow Enter/Space to activate */
      btn.setAttribute('role', 'button');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('tabindex', '0');

      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  /* ----------------------------------------------------------
     Active nav link
     Adds the "active" class to the nav link whose href
     matches the current page filename.
  ---------------------------------------------------------- */
  function setActiveNav() {
    var path = window.location.pathname;
    var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      // Normalise: treat empty or '/' as index.html
      var linkPage = href.substring(href.lastIndexOf('/') + 1) || 'index.html';

      if (linkPage === page) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ----------------------------------------------------------
     Smooth scroll for any in-page anchor links
  ---------------------------------------------------------- */
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = anchor.getAttribute('href').slice(1);
        var target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }


  /* ----------------------------------------------------------
  /* ----------------------------------------------------------
     Init on DOM ready
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initAbstractToggles();
    setActiveNav();
    initSmoothScroll();
  });
})();
