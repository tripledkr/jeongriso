(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 스크롤 등장 */
  var targets = document.querySelectorAll('[data-reveal], [data-reveal-group], .steps');
  if (!('IntersectionObserver' in window) || reduce) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* 숫자 카운트업 */
  var nums = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var to = parseFloat(el.getAttribute('data-count'));
    if (isNaN(to)) return;
    if (reduce) { el.textContent = String(to); return; }
    el.textContent = '0';
    var start = null, dur = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (nums.length) {
    if (!('IntersectionObserver' in window)) { nums.forEach(runCount); }
    else {
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); io2.unobserve(en.target); } });
      }, { threshold: 0.6 });
      nums.forEach(function (el) { io2.observe(el); });
    }
  }

  /* 헤더 그림자 */
  var hd = document.querySelector('.hd');
  if (hd) {
    var onScroll = function () { hd.classList.toggle('is-stuck', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 내부 앵커 부드러운 이동 */
  if (!reduce) {
    document.querySelectorAll('a[href^="/#"], a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href').split('#')[1];
        if (!id) return;
        var t = document.getElementById(id);
        if (!t) return;
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + id);
      });
    });
  }
})();

/* ===== spine: 라인아트 드로잉 + 진행선 ===== */
(function () {
  var reduceM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rows = [].slice.call(document.querySelectorAll('.srow'));
  if (!rows.length) return;

  // 각 path/rect/circle 의 실제 길이를 --len 으로
  rows.forEach(function (row) {
    [].slice.call(row.querySelectorAll('.srow__gfx svg > *')).forEach(function (el) {
      if (el.classList.contains('s-dot')) return;
      var len = 0;
      try { len = el.getTotalLength ? el.getTotalLength() : 0; } catch (e) { len = 0; }
      if (!len) {
        var b = el.getBBox ? el.getBBox() : null;
        len = b ? (b.width + b.height) * 2 : 300;
      }
      el.style.setProperty('--len', Math.ceil(len) + 'px');
      var i = [].indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = (0.08 * i) + 's';
    });
  });

  if (reduceM) { rows.forEach(function (r) { r.classList.add('is-in'); }); }
  else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -8% 0px' });
    rows.forEach(function (r) { io.observe(r); });
  }

  var spine = document.querySelector('[data-spine]');
  var line = spine && spine.querySelector('.spine__line');
  if (!spine || !line || reduceM) return;
  var ticking = false;
  function paint() {
    ticking = false;
    var r = spine.getBoundingClientRect();
    var mid = window.innerHeight * 0.55;
    var p = (mid - r.top) / r.height;
    p = Math.max(0, Math.min(1, p));
    line.style.setProperty('--spine', (p * 100).toFixed(2) + '%');
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(paint); }
  }, { passive: true });
  window.addEventListener('resize', paint);
  paint();
})();

/* ===== 적합도 체크리스트: 선택 개수에 따른 안내 ===== */
(function () {
  var list = document.querySelector('[data-signs]');
  var panel = document.querySelector('[data-signs-result]');
  if (!list || !panel) return;

  var countEl = panel.querySelector('.signs__count b');
  var msgEl = panel.querySelector('.signs__msg');
  var boxes = [].slice.call(list.querySelectorAll('.signs__cb'));

  var MESSAGES = [
    { max: 0, alert: false, text: '해당하는 항목을 눌러 보세요.' },
    { max: 1, alert: false, text: '한 가지만 해당한다면 다른 방식이 더 맞을 수도 있습니다. 상담에서 솔직하게 말씀드릴게요.' },
    { max: 3, alert: true,  text: '잘 맞는 편입니다. 필요한 기능과 일정만 정리하면 바로 시작할 수 있습니다.' },
    { max: 5, alert: true,  text: '잘 맞습니다. 담당자가 직접 운영하는 구조로 만들면 효과가 큰 경우예요.' },
    { max: 6, alert: true,  text: '여섯 가지 모두 해당합니다. 저희가 가장 잘하는 형태의 홈페이지입니다.' },
  ];

  function update() {
    var n = 0;
    for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) n++;
    countEl.textContent = String(n);
    for (var k = 0; k < MESSAGES.length; k++) {
      if (n <= MESSAGES[k].max) {
        msgEl.textContent = MESSAGES[k].text;
        panel.classList.toggle('is-alert', MESSAGES[k].alert);
        break;
      }
    }
  }

  boxes.forEach(function (b) { b.addEventListener('change', update); });
  update();
})();

