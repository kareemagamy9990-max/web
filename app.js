(function(){
  if (typeof SITE_DATA === 'undefined') return;
  const D = SITE_DATA;
  const S = D.settings || {};
  const IMG = D.images || {};

  // Language is remembered across page loads so navigating keeps the visitor's choice.
  let lang = 'en';
  try { lang = localStorage.getItem('egygulf_lang') || 'en'; } catch(e) {}
  if (lang !== 'ar' && lang !== 'en') lang = 'en';

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

  /* ---------- SEO: page title + description follow the visitor's language ---------- */
  const PAGE_META = {"index": {"en": ["EgyGulf Foods | Egyptian Snacks, Candy, Pasta & Sauces Manufacturer & Exporter", "EgyGulf Foods is an Egyptian manufacturer and exporter since 2004: baked snacks, lollipops, chewing gum, hard candy, pasta and sauces. HALAL, ISO 22000, HACCP and FDA registered, exporting to 40+ countries with private label options."], "ar": ["إيجي جالف فودز | مصنع ومصدّر سناكس وحلويات ومكرونة وصوصات مصري", "إيجي جالف فودز مصنع ومصدّر مصري منذ 2004: سناكس مخبوزة، لولي بوب، لبان، حلوى، مكرونة وصوصات. حلال وISO 22000 وHACCP وFDA، وتصدير لأكثر من 40 دولة مع تصنيع خاص."]}, "about": {"en": ["About EgyGulf Foods | Egyptian Food Manufacturer Since 2004", "The story of EgyGulf Foods, from Delta Foods Industries in 2004 to an international Egyptian food manufacturer: the first oven-baked snacks in Egypt, exported to 40+ countries."], "ar": ["من نحن | إيجي جالف فودز — مصنع أغذية مصري منذ 2004", "قصة إيجي جالف فودز، من دلتا فودز إندستريز 2004 إلى شركة مصرية دولية: أول من قدّم سناكس مخبوزة في مصر، ومنتجاتنا بتوصل لأكثر من 40 دولة."]}, "products": {"en": ["Our Brands & Products | Snacks, Candy, Pasta & Sauces — EgyGulf Foods", "Browse EgyGulf Foods brands: ChillOut, Special and Crazy snacks; Light Pop, Honey, MOJO and Tutti Lolly confectionery; Bronto pasta and Hevory sauces — every product and flavor."], "ar": ["منتجاتنا وبراندتنا | سناكس وحلويات ومكرونة وصوصات — إيجي جالف فودز", "تصفّح براندات إيجي جالف فودز: شيل آوت وسبيشيال وكريزي للسناكس، لايت بوب وهني وموجو وتوتي لولي للحلويات، مكرونة برونتو وصوصات هيفوري — بكل المنتجات والنكهات."]}, "certifications": {"en": ["Quality & Certifications | HALAL, ISO 22000, HACCP, FDA — EgyGulf Foods", "EgyGulf Foods quality and food-safety certifications: HALAL, ISO 22000, ISO 45001, ISO 9001, HACCP and FDA registration covering every production line."], "ar": ["الجودة والاعتماد | حلال، ISO 22000، HACCP، FDA — إيجي جالف فودز", "شهادات الجودة وسلامة الغذاء لإيجي جالف فودز: حلال، ISO 22000، ISO 45001، ISO 9001، HACCP، وتسجيل FDA على كل خطوط الإنتاج."]}, "export": {"en": ["Export & Global Reach | 40+ Countries — EgyGulf Foods", "EgyGulf Foods exports to 40+ countries across Europe, Africa, the Middle East, Asia and the Americas, with a direct export team handling shipping, documents and private label."], "ar": ["التصدير والانتشار الدولي | أكثر من 40 دولة — إيجي جالف فودز", "إيجي جالف فودز بتصدّر لأكثر من 40 دولة في أوروبا وأفريقيا والشرق الأوسط وآسيا والأمريكتين، بفريق تصدير مباشر للشحن والمستندات والتصنيع الخاص."]}, "contact": {"en": ["Contact & Request a Quote — EgyGulf Foods", "Contact the EgyGulf Foods export team for prices, samples and private label: email, phone or visit our factory at Kilo 90, Tanta–Cairo/Alexandria Agricultural Road, Egypt."], "ar": ["تواصل معنا واطلب عرض سعر — إيجي جالف فودز", "تواصل مع فريق التصدير في إيجي جالف فودز للأسعار والعينات والتصنيع الخاص: إيميل أو تليفون أو زيارة المصنع في كيلو 90 طريق طنطا–القاهرة/الإسكندرية الزراعي."]}, "offers": {"en": ["Offers & Deals — EgyGulf Foods", "Exclusive offers and discounts on EgyGulf Foods snacks, candy, pasta and sauces for registered customers."], "ar": ["العروض — إيجي جالف فودز", "عروض وخصومات حصرية على سناكس وحلويات ومكرونة وصوصات إيجي جالف فودز للعملاء المسجّلين."]}, "brand": {"en": ["Our Brands — EgyGulf Foods", "EgyGulf Foods brand catalogue: every product and flavor."], "ar": ["براندتنا — إيجي جالف فودز", "كتالوج براندات إيجي جالف فودز بكل المنتجات والنكهات."]}};
  const pageKey = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/,'') || 'index';
  function setMeta(sel, attr, val){ const el = document.querySelector(sel); if (el && val) el.setAttribute(attr, val); }
  function applyMeta(l, over){
    const m = over || (PAGE_META[pageKey] && PAGE_META[pageKey][l]); if (!m) return;
    document.title = m[0];
    setMeta('meta[name="description"]','content',m[1]);
    setMeta('meta[property="og:title"]','content',m[0]); setMeta('meta[property="og:description"]','content',m[1]);
    setMeta('meta[name="twitter:title"]','content',m[0]); setMeta('meta[name="twitter:description"]','content',m[1]);
  }

  /* ---------- Language ---------- */
  function applyI18n(l){
    if (typeof I18N === 'undefined') return;
    const dict = I18N[l] || I18N.ar;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    applyMeta(l);
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
      } else if (key === 'whatsapp') {
        const num = String(S.whatsapp || '').replace(/\D/g,'').replace(/^0/, '20');
        if (num) el.setAttribute('href', 'https://wa.me/' + num); else el.style.display = 'none';
      } else if (['facebook','instagram','linkedin','youtube','tiktok','x'].includes(key)) {
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
    box.innerHTML = D.stats.map(s => `<div class="stat"><b data-count="${esc(s.value)}">${esc(s.value)}</b><span>${esc(pick(s.label, l))}</span></div>`).join('');
    // count up once when the numbers scroll into view (years like 2004 count from 1990)
    const run = el => {
      const target = parseInt(el.dataset.count, 10); if (!target || el.dataset.done) return;
      el.dataset.done = '1'; const from = target > 1900 ? 1990 : 0; const t0 = performance.now(), dur = 1200;
      const step = now => { const k = Math.min(1, (now - t0) / dur); const e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(from + (target - from) * e); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }), { threshold: .6 });
      box.querySelectorAll('b[data-count]').forEach(b => io.observe(b));
    }
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
    const chev = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
    if (prev) prev.innerHTML = chev;
    if (next) next.innerHTML = chev;
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

  /* ---------- Brand page: sticky product switcher + scroll spy ---------- */
  let bpSpyBound = false;
  function setupBrandNav(){
    const nav = document.getElementById('bpNav');
    if (!nav) return;
    const items = [...nav.querySelectorAll('.bp-nav-item')];
    const secs = [...document.querySelectorAll('.bp-product[id^="bp-"]')];
    const header = document.querySelector('.navbar');
    const headH = () => (header ? header.offsetHeight : 0);
    document.documentElement.style.setProperty('--nav-h', headH() + 'px');
    const goTo = id => {
      const el = document.getElementById(id); if (!el) return;
      const y = el.getBoundingClientRect().top + scrollY - headH() - nav.offsetHeight - 14;
      scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    };
    document.querySelectorAll('.bp-nav-item, .bp-next').forEach(a => a.addEventListener('click', e => {
      e.preventDefault(); goTo(a.getAttribute('href').slice(1));
    }));
    const spy = () => {
      const n = document.getElementById('bpNav'); if (!n) return;
      const line = headH() + n.offsetHeight + 80;
      let cur = 0;
      document.querySelectorAll('.bp-product[id^="bp-"]').forEach((sec, i) => { if (sec.getBoundingClientRect().top <= line) cur = i; });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = document.querySelectorAll('.bp-product[id^="bp-"]').length - 1;
      n.querySelectorAll('.bp-nav-item').forEach((a, i) => {
        const on = i === cur;
        if (on && !a.classList.contains('active')) a.scrollIntoView({ block:'nearest', inline:'center', behavior:'smooth' });
        a.classList.toggle('active', on);
      });
      n.classList.toggle('stuck', n.getBoundingClientRect().top <= headH() + 1);
    };
    if (!bpSpyBound) { bpSpyBound = true; addEventListener('scroll', spy, { passive:true }); addEventListener('resize', () => { document.documentElement.style.setProperty('--nav-h', headH() + 'px'); spy(); }); }
    spy();
  }

  /* ---------- Nav: "Our Products" mega menu with every brand, grouped by category ---------- */
  function buildMega(l){
    const link = document.querySelector('.nav-links a[href="products.html"]');
    if (!link) return;
    let wrap = link.closest('.nav-mega-wrap');
    if (!wrap) {
      wrap = document.createElement('span'); wrap.className = 'nav-mega-wrap';
      link.parentNode.insertBefore(wrap, link); wrap.appendChild(link);
      link.classList.add('has-mega');
      const panel = document.createElement('div'); panel.className = 'nav-mega'; wrap.appendChild(panel);
      let t; const open = () => { clearTimeout(t); wrap.classList.add('open'); };
      const close = () => { t = setTimeout(() => wrap.classList.remove('open'), 160); };
      wrap.addEventListener('mouseenter', open); wrap.addEventListener('mouseleave', close);
      wrap.addEventListener('focusin', open); wrap.addEventListener('focusout', close);
    }
    const panel = wrap.querySelector('.nav-mega');
    const cats = [['snacks', l === 'ar' ? 'سناكس' : 'Snacks'], ['candy', l === 'ar' ? 'حلويات' : 'Confectionery'],
                  ['pasta', l === 'ar' ? 'مكرونة' : 'Pasta'], ['sauces', l === 'ar' ? 'صوصات' : 'Sauces']];
    const live = (D.brands || []).filter(b => !b.hidden);
    panel.innerHTML = `<div class="nav-mega-inner">
      ${cats.map(([c, name]) => { const bs = live.filter(b => b.category === c); if (!bs.length) return '';
        return `<div class="mega-col"><a class="mega-cat" href="products.html?cat=${c}">${esc(name)}</a>
          <div class="mega-brands">${bs.map(b => `<a class="mega-brand" href="brand.html?b=${encodeURIComponent(b.key)}" style="--brand:${esc(b.color)}">
            <span class="mega-logo">${b.logo ? `<img src="${esc(b.logo)}" alt="" loading="lazy">` : esc(pick(b.name,l))}</span>
            <span class="mega-name">${esc(pick(b.name,l))}</span></a>`).join('')}</div></div>`; }).join('')}
      <a class="mega-all" href="products.html">${l === 'ar' ? 'كل المنتجات' : 'All products'} <span aria-hidden="true">${l === 'ar' ? '←' : '→'}</span></a>
    </div>`;
  }

  /* ---------- Page content ---------- */
  function renderContent(l){
    renderStats(l);
    buildMega(l);
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
    const brandLogo = p => {
      const b = (D.brands || []).find(b => b.logo && b.name && p.brand && b.name.en === p.brand.en);
      return b ? b.logo : '';
    };
    // useLogo: show the brand logo on the card; product photos only appear inside the popup
    // "Coming soon" products: a full-width exclusive teaser banner, not clickable
    const soonCard = p => {
      const logo = brandLogo(p);
      return `
      <div class="product-soon-card" style="--soon-accent:${esc(p.color || '#4A44A8')}">
        <span class="soon-glow" aria-hidden="true"></span>
        <div class="soon-logo">${logo ? `<img src="${esc(logo)}" alt="${esc(pick(p.brand,l))}" loading="lazy">` : ''}</div>
        <div class="soon-text">
          <span class="soon-eyebrow">${l === 'ar' ? 'حصريًا ✦ منتج جديد' : 'Exclusive ✦ New product'}</span>
          <h4>${esc(pick(p.name,l))}</h4>
          <p>${esc(pick(p.teaser,l)) || (l === 'ar' ? 'جاهزين لحاجة جديدة؟ استنونا قريب جدًا.' : 'Something new is on its way — stay tuned.')}</p>
        </div>
        <span class="soon-pill"><span class="soon-dot"></span>${l === 'ar' ? 'قريبًا' : 'Coming soon'}</span>
      </div>`;
    };
    const productCard = (p, useLogo) => {
      if (p.soon) return soonCard(p);
      const idx = products.indexOf(p);
      const flavors = (p.flavors || []).filter(f => f && f.img);
      const logo = useLogo ? brandLogo(p) : '';
      const cover = logo || p.image || (flavors[0] && flavors[0].img);
      const hasGallery = flavors.length > 0;
      const clickable = hasGallery || Boolean(pick(p.sizes,l) || pick(p.details,l));
      const moreLabel = hasGallery
        ? (l === 'ar' ? 'عرض النكهات' : 'View flavors')
        : (clickable ? (l === 'ar' ? 'التفاصيل' : 'View details') : '');
      return `
      <div class="product-card${clickable ? ' has-gallery' : ''}" ${clickable ? `data-product-idx="${idx}" tabindex="0" role="button"` : ''}>
        <div class="product-media${logo ? ' is-logo' : ''}" style="background:${logo ? `linear-gradient(135deg, ${esc(p.color)} 0%, ${esc(p.color)}CC 100%)` : `${esc(p.color)}1A`}">
          ${cover
            ? `<img src="${esc(cover)}" alt="${esc(logo ? pick(p.brand,l) : pick(p.name,l))}" class="${logo ? 'product-logo' : 'product-photo' + (p.wide ? ' wide' : '')}" loading="lazy">`
            : `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="30" cy="30" r="22" fill="${esc(p.color)}" opacity="0.85"/>
            <circle cx="30" cy="30" r="8" fill="#FFF8ED"/></svg>`}
          ${p.soon ? `<span class="product-soon">${l === 'ar' ? 'قريبًا' : 'Coming soon'}</span>` : ''}
        </div>
        <div class="product-body">
          <span>${esc(pick(p.brand,l))}</span>
          <h4>${esc(pick(p.name,l))}</h4>
          ${moreLabel ? `<span class="product-more has-arrow">${moreLabel}</span>` : ''}
        </div>
      </div>`;
    };
    // coming-soon teasers always sit at the end of each list
    const visible = products.filter(p => !p.hidden).sort((x, y) => (x.soon ? 1 : 0) - (y.soon ? 1 : 0));
    const pS = document.getElementById('productStripSnacks'), pC = document.getElementById('productStripCandy'), pA = document.getElementById('productStrip');
    if (pS) pS.innerHTML = visible.filter(p => p.category === 'snacks').map(p => productCard(p)).join('');
    if (pC) pC.innerHTML = visible.filter(p => p.category === 'candy').map(p => productCard(p)).join('');
    if (pA) pA.innerHTML = visible.map(p => productCard(p)).join('');

    /* ---------- Our Products hub (products.html) + brand pages (brand.html?b=key) ---------- */
    const brandProducts = b => visible.filter(p => p.brand && b.name && p.brand.en === b.name.en);
    const catLabel = c => c === 'candy' ? (l === 'ar' ? 'حلويات' : 'Confectionery') : c === 'pasta' ? (l === 'ar' ? 'مكرونة' : 'Pasta') : c === 'sauces' ? (l === 'ar' ? 'صوصات' : 'Sauces') : (l === 'ar' ? 'سناكس' : 'Snacks');
    const hubLight = hex => { const m = /^#?([0-9a-f]{6})$/i.exec(hex || ''); if (!m) return false;
      const n = parseInt(m[1], 16); return (0.299*(n>>16) + 0.587*((n>>8)&255) + 0.114*(n&255)) > 170; };
    const hubCard = (b, i) => {
      const items = brandProducts(b).filter(p => !p.soon);
      // up to 3 pack shots: one per product first, then more flavors to fill the fan
      const pool = [];
      items.forEach(p => { const f = p.image || ((p.flavors || []).find(f => f && f.img) || {}).img; if (f) pool.push(f); });
      items.forEach(p => (p.flavors || []).forEach(f => { if (f && f.img && !pool.includes(f.img)) pool.push(f.img); }));
      const thumbs = pool.slice(0, 3);
      const n = items.length;
      const count = l === 'ar' ? (n === 1 ? 'منتج واحد' : (n === 2 ? 'منتجين' : `${n} منتجات`)) : `${n} ${n === 1 ? 'product' : 'products'}`;
      const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
      return `
      <a class="hub-card${hubLight(b.color) ? ' is-light' : ''}" href="brand.html?b=${encodeURIComponent(b.key)}" data-cat="${esc(b.category)}" style="--brand:${esc(b.color)}; --i:${i}">
        <span class="hub-glow" aria-hidden="true"></span>
        <span class="hub-dots" aria-hidden="true"></span>
        <span class="hub-ring" aria-hidden="true"></span>
        <span class="hub-shine" aria-hidden="true"></span>
        <div class="hub-top">
          <span class="hub-cat">${esc(catLabel(b.category))}</span>
          <span class="hub-count">${esc(count)}</span>
        </div>
        <div class="hub-stage">
          ${b.logo ? `<img class="hub-logo" src="${esc(b.logo)}" alt="${esc(pick(b.name,l))}" loading="lazy">`
                   : `<span class="brand-monogram">${esc(pick(b.init,l) || pick(b.name,l).charAt(0))}</span>`}
          <div class="hub-thumbs n${thumbs.length}" aria-hidden="true">${thumbs.map(t => `<img src="${esc(t)}" alt="" loading="lazy">`).join('')}</div>
        </div>
        <div class="hub-body">
          <div class="hub-name">
            <h3>${esc(pick(b.name,l))}</h3>
            <span class="hub-go">${l === 'ar' ? 'شوف المنتجات' : 'View products'}</span>
          </div>
          <span class="hub-arrow">${arrow}</span>
        </div>
      </a>`;
    };
    const hub = document.getElementById('brandHub');
    if (hub) {
      const params = new URLSearchParams(location.search);
      let cat = params.get('cat'); if (!['snacks','candy','pasta','sauces'].includes(cat)) cat = 'all';
      hub.innerHTML = brands.filter(b => brandProducts(b).length).map(hubCard).join('');
      // subtle 3D tilt that follows the pointer (desktop only)
      if (matchMedia('(hover:hover) and (pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        hub.querySelectorAll('.hub-card').forEach(card => {
          card.addEventListener('pointermove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
            card.style.setProperty('--rx', ((.5 - y) * 8).toFixed(2) + 'deg');
            card.style.setProperty('--ry', ((x - .5) * 10).toFixed(2) + 'deg');
            card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
            card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
          });
          card.addEventListener('pointerleave', () => { ['--rx','--ry','--mx','--my'].forEach(k => card.style.removeProperty(k)); });
        });
      }
      const applyFilter = c => {
        hub.querySelectorAll('.hub-card').forEach(el => { el.hidden = c !== 'all' && el.dataset.cat !== c; });
        document.querySelectorAll('.hub-filter button').forEach(btn => btn.classList.toggle('active', btn.dataset.cat === c));
      };
      document.querySelectorAll('.hub-filter button').forEach(btn => {
        btn.onclick = () => {
          const c = btn.dataset.cat; applyFilter(c);
          const u = new URL(location.href); if (c === 'all') u.searchParams.delete('cat'); else u.searchParams.set('cat', c);
          history.replaceState(null, '', u);
        };
      });
      applyFilter(cat);
    }
    const bp = document.getElementById('brandPage');
    if (bp) {
      const key = new URLSearchParams(location.search).get('b');
      const b = brands.find(x => x.key === key);
      if (!b) { location.replace('products.html'); return; }
      const bUrl = `https://www.egygulf-foods.com/brand.html?b=${encodeURIComponent(b.key)}`;
      applyMeta(l, [ l === 'ar' ? `${pick(b.name,l)} | ${catLabel(b.category)} — إيجي جالف فودز` : `${pick(b.name,l)} ${catLabel(b.category)} | EgyGulf Foods`, pick(b.desc,l) ]);
      setMeta('link[rel="canonical"]','href',bUrl); setMeta('meta[property="og:url"]','content',bUrl);
      if (b.logo) { setMeta('meta[property="og:image"]','content','https://www.egygulf-foods.com/' + b.logo); setMeta('meta[name="twitter:image"]','content','https://www.egygulf-foods.com/' + b.logo); }
      const isLight = hex => { const m = /^#?([0-9a-f]{6})$/i.exec(hex || ''); if (!m) return false;
        const n = parseInt(m[1], 16); return (0.299*(n>>16) + 0.587*((n>>8)&255) + 0.114*(n&255)) > 170; };
      const items = brandProducts(b);
      const others = brands.filter(x => x.key !== b.key && brandProducts(x).length);
      const live = items.filter(p => !p.soon);
      const shotsOf = p => { let sh = (p.flavors || []).filter(f => f && f.img); if (!sh.length && p.image) sh = [{ img: p.image, name: p.name }]; return sh; };
      bp.innerHTML = `
        <section class="brand-hero${isLight(b.color) ? ' is-light' : ''}" style="--brand:${esc(b.color)}">
          <span class="hub-dots" aria-hidden="true"></span>
          <div class="container brand-hero-inner">
            <div class="brand-hero-text">
              <a class="brand-back has-arrow back" href="products.html?cat=${esc(b.category)}">${l === 'ar' ? 'كل البراندات' : 'All brands'}</a>
              <span class="brand-hero-cat">${esc(catLabel(b.category))}</span>
              <h1>${esc(pick(b.name,l))}</h1>
              <p>${esc(pick(b.desc,l))}</p>
            </div>
            ${b.logo ? `<img class="brand-hero-logo" src="${esc(b.logo)}" alt="${esc(pick(b.name,l))}">` : ''}
          </div>
        </section>
        ${live.length > 1 ? `
        <nav class="bp-nav" id="bpNav" style="--brand:${esc(b.color)}" aria-label="${l === 'ar' ? 'منتجات البراند' : 'Brand products'}">
          <div class="container bp-nav-inner">
            <span class="bp-nav-label">${l === 'ar' ? `${live.length} منتجات` : `${live.length} products`}</span>
            <div class="bp-nav-list">${live.map((p, i) => {
              const sh = shotsOf(p);
              return `<a href="#bp-${i}" class="bp-nav-item" data-i="${i}">
                ${sh[0] ? `<img src="${esc(sh[0].img)}" alt="" loading="lazy">` : ''}
                <span class="bp-nav-name">${esc(pick(p.name,l))}</span>
                ${sh.length > 1 ? `<span class="bp-nav-count">${sh.length}</span>` : ''}
              </a>`; }).join('')}
            </div>
          </div>
        </nav>` : ''}
        <section class="products brand-products">
          <div class="container">
            ${live.map((p, i) => {
              const shots = shotsOf(p);
              return `
              <div class="bp-product" id="bp-${i}" data-i="${i}">
                <div class="bp-head">
                  ${live.length > 1 ? `<span class="bp-step">${l === 'ar' ? `منتج ${i + 1} من ${live.length}` : `Product ${i + 1} of ${live.length}`}</span>` : ''}
                  <h2>${esc(pick(p.name,l))}</h2>
                  ${pick(p.sizes,l) ? `<p class="bp-sizes">${esc(pick(p.sizes,l))}</p>` : ''}
                  ${pick(p.details,l) ? `<p class="bp-details">${esc(pick(p.details,l))}</p>` : ''}
                </div>
                ${shots.length ? `<div class="bp-gallery">${shots.map(f => `
                  <figure class="bp-shot" style="--brand:${esc(p.color || b.color)}">
                    <div class="bp-shot-img"><img src="${esc(f.img)}" alt="${esc(pick(f.name,l) || pick(p.name,l))}" loading="lazy"></div>
                    ${pick(f.name,l) && shots.length > 1 ? `<figcaption>${esc(pick(f.name,l))}</figcaption>` : ''}
                  </figure>`).join('')}</div>` : ''}
                ${i < live.length - 1 ? `<a href="#bp-${i + 1}" class="bp-next" style="--brand:${esc(b.color)}">
                  ${shotsOf(live[i + 1])[0] ? `<img src="${esc(shotsOf(live[i + 1])[0].img)}" alt="" loading="lazy">` : ''}
                  <span class="bp-next-text"><small>${l === 'ar' ? 'المنتج اللي بعده' : 'Next product'}</small><b>${esc(pick(live[i + 1].name,l))}</b></span>
                  <span class="bp-next-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 5v14M6 13l6 6 6-6"/></svg></span>
                </a>` : ''}
              </div>`;
            }).join('')}
            ${items.filter(p => p.soon).length ? `<div class="product-strip">${items.filter(p => p.soon).map(p => productCard(p)).join('')}</div>` : ''}
          </div>
        </section>
        ${others.length ? `
        <section class="brand-others">
          <div class="container">
            <h3>${l === 'ar' ? 'براندات تانية' : 'More brands'}</h3>
            <div class="brand-others-row">${others.map(x => `
              <a href="brand.html?b=${encodeURIComponent(x.key)}" style="--brand:${esc(x.color)}" title="${esc(pick(x.name,l))}">
                ${x.logo ? `<img src="${esc(x.logo)}" alt="${esc(pick(x.name,l))}" loading="lazy">` : esc(pick(x.name,l))}
              </a>`).join('')}
            </div>
          </div>
        </section>` : ''}`;
    }

    if (bp) setupBrandNav();

    const certGrid = document.getElementById('certGrid');
    if (certGrid && D.certifications) {
      certGrid.innerHTML = D.certifications.map(c => `
        <div class="cert-card">
          <div class="mark${c.image ? '' : ' cert-seal'}">${c.image
            ? `<img src="${esc(c.image)}" alt="" loading="lazy">`
            : (() => { const m = /^(ISO)\s*(\d+)/i.exec(c.code || '') || /^(ISO)\s*(\d+)/i.exec(pick(c.name,'en') || '');
                const big = m ? m[2] : (pick(c.name,'en') || c.code || '').split(' ')[0].toUpperCase();
                const small = m ? 'ISO' : ({ HALAL:'Certified', HACCP:'Certified', FDA:'Registered' }[big] || '');
                return `<b>${esc(big)}</b>${small ? `<i>${esc(small)}</i>` : ''}`; })()}</div>
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
      // names still written as "[Name]" are placeholders: don't show them on the live site
      const people = (D.leadership || []).filter(p => !/^\s*\[/.test(pick(p.name,l) || ''));
      const sec = leadershipGrid.closest('section');
      if (sec) sec.hidden = people.length === 0;
      leadershipGrid.innerHTML = people.map(p => `
        <div class="leader-card${p.photo ? ' has-photo' : ''}">
          ${p.photo ? `<img class="leader-photo" src="${esc(p.photo)}" alt="${esc(pick(p.name,l))}" loading="lazy">` : '<span class="leader-plus">+</span>'}
          <h4>${esc(pick(p.name,l))}</h4>
          <span>${esc(pick(p.title,l))}</span>
        </div>`).join('');
    }

    const chairman = document.querySelector('section.chairman');
    if (chairman) {
      const nameEl = chairman.querySelector('[data-i18n="chairman.name"]');
      const placeholder = nameEl && /^\s*\[/.test(nameEl.textContent);
      if (nameEl) nameEl.style.display = placeholder ? 'none' : '';
      const photo = chairman.querySelector('.chairman-photo');
      chairman.classList.toggle('no-photo', !!photo && !photo.classList.contains('has-photo'));
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
  // Make live offers hard to miss: a top bar on every page + the homepage band.
  function promoteOffers(l){
    const count = activeOffers().length;
    const dict = (typeof I18N !== 'undefined' && (I18N[l] || I18N.ar)) || {};
    const band = document.getElementById('offersBand');
    if (band) {
      band.hidden = count === 0;
      const c = document.getElementById('offersBandCount');
      if (c) c.textContent = count > 0 ? String(count) : '';
    }
    let bar = document.querySelector('.offers-bar');
    const onOffersPage = Boolean(document.getElementById('offersGate'));
    let dismissed = false;
    try { dismissed = sessionStorage.getItem('egygulf_offers_bar') === 'off'; } catch(e) {}
    if (count === 0 || onOffersPage || dismissed) { if (bar) bar.remove(); return; }
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'offers-bar';
      document.body.insertBefore(bar, document.body.firstChild);
      bar.addEventListener('click', e => {
        if (!e.target.closest('.offers-bar-close')) return;
        try { sessionStorage.setItem('egygulf_offers_bar', 'off'); } catch(err) {}
        bar.remove();
      });
    }
    bar.innerHTML = `<div class="container">
      <span>🎉 ${dict['offers.bar'] || ''}</span>
      <a class="offers-bar-link has-arrow" href="offers.html">${dict['offers.barBtn'] || ''}</a>
      <button type="button" class="offers-bar-close" aria-label="${l === 'ar' ? 'إغلاق' : 'Close'}">×</button>
    </div>`;
  }

  function renderOffers(l){
    promoteOffers(l);
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
          <a class="btn btn-primary offer-btn has-arrow" href="${esc(link)}"${/^https?:/i.test(link) ? ' target="_blank" rel="noopener"' : ''}>${dict['offers.cta'] || ''}</a>
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

      status.textContent = ''; status.className = 'form-status';
      const fields = { name, phone, email, lang, page: location.pathname, time: new Date().toISOString() };

      // The visitor gets in right away; the lead is sent in the background
      // (Apps Script can take several seconds to answer, so nobody waits on it).
      try { localStorage.setItem(OFFERS_KEY, JSON.stringify({ name, phone, email })); } catch(err) {}
      try { renderOffers(lang); } catch (err) { console.error('offers: render failed', err); }
      const sec = document.getElementById('offers');
      if (sec) sec.scrollIntoView({ behavior:'smooth', block:'start' });
      sendLead(fields);
    });
  }

  // Sheet first; if the browser can't reach Google (blocked, offline, timeout) → Formspree email.
  // keepalive lets the request finish even if the visitor leaves the page.
  async function sendLead(fields){
    const withTimeout = (ms) => {
      const c = typeof AbortController !== 'undefined' ? new AbortController() : null;
      if (c) setTimeout(() => c.abort(), ms);
      return c ? c.signal : undefined;
    };
    if (S.offersSheetUrl) {
      try {
        // Apps Script sends no CORS headers, so the reply is opaque — reaching it is enough.
        await fetch(S.offersSheetUrl, { method:'POST', mode:'no-cors', keepalive:true,
          body:new URLSearchParams(fields), signal:withTimeout(20000) });
        return;
      } catch (err) { console.warn('offers: sheet unreachable, falling back to Formspree', err); }
    }
    if (S.formEndpoint) {
      try {
        const fd = new FormData(); Object.entries({ ...fields, source:'offers' }).forEach(([k, v]) => fd.append(k, v));
        await fetch(S.formEndpoint, { method:'POST', body:fd, keepalive:true,
          headers:{ 'Accept':'application/json' }, signal:withTimeout(20000) });
      } catch (err) { console.warn('offers: formspree failed too', err); }
    }
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
