/* ===========================================================================
 * main.js —— 全站唯一的脚本文件（原生 JS，无依赖）
 * ---------------------------------------------------------------------------
 * 依赖：assets/js/site-config.js（必须在本文件之前引入）
 *
 * 模块索引：
 *   01. 通用小工具
 *   02. 配置注入（[data-site] / [data-href] / [data-map] / [data-year]）
 *   03. 导航栏（滚动阴影 / 移动端菜单 / 下拉）
 *   04. WhatsApp 悬浮按钮 + 移动端底部操作条            ← 需求 1
 *   05. 产品图库 + 灯箱
 *   06. 通用筛选（产品 / 案例 / 博客共用）
 *   07. 手风琴 FAQ
 *   08. 滚动进场动画 + 数字滚动
 *   09. 表单校验与提交（静态站演示模式 / 可接第三方接口）
 *   10. 回到顶部 + 锚点平滑滚动
 *
 * 说明：所有组件都靠 HTML 里的 data-* 属性自动挂载，
 *       新增页面只要复制结构、不用改这个文件。
 * ========================================================================= */
(function () {
  'use strict';

  /* ======================= 01. 通用小工具 ======================= */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const CFG = window.SITE_CONFIG || {};

  /** WhatsApp 链接生成：带预填消息 */
  function waLink(extraText) {
    if (!CFG.whatsapp) return '#';
    const msg = encodeURIComponent(extraText || CFG.whatsappMessage || '');
    return `https://wa.me/${CFG.whatsapp}${msg ? `?text=${msg}` : ''}`;
  }

  /* =============== 02. 配置注入（HTML 里不用硬编码） =============== */
  function applyConfig() {
    // 纯文本替换
    const map = {
      brand: CFG.brandName,
      brandFull: CFG.brandFullName,
      phone: CFG.phone,
      email: CFG.email,
      address: CFG.addressFull,
      addressShort: CFG.addressShort,
      hours: CFG.hours,
      tagline: CFG.tagline,
      startingPrice: CFG.startingPrice ? '$' + Number(CFG.startingPrice).toLocaleString('en-US') : '',
    };
    $$('[data-site]').forEach((el) => {
      const v = map[el.dataset.site];
      if (v != null && v !== '') el.textContent = v;
    });
    // 链接
    $$('[data-href]').forEach((el) => {
      switch (el.dataset.href) {
        case 'whatsapp':
          el.href = waLink(el.dataset.waText);
          el.target = '_blank';
          el.rel = 'noopener';
          break;
        case 'phone':
          el.href = 'tel:' + (CFG.phoneHref || '').replace(/\s/g, '');
          break;
        case 'email':
          el.href = 'mailto:' + (CFG.emailHref || CFG.email || '');
          break;
      }
    });
    // 地图
    $$('[data-map]').forEach((el) => {
      if (CFG.mapEmbedUrl) el.src = CFG.mapEmbedUrl;
    });
    // 年份
    $$('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ==================== 03. 导航栏 ==================== */
  function initHeader() {
    const header = $('.site-header');
    if (header) {
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    // 移动端抽屉
    const burger = $('.burger');
    const panel = $('#mobilePanel');
    if (burger && panel) {
      burger.addEventListener('click', () => {
        const open = panel.classList.toggle('is-open');
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', String(open));
      });
    }
    // 移动端：点击展开产品下拉
    $$('.nav-drop-wrap > .nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        if (window.matchMedia('(max-width: 1023px)').matches) {
          e.preventDefault();
          link.parentElement.classList.toggle('is-open');
        }
      });
    });
  }

  /* ============ 04. WhatsApp 悬浮按钮 + 移动端底部条 ============ */
  /* 由 JS 注入，保证全站每页一致；改样式去 style.css 的「07」段落 */
  function injectWhatsApp() {
    if ($('.wa-float')) return;

    const quick = [
      'Please send me the price list (FOB/CIF).',
      'I want to know the shipping cost to my port.',
      'Can you customise the layout and colours?',
    ];

    const wrap = document.createElement('div');
    wrap.className = 'wa-float';
    wrap.innerHTML = `
      <div class="wa-card" id="waCard" role="dialog" aria-label="WhatsApp quick chat">
        <header>
          <span>Chat with our sales engineer</span>
          <span style="display:block;font-weight:400;font-size:.76rem;opacity:.85">Typical reply within 30 minutes</span>
        </header>
        <div class="wa-body">
          ${quick.map((q) => `<a class="wa-msg" href="${waLink(q)}" target="_blank" rel="noopener" style="display:block">${q}</a>`).join('')}
          <p style="margin:.4rem 0 0;font-size:.78rem;color:#6b7280">No WhatsApp? Write to
            <a data-href="email" href="#" style="color:#c05621;font-weight:600">our sales team</a>.
          </p>
        </div>
      </div>
      <button class="wa-btn" type="button" aria-label="Chat on WhatsApp" aria-expanded="false" id="waToggle">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.37 2.98 1.17 3.09.78 3.65.73.56-.05 1.81-.74 2.06-1.45.25-.71.25-1.32.17-1.45-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.42-9.41 2.51 0 4.88.98 6.65 2.76a9.35 9.35 0 0 1 2.76 6.66c0 5.19-4.23 9.41-9.42 9.41zm8.01-17.42A11.28 11.28 0 0 0 12.03 1C5.83 1 .78 6.04.78 12.24c0 1.98.52 3.92 1.5 5.63L.7 23.39l5.67-1.48a11.2 11.2 0 0 0 5.66 1.53h.01c6.2 0 11.25-5.04 11.25-11.24 0-3-1.17-5.83-3.3-7.95z"/></svg>
      </button>`;

    const bar = document.createElement('div');
    bar.className = 'mobile-bar';
    bar.innerHTML = `
      <a class="btn btn-whatsapp" data-href="whatsapp" href="#">WhatsApp</a>
      <a class="btn btn-accent" href="contact.html">Get Quote</a>`;

    document.body.appendChild(wrap);
    document.body.appendChild(bar);

    // 点按钮：先开小卡片；卡片里再点具体问题才跳转
    const toggle = $('#waToggle', wrap);
    const card = $('#waCard', wrap);
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = card.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) card.classList.remove('is-open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') card.classList.remove('is-open');
    });
  }

  /* ==================== 05. 图库 + 灯箱 ==================== */
  function initGallery() {
    $$('[data-gallery]').forEach((g) => {
      const main = $('[data-gallery-main]', g);
      const thumbs = $$('[data-gallery-thumb]', g);
      if (!main || !thumbs.length) return;
      thumbs.forEach((th) => {
        th.addEventListener('click', () => {
          thumbs.forEach((t) => t.classList.remove('is-active'));
          th.classList.add('is-active');
          main.src = th.dataset.full || th.querySelector('img')?.src || main.src;
          main.alt = th.querySelector('img')?.alt || main.alt;
        });
      });
      // 键盘左右切换
      g.setAttribute('tabindex', '-1');
      g.addEventListener('keydown', (e) => {
        const i = thumbs.findIndex((t) => t.classList.contains('is-active'));
        if (e.key === 'ArrowRight') thumbs[(i + 1) % thumbs.length]?.click();
        if (e.key === 'ArrowLeft') thumbs[(i - 1 + thumbs.length) % thumbs.length]?.click();
      });
      // 点击大图进灯箱
      main.addEventListener('click', () => openLightbox(main.src, main.alt));
    });
  }

  function openLightbox(src, alt) {
    let box = $('.lightbox');
    if (!box) {
      box = document.createElement('div');
      box.className = 'lightbox';
      box.innerHTML = `<span class="lightbox-close" role="button" aria-label="Close">&times;</span><img alt="">`;
      document.body.appendChild(box);
      box.addEventListener('click', () => box.classList.remove('is-open'));
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') box.classList.remove('is-open');
      });
    }
    const img = $('img', box);
    img.src = src;
    img.alt = alt || '';
    box.classList.add('is-open');
  }

  /* ============ 06. 通用筛选（产品 / 案例 / 博客共用） ============
   * HTML 用法：
   *   <div data-filter-group="products">
   *     <button data-filter="all" class="filter-tab is-active">All</button>
   *     <button data-filter="20ft" class="filter-tab">20FT</button>
   *   </div>
   *   <div data-filter-target="products">
   *     <article data-cat="20ft expandable">…</article>
   *   </div>
   * data-cat 里可以用空格分隔多个分类。
   */
  function initFilters() {
    $$('[data-filter-group]').forEach((group) => {
      const name = group.dataset.filterGroup;
      const scope = $(`[data-filter-target="${name}"]`);
      if (!scope) return;
      const items = $$('[data-cat]', scope);
      const empty = $(`[data-filter-empty="${name}"]`);
      const counts = $(`[data-filter-count="${name}"]`);

      group.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter]');
        if (!btn) return;
        $$('[data-filter]', group).forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const f = btn.dataset.filter;
        let shown = 0;
        items.forEach((it) => {
          const hit = f === 'all' || (it.dataset.cat || '').split(/\s+/).includes(f);
          it.hidden = !hit;
          if (hit) shown++;
        });
        if (empty) empty.hidden = shown !== 0;
        if (counts) counts.textContent = shown;
      });
    });
  }

  /* ==================== 07. 手风琴 ==================== */
  function initAccordion() {
    $$('.accordion-item').forEach((item) => {
      const head = $('.accordion-head', item);
      const body = $('.accordion-body', item);
      if (!head || !body) return;
      head.setAttribute('aria-expanded', item.classList.contains('is-open') ? 'true' : 'false');
      if (item.classList.contains('is-open')) body.style.maxHeight = body.scrollHeight + 'px';
      head.addEventListener('click', () => {
        const open = item.classList.toggle('is-open');
        head.setAttribute('aria-expanded', String(open));
        body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
      });
    });
  }

  /* ============ 08. 滚动进场动画 + 数字滚动 ============ */
  function initReveal() {
    const els = $$('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach((el, i) => {
      // 同级元素自动错峰，形成逐个浮现的效果
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
      io.observe(el);
    });
  }

  function initCounters() {
    const nums = $$('[data-count]');
    if (!nums.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const dur = 1100;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = target * eased;
        el.textContent = target % 1 === 0 ? Math.round(v).toLocaleString('en-US') : v.toFixed(1);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target % 1 === 0 ? target.toLocaleString('en-US') : target.toFixed(1);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) return nums.forEach(run);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }),
      { threshold: 0.4 }
    );
    nums.forEach((n) => io.observe(n));
  }

  /* ==================== 09. 表单校验与提交 ==================== */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validateField(field) {
    const input = $('.input, .select, .textarea', field);
    if (!input) return true;
    const val = (input.value || '').trim();
    let ok = true;
    if (input.required && !val) ok = false;
    if (ok && input.type === 'email' && val && !EMAIL_RE.test(val)) ok = false;
    if (ok && input.dataset.minlen && val.length < Number(input.dataset.minlen)) ok = false;
    field.classList.toggle('has-error', !ok);
    return ok;
  }

  function initForms() {
    $$('form.js-form').forEach((form) => {
      const success = $('.form-success', form.parentElement) || $('.form-success', form);
      // 实时校验（失焦时）
      $$('.field', form).forEach((f) => {
        const input = $('.input, .select, .textarea', f);
        if (input) input.addEventListener('blur', () => validateField(f));
        if (input) input.addEventListener('input', () => { if (f.classList.contains('has-error')) validateField(f); });
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 蜜罐：机器人填了就静默丢弃
        const hp = $('input[name="_hp"]', form);
        if (hp && hp.value) return;

        const fields = $$('.field', form);
        let firstBad = null;
        fields.forEach((f) => { if (!validateField(f) && !firstBad) firstBad = f; });
        if (firstBad) {
          firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
          $('.input, .select, .textarea', firstBad)?.focus();
          return;
        }

        const btn = $('[type="submit"]', form);
        const label = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.innerHTML = 'Sending…'; }

        try {
          if (CFG.formEndpoint) {
            // 走真实接口（Formspree / 自建接口）
            const res = await fetch(CFG.formEndpoint, {
              method: CFG.formMethod || 'POST',
              body: new FormData(form),
              headers: { Accept: 'application/json' },
            });
            if (!res.ok) throw new Error('Request failed: ' + res.status);
          } else {
            // 演示模式：没有配接口时只做本地校验，不发请求
            await new Promise((r) => setTimeout(r, 600));
            console.info('[demo] 表单未配置提交地址（site-config.js 的 formEndpoint）。当前只做本地演示，未真正发送。');
          }
          form.hidden = true;
          if (success) {
            success.classList.add('is-open');
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } catch (err) {
          alert('Sorry, sending failed. Please email us directly or try WhatsApp.');
          console.error(err);
        } finally {
          if (btn) { btn.disabled = false; btn.innerHTML = label; }
        }
      });
    });
  }

  /* ============ 10. 回到顶部 + 锚点平滑滚动 ============ */
  function initToTop() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(btn);
    const onScroll = () => btn.classList.toggle('is-open', window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initAnchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', id);
      });
    });
  }

  /* ==================== 启动 ==================== */
  function boot() {
    applyConfig();
    initHeader();
    injectWhatsApp();
    initGallery();
    initFilters();
    initAccordion();
    initReveal();
    initCounters();
    initForms();
    initToTop();
    initAnchors();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
