(function () {
  'use strict';

  /* ==========================================================================
     ДАННЫЕ ПРОЕКТОВ (окно с подробностями)
     Чтобы добавить фото: положите файлы в папку img/ и впишите пути в images,
     например: images: ['img/project-1-1.jpg', 'img/project-1-2.jpg']
     Первое фото станет обложкой карточки.
     ========================================================================== */
  var PROJECTS = {
    '1': {
      title: 'Система телеуправления и дистанционного контроля распределённых ДЭС, ИБП и АВР',
      text: 'Сложный, территориально распределённый объект с большим количеством разнородного оборудования: ДЭС, кондиционирование, отопление, вентиляция, АВР, ИБП.',
      timeline: [['6 мес', 'разработка'], ['3 мес', 'изготовление оборудования'], ['4 мес', 'инсталляция (привет, пандемия)'], ['3 нед', 'ПНР и запуск в эксплуатацию']],
      stack: ['MasterSCADA 4D', 'MSSQL', 'HTML5', 'Е4/Т4 (РРС)'],
      images: []
    },
    '2': {
      title: 'Цифровой двойник контейнерного терминала',
      text: 'Система оперативного управления терминала по перегрузке контейнеров.',
      timeline: [['1 мес', 'требования, аналитика, разработка'], ['Стадия:', 'прототип']],
      stack: ['Revit', 'JS', 'SQL'],
      link: { href: 'https://devzaer.github.io/ifcdoccer/', label: 'Открыть модель →' },
      images: []
    },
    '3': {
      title: 'Цифровая финансово-производственная модель предприятия',
      text: 'Модель технологических и финансовых потоков.',
      timeline: [['1 мес', 'разработка'], ['Интеграция:', 'MVP'], ['Итог:', 'проект закрыт, не реализован']],
      stack: ['MasterSCADA 4D', 'HTML5', 'OPC'],
      images: []
    },
    '4': {
      title: 'Система дистанционного контроля и управления оборудованием жизнеобеспечения объектов Росморпорт',
      text: 'Мониторинг и управление инженерными системами блочно-модульных контейнеров: ДЭС, кондиционирование, отопление, вентиляция, АВР, ИБП.',
      timeline: [['6 мес', 'разработка'], ['2 мес', 'изготовление оборудования'], ['1,5 мес', 'инсталляция'], ['4 нед', 'ПНР и запуск в эксплуатацию']],
      stack: ['MasterSCADA 3', 'MSSQL', 'IIS'],
      images: []
    },
    '5': {
      title: 'Система мониторинга технологических процессов промышленного объекта',
      text: 'Мониторинг технологических линий объекта химической промышленности.',
      timeline: [],
      stack: ['Tracemode 7', 'PostgreSQL', 'Astra Linux', 'oVirt'],
      images: []
    },
    '6': {
      title: 'Системы управления и мониторинга инженерными системами зданий; блочными КНС, ИТП',
      text: 'Ряд небольших проектов, выполненных в сжатые сроки (2–4 нед.). Полностью проектными командами.',
      timeline: [],
      stack: ['SimpleSCADA', 'SCADA «Соната»', 'IECDesigner', 'Текон-SCADA', 'SCADA-Горизонт', 'arOPC', 'Лектус', 'MySQL'],
      note: 'Оборудование: Carel pCO, Pixel, Grundfos CIU500/CU352, СН-МП-ВК, СН-МП-1-3, ОВЕН СП310.',
      images: []
    },
    '7': {
      title: 'Система мониторинга инженерной инфраструктуры ЦОД банка',
      text: 'Мониторинг состояния прецизионных кондиционеров, АВР и ДГУ на вводе здания, чиллеров техэтажа, протечек подполья серверной, ИБП серверной и чиллерной.',
      timeline: [['3 мес', 'разработка'], ['1 мес', 'изготовление оборудования'], ['1 мес', 'инсталляция'], ['2 нед', 'ПНР и запуск в эксплуатацию']],
      stack: ['MasterSCADA 3', 'MSSQL', 'IIS'],
      images: []
    },
    '8': {
      title: 'Примеры схем щитов автоматики',
      text: 'Щиты управления инженерным оборудованием: контейнеры ДГУ, мультимедийные фонтаны, КНС, вентиляционные установки, динамическое освещение.',
      timeline: [],
      stack: ['NanoCAD'],
      images: []
    }
  };

  /* ========================================================================== */

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
          var el = e.target;
          el.classList.add('visible');
          io.unobserve(el);
          setTimeout(function () {
            el.style.transitionDelay = '';
            el.classList.add('done');
          }, 900);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 60 + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('visible', 'done'); });
  }

  // Фото в контактах: локальный файл -> запасные адреса
  var portrait = document.getElementById('portrait');
  if (portrait) {
    var fallbacks = (portrait.getAttribute('data-fallbacks') || '').split(' ').filter(Boolean);
    portrait.addEventListener('error', function () {
      if (fallbacks.length) portrait.src = fallbacks.shift();
    });
  }

  // Обложки карточек (если у проекта есть фото)
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

  // Фильтр проектов по технологиям
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

  /* ==========================================================================
     Окно проекта
     ========================================================================== */
  var modal = document.getElementById('modal');
  var dialog = modal.querySelector('.modal__dialog');
  var el = {
    num: document.getElementById('mNum'),
    title: document.getElementById('mTitle'),
    text: document.getElementById('mText'),
    timeline: document.getElementById('mTimeline'),
    stack: document.getElementById('mStack'),
    note: document.getElementById('mNote'),
    link: document.getElementById('mLink'),
    stage: document.getElementById('gStage'),
    thumbs: document.getElementById('gThumbs'),
    count: document.getElementById('gCount'),
    gPrev: document.getElementById('gPrev'),
    gNext: document.getElementById('gNext'),
    mPrev: document.getElementById('mPrev'),
    mNext: document.getElementById('mNext')
  };

  var current = { id: null, index: 0, images: [] };
  var lastFocus = null;

  function visibleIds() {
    return cards.filter(function (c) { return !c.classList.contains('hidden'); })
      .map(function (c) { return c.dataset.id; });
  }

  function pad(id) { return ('0' + id).slice(-2); }

  function renderGallery() {
    var imgs = current.images;
    var p = PROJECTS[current.id];
    el.stage.textContent = '';
    el.thumbs.textContent = '';

    if (!imgs.length) {
      var ph = document.createElement('div');
      ph.className = 'gallery__placeholder';
      ph.textContent = pad(current.id);
      var small = document.createElement('small');
      small.textContent = 'Фото проекта';
      ph.appendChild(small);
      el.stage.appendChild(ph);
    } else {
      var img = document.createElement('img');
      img.className = 'gallery__img';
      img.src = imgs[current.index];
      img.alt = p.title + ' — фото ' + (current.index + 1);
      img.draggable = false;
      img.addEventListener('error', function () {
        el.stage.textContent = '';
        var ph2 = document.createElement('div');
        ph2.className = 'gallery__placeholder';
        ph2.textContent = pad(current.id);
        el.stage.appendChild(ph2);
      });
      el.stage.appendChild(img);
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
        b.addEventListener('click', function () { current.index = i; renderGallery(); });
        el.thumbs.appendChild(b);
      });
    }
  }

  function shiftPhoto(d) {
    var n = current.images.length;
    if (n < 2) return;
    current.index = (current.index + d + n) % n;
    renderGallery();
  }

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

    renderGallery();
    var scroller = modal.querySelector('.info__scroll');
    scroller.scrollTop = 0;
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
    if (!wasOpen) document.getElementById('mClose').focus({ preventScroll: true });
  }

  function closeModal() {
    if (!modal.classList.contains('open')) return;
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

  // Открытие по клику / клавиатуре
  document.getElementById('grid').addEventListener('click', function (e) {
    var card = e.target.closest('.card');
    if (card) openProject(card.dataset.id);
  });
  document.getElementById('grid').addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.card');
    if (card) { e.preventDefault(); openProject(card.dataset.id); }
  });

  // Закрытие
  document.getElementById('mClose').addEventListener('click', closeModal);
  modal.addEventListener('mousedown', function (e) { if (e.target === modal) closeModal(); });

  // Навигация
  el.gPrev.addEventListener('click', function () { shiftPhoto(-1); });
  el.gNext.addEventListener('click', function () { shiftPhoto(1); });
  el.mPrev.addEventListener('click', function () { shiftProject(-1); });
  el.mNext.addEventListener('click', function () { shiftProject(1); });

  // Свайп по фото
  var touchX = null;
  el.stage.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  el.stage.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) shiftPhoto(dx < 0 ? 1 : -1);
  }, { passive: true });

  // Клавиатура: Esc, стрелки, удержание фокуса внутри окна
  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'ArrowLeft') { shiftPhoto(-1); return; }
    if (e.key === 'ArrowRight') { shiftPhoto(1); return; }
    if (e.key === 'Tab') {
      var f = Array.prototype.slice.call(dialog.querySelectorAll('button, a[href]'))
        .filter(function (n) { return !n.hidden && n.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!dialog.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  });

  // Прямая ссылка на проект: ...#project-3
  var m = location.hash.match(/^#project-(\d+)$/);
  if (m && PROJECTS[m[1]]) openProject(m[1]);
})();
