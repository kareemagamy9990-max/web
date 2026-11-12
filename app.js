(function(){
  if (typeof SITE_DATA === 'undefined') return;
  const D = SITE_DATA;
  const S = D.settings || {};
  const IMG = D.images || {};

  // Language is remembered across page loads so navigating keeps the visitor's choice.
  let lang = 'ar';
  try { lang = localStorage.getItem('egygulf_lang') || 'ar'; } catch(e) {}
  if (lang !== 'ar' && lang !== 'en') lang = 'ar';

  const esc = s => String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const pick = (field, l) => !field ? '' : (typeof field === 'string' ? field : (field[l] || field.ar || ''));
  const telHref = n => 'tel:' + String(n).replace(/[^\d+]/g,'').replace(/^0/, '+20');
  const isVideo = src => /\.(mp4|webm|mov)(\?|$)/i.test(src || '');

  /* ---------- Navigation ---------- */
  const navToggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggleBtn && navLinks) {
    navToggleBtn.setAttribute('aria-expanded', 'false');
    navToggleBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggleBtn.setAttribute('aria-expanded', String(open));
      navToggleBtn.textContent = open ? '✕' : '☰';
    });
  }

  /* ---------- Language ---------- */
  function applyI18n(l){
    if (typeof I18N === 'undefined') return;
    const dict = I18N[l] || I18N.ar;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-en', l === 'en');
  }

  const langToggleBtn = document.getElementById('langToggle');
  function updateToggleLabel(){
    if (langToggleBtn) langToggleBtn.textContent = lang === 'ar' ? 'EN' : 'عربي';
  }
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      lang = lang === 'ar' ? 'en' : 'ar';
      try { localStorage.setItem('egygulf_lang', lang); } catch(e) {}
      updateToggleLabel();
      applyI18n(lang);
      renderContent(lang);
    });
  }

  /* ---------- Settings: contact details, social links, form endpoint ---------- */
  function applySettings(){
    document.querySelectorAll('[data-set]').forEach(el => {
      const key = el.getAttribute('data-set');
      if (key === 'email' && S.email) {
        el.textContent = S.email; el.setAttribute('href', 'mailto:' + S.email);
      } else if (key === 'phones' && Array.isArray(S.phones)) {
        el.innerHTML = S.phones.filter(Boolean)
          .map(p => `<a href="${esc(telHref(p))}" dir="ltr">${esc(p)}</a>`).join(' · ');
      } else if (['facebook','instagram','linkedin'].includes(key)) {
        if (S[key]) el.setAttribute('href', S[key]); else el.style.display = 'none';
      }
    });
    if (S.formEndpoint) {
      document.querySelectorAll('form[data-formspree]').forEach(f => f.setAttribute('data-formspree', S.formEndpoint));
    }
    // Floating WhatsApp button (only when a number is set)
    if (S.whatsapp && !document.querySelector('.wa-float')) {
      const num = String(S.whatsapp).replace(/\D/g,'').replace(/^0/, '20');
      const a = document.createElement('a');
      a.className = 'wa-float'; a.href = 'https://wa.me/' + num; a.target = '_blank'; a.rel = 'noopener';
      a.setAttribute('aria-label', 'WhatsApp');
      a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.82.83-3.03-.2-.31a8.2 8.2 0 1 1 6.95 3.85Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43l-.75-1.82c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.1-.22-.17-.47-.29Z"/></svg>';
      document.body.appendChild(a);
    }
  }

  /* ---------- Editable images (data-img="key") ---------- */
  function applyImages(){
    document.querySelectorAll('[data-img]').forEach(el => {
      const src = IMG[el.getAttribute('data-img')];
      if (el.tagName === 'IMG' || el.tagName === 'VIDEO') {
        if (src) { if (el.getAttribute('src') !== src) el.setAttribute('src', src); }
        else if (el.tagName === 'VIDEO') { const sec = el.closest('section'); if (sec) sec.hidden = true; }
      } else if (src) {
        // container (e.g. chairman photo): replace placeholder with the photo
        el.innerHTML = `<img src="${esc(src)}" alt="" loading="lazy">`;
        el.classList.add('has-photo');
      }
    });
  }

  /* ---------- Stats ---------- */
  function renderStats(l){
    const box = document.getElementById('heroStats');
    if (!box || !Array.isArray(D.stats)) return;
    box.innerHTML = D.stats.map(s => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(pick(s.label, l))}</span></div>`).join('');
  }

  /* ---------- Events banner carousel ---------- */
  let eventIndex = 0;
  let eventTimer = null;
  const events = () => (D.events || []).filter(ev => ev && (ev.image || ev.video) && !ev.hidden);

  function renderEvents(l){
    const track = document.getElementById('eventTrack');
    const dots = document.getElementById('eventDots');
    const banner = document.getElementById('eventBanner');
    if (!track || !dots) return;
    const list = events();
    if (!list.length) { if (banner) banner.hidden = true; return; }
    if (eventIndex >= list.length) eventIndex = 0;
    track.innerHTML = list.map((ev, i) => {
      const href = ev.link ? ` href="${esc(ev.link)}"` : '';
      const tag = ev.link ? 'a' : 'div';
      const mob = ev.imageMobile ? ` --m:url('${esc(ev.imageMobile)}');` : '';
      if (ev.video) {
        const t = pick(ev.title, l), sub = pick(ev.sub, l);
        return `<${tag} class="event-slide video-slide${ev.banner ? ' banner-slide' : ''}"${href} style="--img:url('${esc(ev.image || '')}');">
          ${ev.banner ? '<span class="banner-bg"></span>' : ''}
          <video src="${esc(ev.video)}" ${ev.image ? `poster="${esc(ev.image)}"` : ''} muted autoplay loop playsinline webkit-playsinline preload="${i === 0 ? 'auto' : 'metadata'}" aria-label="${esc(t)}"></video>
          ${!ev.banner && (t || sub) ? `<div class="event-caption">
            <span class="event-eyebrow"><span class="dot"></span>${l === 'ar' ? 'من فعالياتنا' : 'From our events'}</span>
            ${t ? `<h3>${esc(t)}</h3>` : ''}${sub ? `<p>${esc(sub)}</p>` : ''}
          </div>` : ''}
        </${tag}>`;
      }
      if (ev.banner) {
        return `<${tag} class="event-slide banner-slide"${href} style="--img:url('${esc(ev.image)}');${mob}" role="img" aria-label="${esc(pick(ev.title,l))}">
          <span class="banner-bg"></span><span class="banner-img"></span></${tag}>`;
      }
      const t = pick(ev.title, l), sub = pick(ev.sub, l);
      return `<${tag} class="event-slide"${href} style="--img:url('${esc(ev.image)}');${mob} background-position:${esc(ev.position || 'center')}">
        ${(t || sub) ? `<div class="event-caption">
          <span class="event-eyebrow"><span class="dot"></span>${l === 'ar' ? 'من فعالياتنا' : 'From our events'}</span>
          ${t ? `<h3>${esc(t)}</h3>` : ''}${sub ? `<p>${esc(sub)}</p>` : ''}
        </div>` : ''}
      </${tag}>`;
    }).join('');
    dots.innerHTML = list.length > 1 ? list.map((_, i) => `<button class="event-dot${i === eventIndex ? ' active' : ''}" data-i="${i}" aria-label="${i+1}"></button>`).join('') : '';
    dots.querySelectorAll('.event-dot').forEach(btn => btn.addEventListener('click', () => goToEvent(parseInt(btn.dataset.i, 10))));
    document.querySelectorAll('.event-arrow').forEach(b => b.hidden = list.length < 2);
    const rtl = document.documentElement.dir === 'rtl';
    const prev = document.getElementById('eventPrev'), next = document.getElementById('eventNext');
    if (prev) prev.textContent = rtl ? '›' : '‹';
    if (next) next.textContent = rtl ? '‹' : '›';
    updateEventTrack();
  }
  function playVideo(v, slide){
    // browsers only autoplay when the *property* is muted, not just the attribute
    v.muted = true; v.defaultMuted = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', '');
    const tryPlay = () => {
      const pr = v.play();
      if (pr && pr.then) pr.then(() => slide.classList.remove('needs-tap')).catch(() => slide.classList.add('needs-tap'));
    };
    if (v.readyState < 2) { v.load(); v.addEventListener('canplay', tryPlay, { once:true }); }
    tryPlay();
    if (!slide.querySelector('.video-play')) {
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'video-play'; btn.setAttribute('aria-label', 'play'); btn.innerHTML = '▶';
      btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); v.play().then(() => slide.classList.remove('needs-tap')).catch(() => {}); });
      slide.appendChild(btn);
    }
  }
  function updateEventTrack(){
    const track = document.getElementById('eventTrack');
    if (!track) return;
    const rtl = document.documentElement.dir === 'rtl';
    track.style.transform = `translateX(${(rtl ? 1 : -1) * eventIndex * 100}%)`;
    document.querySelectorAll('.event-dot').forEach((d, i) => d.classList.toggle('active', i === eventIndex));
    // only the visible slide's video plays
    track.querySelectorAll('.event-slide').forEach((slide, i) => {
      const v = slide.querySelector('video'); if (!v) return;
      if (i === eventIndex) playVideo(v, slide); else v.pause();
    });
  }
  function goToEvent(i){
    const total = events().length;
    if (!total) return;
    eventIndex = (i + total) % total;
    updateEventTrack();
    restartAutoplay();
  }
  function restartAutoplay(){
    if (!document.getElementById('eventBanner')) return;
    if (eventTimer) clearTimeout(eventTimer);
    if (events().length < 2) return;
    // a video slide stays up for its length (max 30s); images for 5.5s
    const slide = document.querySelectorAll('#eventTrack .event-slide')[eventIndex];
    const v = slide && slide.querySelector('video');
    let ms = 5500;
    if (v) ms = Math.max(ms, Math.min(30000, ((isFinite(v.duration) && v.duration) || 15) * 1000));
    eventTimer = setTimeout(() => goToEvent(eventIndex + 1), ms);
  }
  const eventBanner = document.getElementById('eventBanner');
  const eventNextBtn = document.getElementById('eventNext');
  const eventPrevBtn = document.getElementById('eventPrev');
  if (eventNextBtn) eventNextBtn.addEventListener('click', () => goToEvent(eventIndex + 1));
  if (eventPrevBtn) eventPrevBtn.addEventListener('click', () => goToEvent(eventIndex - 1));
  if (eventBanner) {
    eventBanner.addEventListener('mouseenter', () => eventTimer && clearTimeout(eventTimer));
    eventBanner.addEventListener('mouseleave', restartAutoplay);
    // swipe on touch screens
    let x0 = null;
    eventBanner.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, {passive:true});
    eventBanner.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) < 40) return;
      const rtl = document.documentElement.dir === 'rtl';
      goToEvent(eventIndex + ((dx < 0) !== rtl ? 1 : -1));
    });
  }

  /* ---------- Page content ---------- */
  function renderContent(l){
    renderStats(l);
    renderEvents(l);

    const brandCard = b => `
      <div class="brand-card">
        <div class="brand-card-media" style="background:linear-gradient(135deg, ${esc(b.color)} 0%, ${esc(b.color)}CC 100%)">
          <span class="deco-dot"></span>
          ${b.logo
            ? `<img src="${esc(b.logo)}" alt="${esc(pick(b.name,l))}" loading="lazy">`
            : `<span class="brand-monogram">${esc(pick(b.init,l) || pick(b.name,l).charAt(0))}</span>`}
        </div>
        <div class="brand-card-body">
          <h3>${esc(pick(b.name,l))}</h3>
          <p>${esc(pick(b.desc,l))}</p>
          ${pick(b.tag,l) ? `<span class="brand-tag">${esc(pick(b.tag,l))}</span>` : ''}
        </div>
      </div>`;
    const brands = (D.brands || []).filter(b => !b.hidden);
    const bS = document.getElementById('brandGridSnacks'), bC = document.getElementById('brandGridCandy'), bA = document.getElementById('brandGrid');
    if (bS) bS.innerHTML = brands.filter(b => b.category === 'snacks').map(brandCard).join('');
    if (bC) bC.innerHTML = brands.filter(b => b.category === 'candy').map(brandCard).join('');
    if (bA) bA.innerHTML = brands.map(brandCard).join('');

    const products = D.products || [];
    const productCard = p => {
      const idx = products.indexOf(p);
      const flavors = (p.flavors || []).filter(f => f && f.img);
      const cover = p.image || (flavors[0] && flavors[0].img);
      const hasGallery = flavors.length > 0;
      const clickable = hasGallery || Boolean(pick(p.sizes,l) || pick(p.details,l));
      const moreLabel = hasGallery
        ? (l === 'ar' ? 'عرض النكهات ›' : 'View flavors ›')
        : (clickable ? (l === 'ar' ? 'التفاصيل ›' : 'View details ›') : '');
      return `
      <div class="product-card${clickable ? ' has-gallery' : ''}" ${clickable ? `data-product-idx="${idx}" tabindex="0" role="button"` : ''}>
        <div class="product-media" style="background:${esc(p.color)}1A">
          ${cover
            ? `<img src="${esc(cover)}" alt="${esc(pick(p.name,l))}" class="product-photo${p.wide ? ' wide' : ''}" loading="lazy">`
            : `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="30" cy="30" r="22" fill="${esc(p.color)}" opacity="0.85"/>
            <circle cx="30" cy="30" r="8" fill="#FFF8ED"/></svg>`}
        </div>
        <div class="product-body">
          <span>${esc(pick(p.brand,l))}</span>
          <h4>${esc(pick(p.name,l))}</h4>
          ${moreLabel ? `<span class="product-more">${moreLabel}</span>` : ''}
        </div>
      </div>`;
    };
    const visible = products.filter(p => !p.hidden);
    const pS = document.getElementById('productStripSnacks'), pC = document.getElementById('productStripCandy'), pA = document.getElementById('productStrip');
    if (pS) pS.innerHTML = visible.filter(p => p.category === 'snacks').map(productCard).join('');
    if (pC) pC.innerHTML = visible.filter(p => p.category === 'candy').map(productCard).join('');
    if (pA) pA.innerHTML = visible.map(productCard).join('');

    const certGrid = document.getElementById('certGrid');
    if (certGrid && D.certifications) {
      certGrid.innerHTML = D.certifications.map(c => `
        <div class="cert-card">
          <div class="mark">${c.image
            ? `<img src="${esc(c.image)}" alt="" loading="lazy">`
            : `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 2 L20 6 V12 C20 17 16.5 20.5 12 22 C7.5 20.5 4 17 4 12 V6 Z" stroke="#F2A93B" stroke-width="1.6"/>
              <path d="M8.5 12 L11 14.5 L15.5 9.5" stroke="#F2A93B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`}</div>
          <h4>${esc(pick(c.name,l))}</h4>
          <span>${esc(c.code)}</span>
        </div>`).join('');
    }

    const reachList = document.getElementById('reachList');
    if (reachList && D.reach) {
      reachList.innerHTML = D.reach.map(r => `
        <div class="reach-item"><h4>${esc(pick(r.name,l))}</h4><span>${esc(pick(r.value,l))}</span></div>`).join('');
    }

    const leadershipGrid = document.getElementById('leadershipGrid');
    if (leadershipGrid) {
      const people = D.leadership || [];
      const sec = leadershipGrid.closest('section');
      if (sec) sec.hidden = people.length === 0;
      leadershipGrid.innerHTML = people.map(p => `
        <div class="leader-card${p.photo ? ' has-photo' : ''}">
          ${p.photo ? `<img class="leader-photo" src="${esc(p.photo)}" alt="${esc(pick(p.name,l))}" loading="lazy">` : '<span class="leader-plus">+</span>'}
          <h4>${esc(pick(p.name,l))}</h4>
          <span>${esc(pick(p.title,l))}</span>
        </div>`).join('');
    }

    const marketsGrid = document.getElementById('marketsGrid');
    if (marketsGrid && D.markets) {
      marketsGrid.innerHTML = D.markets.map(p => `<div class="partner-logo market-chip">${esc(pick(p.name,l))}</div>`).join('');
    }

    renderOffers(l);
  }

  /* ---------- Offers page: register (name/phone/email) → offers unlock ---------- */
  const OFFERS_KEY = 'egygulf_offers_user';
  function offersUser(){
    try { return JSON.parse(localStorage.getItem(OFFERS_KEY) || 'null'); } catch(e) { return null; }
  }
  function activeOffers(){
    const today = new Date().toISOString().slice(0, 10);
    // an offer disappears by itself the day after its end date
    return (D.offers || []).filter(o => o && !o.hidden && !(o.validUntil && o.validUntil < today));
  }
  function fmtDate(iso, l){
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString(l === 'ar' ? 'ar-EG' : 'en-GB', { day:'numeric', month:'long', year:'numeric' });
  }
  function renderOffers(l){
    const gate = document.getElementById('offersGate');
    const box = document.getElementById('offersContent');
    const grid = document.getElementById('offersGrid');
    if (!gate || !box || !grid) return;
    const user = offersUser();
    gate.hidden = Boolean(user);
    box.hidden = !user;
    if (!user) return;
    const nameEl = document.getElementById('offersUserName');
    if (nameEl) nameEl.textContent = user.name || '';
    const dict = (typeof I18N !== 'undefined' && (I18N[l] || I18N.ar)) || {};
    const list = activeOffers();
    if (!list.length) { grid.innerHTML = `<p class="offers-empty">${dict['offers.empty'] || ''}</p>`; return; }
    grid.innerHTML = list.map(o => {
      const link = o.link || 'contact.html';
      return `
      <article class="offer-card">
        <div class="offer-media">
          ${o.image ? `<img src="${esc(o.image)}" alt="${esc(pick(o.title,l))}" loading="lazy">` : '<span class="offer-media-empty">%</span>'}
          ${pick(o.badge,l) ? `<span class="offer-badge">${esc(pick(o.badge,l))}</span>` : ''}
        </div>
        <div class="offer-body">
          <h3>${esc(pick(o.title,l))}</h3>
          ${pick(o.desc,l) ? `<p>${esc(pick(o.desc,l))}</p>` : ''}
          ${o.validUntil ? `<span class="offer-valid">${dict['offers.validUntil'] || ''} ${esc(fmtDate(o.validUntil, l))}</span>` : ''}
          <a class="btn btn-primary offer-btn" href="${esc(link)}"${/^https?:/i.test(link) ? ' target="_blank" rel="noopener"' : ''}>${dict['offers.cta'] || ''}</a>
        </div>
      </article>`;
    }).join('');
  }

  const offersForm = document.getElementById('offersForm');
  if (offersForm) {
    const status = document.createElement('p');
    status.className = 'form-status'; status.setAttribute('role', 'status');
    offersForm.appendChild(status);
    const msg = (ar, en) => lang === 'ar' ? ar : en;
    offersForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = offersForm.name.value.trim();
      const phone = offersForm.phone.value.trim();
      const email = offersForm.email.value.trim();
      status.className = 'form-status form-status-error';
      if (name.length < 2) { status.textContent = msg('اكتب اسمك.', 'Please enter your name.'); offersForm.name.focus(); return; }
      if (phone.replace(/\D/g, '').length < 8) { status.textContent = msg('اكتب رقم موبايل صحيح.', 'Please enter a valid phone number.'); offersForm.phone.focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { status.textContent = msg('اكتب إيميل صحيح.', 'Please enter a valid email.'); offersForm.email.focus(); return; }

      const btn = offersForm.querySelector('button[type="submit"]');
      const label = btn.innerHTML;
      btn.disabled = true; btn.innerHTML = msg('جارٍ التسجيل...', 'Signing in...');
      status.textContent = ''; status.className = 'form-status';
      const fields = { name, phone, email, lang, page: location.pathname, time: new Date().toISOString() };
      // Try every channel in turn; the visitor gets in as soon as one of them takes the lead.
      const sendToSheet = async () => {
        if (!S.offersSheetUrl) return false;
        const body = new URLSearchParams(fields);
        try {
          // Apps Script sends no CORS headers, so the reply is opaque — reaching it is enough.
          await fetch(S.offersSheetUrl, { method:'POST', mode:'no-cors', body });
          return true;
        } catch (err) { console.warn('offers: sheet fetch failed', err); return false; }
      };
      const sendBeacon = () => {
        try { return Boolean(S.offersSheetUrl && navigator.sendBeacon && navigator.sendBeacon(S.offersSheetUrl, new URLSearchParams(fields))); }
        catch (err) { console.warn('offers: sendBeacon failed', err); return false; }
      };
      const sendToFormspree = async () => {
        if (!S.formEndpoint) return false;
        try {
          const fd = new FormData(); Object.entries({ ...fields, source:'offers' }).forEach(([k, v]) => fd.append(k, v));
          const res = await fetch(S.formEndpoint, { method:'POST', body:fd, headers:{ 'Accept':'application/json' } });
          return res.ok;
        } catch (err) { console.warn('offers: formspree failed', err); return false; }
      };
      try {
        const sent = (await sendToSheet()) || (await sendToFormspree()) || sendBeacon();
        if (!sent && (S.offersSheetUrl || S.formEndpoint)) throw new Error('lead not sent');
        try { localStorage.setItem(OFFERS_KEY, JSON.stringify({ name, phone, email })); } catch(err) {}
        try { renderOffers(lang); } catch (err) { console.error('offers: render failed', err); }
        const sec = document.getElementById('offers');
        if (sec) sec.scrollIntoView({ behavior:'smooth', block:'start' });
      } catch (err) {
        status.textContent = msg('حصل خطأ أثناء التسجيل، حاول تاني.', 'Something went wrong — please try again.');
        status.className = 'form-status form-status-error';
      } finally {
        btn.disabled = false; btn.innerHTML = label;
      }
    });
  }
  const offersLogout = document.getElementById('offersLogout');
  if (offersLogout) {
    offersLogout.addEventListener('click', () => {
      try { localStorage.removeItem(OFFERS_KEY); } catch(e) {}
      if (offersForm) offersForm.reset();
      renderOffers(lang);
    });
  }

  /* ---------- Forms (Formspree, no page reload) ---------- */
  document.querySelectorAll('form[data-formspree]').forEach(form => {
    const submitBtn = form.querySelector('button[type="submit"]');
    let status = form.querySelector('.form-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'form-status';
      status.setAttribute('role', 'status');
      form.appendChild(status);
    }
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitLabel = submitBtn ? submitBtn.innerHTML : '';
      status.textContent = '';
      status.className = 'form-status';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'; }
      try {
        const res = await fetch(form.getAttribute('data-formspree'), {
          method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' }
        });
        if (!res.ok) throw new Error('bad status');
        form.reset();
        status.textContent = lang === 'ar' ? 'تم الإرسال بنجاح، هنتواصل معاك قريباً.' : 'Sent successfully — we\'ll be in touch soon.';
        status.classList.add('form-status-success');
      } catch (err) {
        status.textContent = lang === 'ar' ? 'حصل خطأ أثناء الإرسال، حاول تاني.' : 'Something went wrong — please try again.';
        status.classList.add('form-status-error');
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = submitLabel; }
      }
    });
  });

  /* ---------- Product modal (flavor gallery) ---------- */
  let lastFocus = null;
  function ensureProductModal(){
    let modal = document.getElementById('productModal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'productModal';
    modal.className = 'product-modal';
    modal.innerHTML = `
      <div class="product-modal-backdrop"></div>
      <div class="product-modal-panel" role="dialog" aria-modal="true" aria-labelledby="productModalTitle">
        <button type="button" class="product-modal-close" aria-label="close">&times;</button>
        <div class="product-modal-head">
          <span class="product-modal-brand"></span>
          <h3 class="product-modal-title" id="productModalTitle"></h3>
          <p class="product-modal-desc"></p>
          <p class="product-modal-sizes"></p>
        </div>
        <div class="product-modal-gallery"></div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.product-modal-backdrop').addEventListener('click', closeProductModal);
    modal.querySelector('.product-modal-close').addEventListener('click', closeProductModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProductModal(); });
    return modal;
  }
  function closeProductModal(){
    const modal = document.getElementById('productModal');
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
  }
  function openProductModal(product, l){
    const modal = ensureProductModal();
    modal.querySelector('.product-modal-brand').textContent = pick(product.brand, l);
    modal.querySelector('.product-modal-title').textContent = pick(product.name, l);
    modal.querySelector('.product-modal-desc').textContent = pick(product.details, l);
    const sizesEl = modal.querySelector('.product-modal-sizes');
    const sizes = pick(product.sizes, l);
    sizesEl.textContent = sizes ? (l === 'ar' ? 'المقاسات المتاحة: ' : 'Available sizes: ') + sizes : '';
    sizesEl.style.display = sizes ? '' : 'none';
    modal.querySelector('.product-modal-gallery').innerHTML = (product.flavors || []).filter(f => f && f.img).map(f => `
      <div class="product-modal-flavor">
        <img src="${esc(f.img)}" alt="${esc(pick(f.name, l))}" loading="lazy">
        <span>${esc(pick(f.name, l))}</span>
      </div>`).join('');
    lastFocus = document.activeElement;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    modal.querySelector('.product-modal-close').focus();
  }
  function cardActivate(e){
    const card = e.target.closest('.product-card.has-gallery');
    if (!card) return;
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    if (e.type === 'keydown') e.preventDefault();
    const p = (D.products || [])[parseInt(card.getAttribute('data-product-idx'), 10)];
    if (p) openProductModal(p, lang);
  }
  document.addEventListener('click', cardActivate);
  document.addEventListener('keydown', cardActivate);

  /* ---------- Boot ---------- */
  updateToggleLabel();
  applyI18n(lang);
  applySettings();
  applyImages();
  renderContent(lang);
  restartAutoplay();
})();
