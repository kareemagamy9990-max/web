(function(){
  // Language is remembered across page loads via localStorage so navigating
  // between pages keeps the visitor's chosen language.
  let lang = localStorage.getItem('egygulf_lang') || 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = 'rtl'; // layout stays RTL in both languages

  const navToggleBtn = document.querySelector('.nav-toggle');
  if (navToggleBtn) {
    navToggleBtn.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('open');
    });
  }

  function pick(field, l){ return field[l] || field.ar; }

  // Apply translated text to every element carrying a data-i18n key
  function applyI18n(l){
    if (typeof I18N === 'undefined') return;
    const dict = I18N[l] || I18N.ar;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.documentElement.lang = l;
    document.body.classList.toggle('lang-en', l === 'en');
  }

  const langToggleBtn = document.getElementById('langToggle');
  function updateToggleLabel(){
    if (langToggleBtn) langToggleBtn.textContent = lang === 'ar' ? 'EN' : 'AR';
  }
  updateToggleLabel();
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      lang = lang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('egygulf_lang', lang);
      updateToggleLabel();
      applyI18n(lang);
      renderContent(lang);
    });
  }

  // Events banner carousel (home page only)
  let eventIndex = 0;
  let eventTimer = null;

  function renderEvents(l){
    const track = document.getElementById('eventTrack');
    const dots = document.getElementById('eventDots');
    if (!track || !dots || typeof SITE_DATA === 'undefined' || !SITE_DATA.events) return;
    track.innerHTML = SITE_DATA.events.map(ev => `
      <div class="event-slide" style="background-image:url('${ev.image}'); background-position:${ev.position || 'center'}">
        <div class="event-caption">
          <span class="event-eyebrow"><span class="dot"></span>${l === 'ar' ? 'من فعالياتنا' : 'From our events'}</span>
          <h3>${pick(ev.title, l)}</h3>
          <p>${pick(ev.sub, l)}</p>
        </div>
      </div>
    `).join('');
    dots.innerHTML = SITE_DATA.events.map((_, i) => `<button class="event-dot${i === eventIndex ? ' active' : ''}" data-i="${i}"></button>`).join('');
    dots.querySelectorAll('.event-dot').forEach(btn => {
      btn.addEventListener('click', () => goToEvent(parseInt(btn.dataset.i, 10)));
    });
    updateEventTrack();
  }

  function updateEventTrack(){
    const track = document.getElementById('eventTrack');
    if (!track) return;
    const isRTL = document.documentElement.dir === 'rtl';
    track.style.transform = `translateX(${(isRTL ? 1 : -1) * eventIndex * 100}%)`;
    document.querySelectorAll('.event-dot').forEach((d, i) => d.classList.toggle('active', i === eventIndex));
  }

  function goToEvent(i){
    if (typeof SITE_DATA === 'undefined' || !SITE_DATA.events) return;
    const total = SITE_DATA.events.length;
    eventIndex = (i + total) % total;
    updateEventTrack();
    restartAutoplay();
  }

  function restartAutoplay(){
    const banner = document.getElementById('eventBanner');
    if (!banner) return;
    if (eventTimer) clearInterval(eventTimer);
    eventTimer = setInterval(() => goToEvent(eventIndex + 1), 5000);
  }

  const eventNextBtn = document.getElementById('eventNext');
  const eventPrevBtn = document.getElementById('eventPrev');
  const eventBanner = document.getElementById('eventBanner');
  if (eventNextBtn) eventNextBtn.addEventListener('click', () => goToEvent(eventIndex + 1));
  if (eventPrevBtn) eventPrevBtn.addEventListener('click', () => goToEvent(eventIndex - 1));
  if (eventBanner) {
    eventBanner.addEventListener('mouseenter', () => eventTimer && clearInterval(eventTimer));
    eventBanner.addEventListener('mouseleave', restartAutoplay);
  }

  function renderContent(l){
    if (typeof SITE_DATA === 'undefined') return;

    renderEvents(l);

    // Brands (brands page) — split into snacks / candy sections
    const brandCard = b => `
      <div class="brand-card">
        <div class="brand-card-media" style="background:linear-gradient(135deg, ${b.color} 0%, ${b.color}CC 100%)">
          <span class="deco-dot"></span>
          ${b.logo
            ? `<img src="${b.logo}" alt="${pick(b.name,l)}">`
            : `<span class="brand-monogram">${pick(b.init,l)}</span>`}
        </div>
        <div class="brand-card-body">
          <h3>${pick(b.name,l)}</h3>
          <p>${pick(b.desc,l)}</p>
          <span class="brand-tag">${pick(b.tag,l)}</span>
        </div>
      </div>
    `;
    const brandGridSnacks = document.getElementById('brandGridSnacks');
    const brandGridCandy = document.getElementById('brandGridCandy');
    if ((brandGridSnacks || brandGridCandy) && SITE_DATA.brands) {
      if (brandGridSnacks) brandGridSnacks.innerHTML = SITE_DATA.brands.filter(b => b.category === 'snacks').map(brandCard).join('');
      if (brandGridCandy) brandGridCandy.innerHTML = SITE_DATA.brands.filter(b => b.category === 'candy').map(brandCard).join('');
    }
    const brandGrid = document.getElementById('brandGrid');
    if (brandGrid && SITE_DATA.brands) {
      brandGrid.innerHTML = SITE_DATA.brands.map(brandCard).join('');
    }

    // Products (products page) — split into snacks / candy sections
    const productCard = p => {
      const idx = SITE_DATA.products.indexOf(p);
      const hasGallery = Array.isArray(p.flavors) && p.flavors.length > 0;
      return `
      <div class="product-card${hasGallery ? ' has-gallery' : ''}" ${hasGallery ? `data-product-idx="${idx}"` : ''}>
        <div class="product-media" style="background:${p.color}1A">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="22" fill="${p.color}" opacity="0.85"/>
            <circle cx="30" cy="30" r="8" fill="#FFF8ED"/>
          </svg>
        </div>
        <div class="product-body">
          <span>${pick(p.brand,l)}</span>
          <h4>${pick(p.name,l)}</h4>
          ${hasGallery ? `<span class="product-more">${l === 'ar' ? 'عرض النكهات ›' : 'View flavors ›'}</span>` : ''}
        </div>
      </div>
    `;};
    const productStripSnacks = document.getElementById('productStripSnacks');
    const productStripCandy = document.getElementById('productStripCandy');
    if ((productStripSnacks || productStripCandy) && SITE_DATA.products) {
      if (productStripSnacks) productStripSnacks.innerHTML = SITE_DATA.products.filter(p => p.category === 'snacks').map(productCard).join('');
      if (productStripCandy) productStripCandy.innerHTML = SITE_DATA.products.filter(p => p.category === 'candy').map(productCard).join('');
    }
    const strip = document.getElementById('productStrip');
    if (strip && SITE_DATA.products) {
      strip.innerHTML = SITE_DATA.products.map(productCard).join('');
    }

    // Certifications (certifications page)
    const certGrid = document.getElementById('certGrid');
    if (certGrid && SITE_DATA.certifications) {
      certGrid.innerHTML = SITE_DATA.certifications.map(c => `
        <div class="cert-card">
          <div class="mark">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2 L20 6 V12 C20 17 16.5 20.5 12 22 C7.5 20.5 4 17 4 12 V6 Z" stroke="#F2A93B" stroke-width="1.6"/>
              <path d="M8.5 12 L11 14.5 L15.5 9.5" stroke="#F2A93B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h4>${c.name[l] || c.name.ar}</h4>
          <span>${c.code}</span>
        </div>
      `).join('');
    }

    // Reach list (export page)
    const reachList = document.getElementById('reachList');
    if (reachList && SITE_DATA.reach) {
      reachList.innerHTML = SITE_DATA.reach.map(r => `
        <div class="reach-item">
          <h4>${pick(r.name,l)}</h4>
          <span>${pick(r.value,l)}</span>
        </div>
      `).join('');
    }

    // Leadership team (about page)
    const leadershipGrid = document.getElementById('leadershipGrid');
    if (leadershipGrid && SITE_DATA.leadership) {
      leadershipGrid.innerHTML = SITE_DATA.leadership.map(p => `
        <div class="leader-card">
          <span class="leader-plus">+</span>
          <h4>${pick(p.name,l)}</h4>
          <span>${pick(p.title,l)}</span>
        </div>
      `).join('');
    }

    // Partners (about page)
    const partnersGrid = document.getElementById('partnersGrid');
    if (partnersGrid && SITE_DATA.partners) {
      partnersGrid.innerHTML = SITE_DATA.partners.map(p => `
        <div class="partner-logo">${pick(p.name,l)}</div>
      `).join('');
    }
  }

  // Contact/lead forms: submit via fetch to Formspree so the message is
  // delivered directly by email, with no mail client popup and no page reload.
  document.querySelectorAll('form[data-formspree]').forEach(form => {
    const endpoint = form.getAttribute('data-formspree');
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitLabel = submitBtn ? submitBtn.innerHTML : '';

    let status = form.querySelector('.form-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'form-status';
      form.appendChild(status);
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      status.className = 'form-status';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'; }

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.reset();
          status.textContent = lang === 'ar' ? 'تم الإرسال بنجاح، هنتواصل معاك قريباً.' : 'Sent successfully — we\'ll be in touch soon.';
          status.classList.add('form-status-success');
        } else {
          status.textContent = lang === 'ar' ? 'حصل خطأ أثناء الإرسال، حاول تاني.' : 'Something went wrong — please try again.';
          status.classList.add('form-status-error');
        }
      } catch (err) {
        status.textContent = lang === 'ar' ? 'حصل خطأ أثناء الإرسال، حاول تاني.' : 'Something went wrong — please try again.';
        status.classList.add('form-status-error');
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = submitLabel; }
      }
    });
  });

  // Product detail modal (flavor gallery) — built once, reused for any product
  function ensureProductModal(){
    let modal = document.getElementById('productModal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'productModal';
    modal.className = 'product-modal';
    modal.innerHTML = `
      <div class="product-modal-backdrop"></div>
      <div class="product-modal-panel" role="dialog" aria-modal="true">
        <button type="button" class="product-modal-close" aria-label="close">&times;</button>
        <div class="product-modal-head">
          <span class="product-modal-brand"></span>
          <h3 class="product-modal-title"></h3>
          <p class="product-modal-desc"></p>
        </div>
        <div class="product-modal-gallery"></div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.product-modal-backdrop').addEventListener('click', closeProductModal);
    modal.querySelector('.product-modal-close').addEventListener('click', closeProductModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProductModal(); });
    return modal;
  }
  function closeProductModal(){
    const modal = document.getElementById('productModal');
    if (modal) modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }
  function openProductModal(product, l){
    if (typeof SITE_DATA === 'undefined') return;
    const modal = ensureProductModal();
    modal.querySelector('.product-modal-brand').textContent = pick(product.brand, l);
    modal.querySelector('.product-modal-title').textContent = pick(product.name, l);
    modal.querySelector('.product-modal-desc').textContent = product.details ? pick(product.details, l) : '';
    const gallery = modal.querySelector('.product-modal-gallery');
    gallery.innerHTML = (product.flavors || []).map(f => `
      <div class="product-modal-flavor">
        <img src="${f.img}" alt="${pick(f.name, l)}">
        <span>${pick(f.name, l)}</span>
      </div>
    `).join('');
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card.has-gallery');
    if (!card) return;
    const idx = parseInt(card.getAttribute('data-product-idx'), 10);
    if (typeof SITE_DATA === 'undefined' || !SITE_DATA.products || !SITE_DATA.products[idx]) return;
    openProductModal(SITE_DATA.products[idx], lang);
  });

  applyI18n(lang);
  renderContent(lang);
  restartAutoplay();
})();
