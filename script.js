(function () {
  'use strict';

  // Год в подвале
  document.getElementById('year').textContent = new Date().getFullYear();

  // Тема
  var root = document.documentElement;
  document.getElementById('themeToggle').addEventListener('click', function () {
    var isDark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Тень у навигации при прокрутке
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Появление элементов при прокрутке
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 60 + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
  }

  // Фильтр проектов по технологиям
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
  var box = document.getElementById('filters');
  var tags = [];
  cards.forEach(function (c) {
    c.dataset.tags.split(',').forEach(function (t) {
      if (tags.indexOf(t) === -1) tags.push(t);
    });
  });

  function makeBtn(label, tag) {
    var b = document.createElement('button');
    b.className = 'filter' + (tag === 'all' ? ' active' : '');
    b.type = 'button';
    b.textContent = label;
    b.dataset.tag = tag;
    return b;
  }

  box.appendChild(makeBtn('Все', 'all'));
  tags.forEach(function (t) { box.appendChild(makeBtn(t, t)); });

  box.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter');
    if (!btn) return;
    box.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var tag = btn.dataset.tag;
    cards.forEach(function (c) {
      var show = tag === 'all' || c.dataset.tags.split(',').indexOf(tag) !== -1;
      c.classList.toggle('hidden', !show);
      if (show) c.classList.add('visible');
    });
  });
})();
