(function () {
  'use strict';

  /* ==========================================================================
     ДАННЫЕ ПРОЕКТОВ
     Фото лежат в папке img/ и называются project-<номер>-<n>.jpg.
     Количество фото задаётся вторым числом: images: photos(1, 18) — 18 фото у проекта 1.
     Добавили файл — увеличьте число. Первое фото станет обложкой карточки.
     ========================================================================== */
  function photos(id, n) {
    var list = [];
    for (var i = 1; i <= n; i++) list.push('img/project-' + id + '-' + i + '.jpg');
    return list;
  }

  var PROJECTS = {
    '1': {
      title: 'Система телеуправления и дистанционного контроля распределённых ДЭС, ИБП и АВР',
      text: 'Сложный, территориально распределённый объект с большим количеством разнородного оборудования: ДЭС, кондиционирование, отопление, вентиляция, АВР, ИБП.',
      timeline: [['6 мес', 'разработка'], ['3 мес', 'изготовление оборудования'], ['4 мес', 'инсталляция (привет, пандемия)'], ['3 нед', 'ПНР и запуск в эксплуатацию']],
      stack: ['MasterSCADA 4D', 'MSSQL', 'HTML5', 'Е4/Т4 (РРС)'],
      images: photos(1, 18)
    },
    '2': {
      title: 'Цифровой двойник контейнерного терминала',
      text: 'Система оперативного управления терминала по перегрузке контейнеров.',
      timeline: [['1 мес', 'требования, аналитика, разработка'], ['Стадия:', 'прототип']],
      stack: ['Revit', 'JS', 'SQL'],
      link: { href: 'https://devzaer.github.io/ifcdoccer/', label: 'Открыть модель →' },
      images: photos(2, 7)
    },
    '3': {
      title: 'Цифровая финансово-производственная модель предприятия',
      text: 'Модель технологических и финансовых потоков.',
      timeline: [['1 мес', 'разработка'], ['Интеграция:', 'MVP'], ['Итог:', 'проект закрыт, не реализован']],
      stack: ['MasterSCADA 4D', 'HTML5', 'OPC'],
      images: photos(3, 6)
    },
    '4': {
      title: 'Система дистанционного контроля и управления оборудованием жизнеобеспечения объектов Росморпорт',
      text: 'Мониторинг и управление инженерными системами блочно-модульных контейнеров: ДЭС, кондиционирование, отопление, вентиляция, АВР, ИБП.',
      timeline: [['6 мес', 'разработка'], ['2 мес', 'изготовление оборудования'], ['1,5 мес', 'инсталляция'], ['4 нед', 'ПНР и запуск в эксплуатацию']],
      stack: ['MasterSCADA 3', 'MSSQL', 'IIS'],
      images: photos(4, 4)
    },
    '5': {
      title: 'Система мониторинга технологических процессов промышленного объекта',
      text: 'Мониторинг технологических линий объекта химической промышленности.',
      timeline: [],
      stack: ['Tracemode 7', 'PostgreSQL', 'Astra Linux', 'oVirt'],
      images: photos(5, 6)
    },
    '6': {
      title: 'Системы управления и мониторинга инженерными системами зданий; блочными КНС, ИТП',
      text: 'Ряд небольших проектов, выполненных в сжатые сроки (2–4 нед.). Полностью проектными командами.',
      timeline: [],
      stack: ['SimpleSCADA', 'SCADA «Соната»', 'IECDesigner', 'Текон-SCADA', 'SCADA-Горизонт', 'arOPC', 'Лектус', 'MySQL'],
      note: 'Оборудование: Carel pCO, Pixel, Grundfos CIU500/CU352, СН-МП-ВК, СН-МП-1-3, ОВЕН СП310.',
      images: photos(6, 12)
    },
    '7': {
      title: 'Система мониторинга инженерной инфраструктуры ЦОД банка',
      text: 'Мониторинг состояния прецизионных кондиционеров, АВР и ДГУ на вводе здания, чиллеров техэтажа, протечек подполья серверной, ИБП серверной и чиллерной.',
      timeline: [['3 мес', 'разработка'], ['1 мес', 'изготовление оборудования'], ['1 мес', 'инсталляция'], ['2 нед', 'ПНР и запуск в эксплуатацию']],
      stack: ['MasterSCADA 3', 'MSSQL', 'IIS'],
      images: photos(7, 4)
    },
    '8': {
      title: 'Примеры схем щитов автоматики',
      text: 'Щиты управления инженерным оборудованием: контейнеры ДГУ, мультимедийные фонтаны, КНС, вентиляционные установки, динамическое освещение.',
      timeline: [],
      stack: ['NanoCAD'],
      images: photos(8, 15)
    }
  };

  /* ==========================================================================
     Общее для всех страниц (главная и резюме)
     ========================================================================== */
  function byId(id) { return document.getElementById(id); }

  var yearEl = byId('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Тема
  var root = document.documentElement;
  var themeBtn = byId('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      var next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Сохранить резюме в PDF (через печать браузера)
  var printBtn = byId('printBtn');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

  // Линия под навигацией при прокрутке
  var nav = byId('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Появление элементов при прокрутке
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var node = e.target;
          node.classList.add('visible');
          io.unobserve(node);
          setTimeout(function () {
            node.style.transitionDelay = '';
            node.classList.add('done');
          }, 900);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (node, i) {
      node.style.transitionDelay = (i % 3) * 60 + 'ms';
      io.observe(node);
    });
  } else {
    items.forEach(function (node) { node.classList.add('visible', 'done'); });
  }

  // Фото в контактах: локальный файл -> запасные адреса
  var portrait = byId('portrait');
  if (portrait) {
    var fallbacks = (portrait.getAttribute('data-fallbacks') || '').split(' ').filter(Boolean);
    portrait.addEventListener('error', function () {
      if (fallbacks.length) portrait.src = fallbacks.shift();
    });
  }

  /* ==========================================================================
     Только главная: карточки, фильтр, окно проекта, просмотр фото
     ========================================================================== */
  var grid = byId('grid');
  var modal = byId('modal');
  if (!grid || !modal) return;

  // Обложки карточек
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
  cards.forEach(function (card) {
    var p = PROJECTS[card.dataset.id];
    if (p && p.images && p.images.length) {
      var img = document.createElement('img');
      img.className = 'card__cover';
      img.src = p.images[0];
      img.alt = '';
      img.loading = 'lazy';
      img.addEventListener('error', function () { img.remove(); });
      card.insertBefore(img, card.firstChild);
    }
  });

  // Фильтр по технологиям
  var box = byId('filters');
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

  /* ---------- Окно проекта ---------- */
  var dialog = modal.querySelector('.modal__dialog');
  var viewer = byId('viewer');
  var el = {
    num: byId('mNum'), title: byId('mTitle'), text: byId('mText'),
    timeline: byId('mTimeline'), stack: byId('mStack'), note: byId('mNote'), link: byId('mLink'),
    stage: byId('gStage'), thumbs: byId('gThumbs'), count: byId('gCount'), hint: byId('gHint'),
    gPrev: byId('gPrev'), gNext: byId('gNext'), mPrev: byId('mPrev'), mNext: byId('mNext'),
    vStage: byId('vStage'), vImg: byId('vImg'), vCount: byId('vCount'),
    vPrev: byId('vPrev'), vNext: byId('vNext'), vClose: byId('vClose')
  };

  var current = { id: null, index: 0, images: [] };
  var lastFocus = null;

  function visibleIds() {
    return cards.filter(function (c) { return !c.classList.contains('hidden'); })
      .map(function (c) { return c.dataset.id; });
  }
  function pad(id) { return ('0' + id).slice(-2); }
  function viewerOpen() { return viewer.classList.contains('open'); }

  function makePlaceholder() {
    var ph = document.createElement('div');
    ph.className = 'gallery__placeholder';
    ph.textContent = pad(current.id);
    var small = document.createElement('small');
    small.textContent = 'Фото проекта';
    ph.appendChild(small);
    return ph;
  }

  function renderGallery() {
    var imgs = current.images;
    var p = PROJECTS[current.id];
    el.stage.textContent = '';
    el.thumbs.textContent = '';

    if (!imgs.length) {
      el.stage.appendChild(makePlaceholder());
      el.hint.hidden = true;
    } else {
      var img = document.createElement('img');
      img.className = 'gallery__img';
      img.src = imgs[current.index];
      img.alt = p.title + ' — фото ' + (current.index + 1);
      img.draggable = false;
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Развернуть фото ' + (current.index + 1));
      img.addEventListener('error', function () {
        el.stage.textContent = '';
        el.stage.appendChild(makePlaceholder());
        el.hint.hidden = true;
      });
      el.stage.appendChild(img);
      el.hint.hidden = false;
    }

    var many = imgs.length > 1;
    el.gPrev.hidden = !many;
    el.gNext.hidden = !many;
    el.count.hidden = !many;
    el.thumbs.hidden = !many;
    if (many) {
      el.count.textContent = (current.index + 1) + ' / ' + imgs.length;
      imgs.forEach(function (src, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'thumb' + (i === current.index ? ' active' : '');
        b.setAttribute('aria-label', 'Фото ' + (i + 1));
        var t = document.createElement('img');
        t.src = src;
        t.alt = '';
        t.loading = 'lazy';
        b.appendChild(t);
        b.addEventListener('click', function () { goTo(i); });
        el.thumbs.appendChild(b);
      });
    }
  }

  // Показать фото с номером i (по кругу), синхронно в галерее и в развёрнутом просмотре
  function goTo(i) {
    var n = current.images.length;
    if (!n) return;
    current.index = ((i % n) + n) % n;
    renderGallery();
    if (viewerOpen()) renderViewer();
  }
  function shiftPhoto(d) {
    if (current.images.length > 1) goTo(current.index + d);
  }

  /* ---------- Развёрнутый просмотр фото ---------- */
  function renderViewer() {
    var imgs = current.images;
    var n = imgs.length;
    var i = current.index;
    el.vImg.src = imgs[i];
    el.vImg.alt = PROJECTS[current.id].title + ' — фото ' + (i + 1);
    var many = n > 1;
    el.vPrev.hidden = !many;
    el.vNext.hidden = !many;
    el.vCount.hidden = !many;
    el.vCount.textContent = (i + 1) + ' / ' + n;
    if (many) {
      new Image().src = imgs[(i + 1) % n];
      new Image().src = imgs[(i - 1 + n) % n];
    }
  }

  function openViewer() {
    if (!current.images.length) return;
    renderViewer();
    viewer.classList.add('open');
    viewer.setAttribute('aria-hidden', 'false');
    el.vClose.focus({ preventScroll: true });
  }

  function hideViewer() {
    viewer.classList.remove('open');
    viewer.setAttribute('aria-hidden', 'true');
  }

  function closeViewer() {
    if (!viewerOpen()) return;
    hideViewer();
    var g = el.stage.querySelector('.gallery__img');
    if (g) g.focus({ preventScroll: true });
  }

  // Клик или Enter/Пробел по фото в галерее -> развернуть
  el.stage.addEventListener('click', function (e) {
    if (e.target.classList.contains('gallery__img')) openViewer();
  });
  el.stage.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('gallery__img')) {
      e.preventDefault();
      openViewer();
    }
  });

  el.vClose.addEventListener('click', closeViewer);
  el.vPrev.addEventListener('click', function () { shiftPhoto(-1); });
  el.vNext.addEventListener('click', function () { shiftPhoto(1); });
  // Клик по самому фото или по тёмному полю вокруг -> свернуть
  el.vStage.addEventListener('click', function (e) {
    if (e.target === el.vStage || e.target === el.vImg) closeViewer();
  });

  /* ---------- Содержимое окна проекта ---------- */
  function fill(id) {
    var p = PROJECTS[id];
    if (!p) return false;
    current.id = id;
    current.index = 0;
    current.images = p.images || [];

    el.num.textContent = pad(id);
    el.title.textContent = p.title;
    el.text.textContent = p.text;

    el.timeline.textContent = '';
    (p.timeline || []).forEach(function (row) {
      var li = document.createElement('li');
      var b = document.createElement('b');
      b.textContent = row[0];
      li.appendChild(b);
      li.appendChild(document.createTextNode(' ' + row[1]));
      el.timeline.appendChild(li);
    });
    el.timeline.hidden = !(p.timeline && p.timeline.length);

    el.stack.textContent = '';
    (p.stack || []).forEach(function (s) {
      var li = document.createElement('li');
      li.textContent = s;
      el.stack.appendChild(li);
    });

    el.note.textContent = p.note || '';

    if (p.link) {
      el.link.href = p.link.href;
      el.link.textContent = p.link.label;
      el.link.hidden = false;
    } else {
      el.link.hidden = true;
    }

    hideViewer();
    renderGallery();
    modal.querySelector('.info__scroll').scrollTop = 0;
    dialog.scrollTop = 0;
    return true;
  }

  function openProject(id) {
    if (!PROJECTS[id]) return;
    var wasOpen = modal.classList.contains('open');
    if (!wasOpen) {
      lastFocus = document.activeElement;
      var sbw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = sbw > 0 ? sbw + 'px' : '';
      document.body.classList.add('modal-open');
    }
    fill(id);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    try { history.replaceState(null, '', '#project-' + id); } catch (e) {}
    if (!wasOpen) byId('mClose').focus({ preventScroll: true });
  }

  function closeModal() {
    if (!modal.classList.contains('open')) return;
    hideViewer();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';
    try { history.replaceState(null, '', '#projects'); } catch (e) {}
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function shiftProject(d) {
    var ids = visibleIds();
    var i = ids.indexOf(current.id);
    if (i === -1 || ids.length < 2) return;
    openProject(ids[(i + d + ids.length) % ids.length]);
  }

  // Открытие карточки по клику и с клавиатуры
  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.card');
    if (card) openProject(card.dataset.id);
  });
  grid.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.card');
    if (card) { e.preventDefault(); openProject(card.dataset.id); }
  });

  byId('mClose').addEventListener('click', closeModal);
  modal.addEventListener('mousedown', function (e) { if (e.target === modal) closeModal(); });

  el.gPrev.addEventListener('click', function () { shiftPhoto(-1); });
  el.gNext.addEventListener('click', function () { shiftPhoto(1); });
  el.mPrev.addEventListener('click', function () { shiftProject(-1); });
  el.mNext.addEventListener('click', function () { shiftProject(1); });

  // Свайп по фото (галерея и развёрнутый просмотр)
  function attachSwipe(node) {
    var x0 = null;
    node.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    node.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) shiftPhoto(dx < 0 ? 1 : -1);
    }, { passive: true });
  }
  attachSwipe(el.stage);
  attachSwipe(el.vStage);

  // Элементы, на которые можно перейти Tab-ом (с учётом открытого просмотра)
  function focusables() {
    var inViewer = viewerOpen();
    var scope = inViewer ? viewer : dialog;
    return Array.prototype.slice.call(scope.querySelectorAll('button, a[href], [tabindex="0"]'))
      .filter(function (n) {
        return !n.hidden && !n.disabled && n.offsetParent !== null && (inViewer || !viewer.contains(n));
      });
  }

  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') {
      if (viewerOpen()) closeViewer(); else closeModal();
      return;
    }
    if (e.key === 'ArrowLeft') { shiftPhoto(-1); return; }
    if (e.key === 'ArrowRight') { shiftPhoto(1); return; }
    if (e.key === 'Tab') {
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      var scope = viewerOpen() ? viewer : dialog;
      if (!scope.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Прямая ссылка на проект: ...#project-3
  var m = location.hash.match(/^#project-(\d+)$/);
  if (m && PROJECTS[m[1]]) openProject(m[1]);
})();