/* ===== 다크 섹션 제목: 줄 단위 마스크 등장 ===== */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heads = document.querySelectorAll('.sec--dark .h2, .bento .h2, .flow .h2');
  if (!heads.length) return;

  [].forEach.call(heads, function (h) {
    var lines = h.innerHTML.split(/<br\s*\/?>/i);
    h.innerHTML = lines.map(function (l) {
      return '<span class="ln"><span class="ln__i">' + l + '</span></span>';
    }).join('');
    if (reduce) { h.classList.add('is-lines-in'); return; }
    var inner = h.querySelectorAll('.ln__i');
    for (var i = 0; i < inner.length; i++) {
      inner[i].style.transitionDelay = (i * 0.11) + 's';
    }
  });

  if (reduce) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-lines-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.4 });
  [].forEach.call(heads, function (h) { io.observe(h); });
})();

/* ===== 전후 비교 스크롤 와이프 ===== */
(function () {
  var root = document.querySelector('[data-wipe]');
  if (!root) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 760px)').matches) return;

  var stage = root.querySelector('.wipe__stage');
  var clip = root.querySelector('[data-wipe-clip]');
  var bar = root.querySelector('[data-wipe-bar]');
  var tagB = root.querySelector('[data-wipe-tag-b]');
  var tagA = root.querySelector('[data-wipe-tag-a]');
  var capB = root.querySelector('[data-wipe-cap-b]');
  var capA = root.querySelector('[data-wipe-cap-a]');
  if (!stage || !clip || !bar) return;

  var cur = 0, target = 0, raf = null;

  function ease(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  function apply(v) {
    clip.style.clipPath = 'inset(0 ' + (v * 100).toFixed(2) + '% 0 0)';
    bar.style.transform = 'translateX(' + ((1 - v) * stage.offsetWidth - 1).toFixed(1) + 'px)';
    if (tagB) tagB.style.opacity = String(Math.max(0, 1 - v * 1.6));
    if (tagA) tagA.style.opacity = String(Math.max(0, (v - 0.35) / 0.4));
    if (capB) capB.style.opacity = String(Math.max(0, 1 - v * 1.8));
    if (capA) capA.style.opacity = String(Math.max(0, (v - 0.45) / 0.35));
  }

  function tick() {
    cur += (target - cur) * 0.14;
    if (Math.abs(target - cur) < 0.0008) { cur = target; apply(cur); raf = null; return; }
    apply(cur);
    raf = requestAnimationFrame(tick);
  }

  var pin = root.closest('[data-wipe-pin]');

  function measure() {
    var t;
    if (pin) {
      // 섹션이 고정된 구간을 기준으로 진행도를 계산
      var pr = pin.getBoundingClientRect();
      var span = pin.offsetHeight - window.innerHeight;
      if (span <= 0) { target = 1; }
      else {
        var raw = (-pr.top) / span;
        // 앞뒤로 멈춰 있는 구간을 두어 전환이 급하지 않게
        t = (raw - 0.14) / 0.72;
        target = ease(Math.max(0, Math.min(1, t)));
      }
    } else {
      var r = stage.getBoundingClientRect();
      t = (window.innerHeight * 0.82 - r.top) / (window.innerHeight * 0.6);
      target = ease(Math.max(0, Math.min(1, t)));
    }
    if (raf === null) raf = requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', measure, { passive: true });
  window.addEventListener('resize', function () { measure(); apply(cur); });
  measure();
  apply(0);
})();
