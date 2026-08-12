(function(){
  // Language toggle disabled for now (site is Arabic-only while edits are in progress).
  // Text edits made directly in the HTML files will now stick, since we no longer
  // overwrite [data-i18n] elements from i18n.js on load.
  const lang = 'ar';
  document.documentElement.lang = 'ar';
  document.documentElement.dir = 'rtl';

  const navToggleBtn = document.querySelector('.nav-toggle');
  if (navToggleBtn) {
    navToggleBtn.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('open');
    });
  }

  function pick(field, l){ return field[l] || field.ar; }

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
          ${b.logo
            ? `<img src="${b.logo}" alt="${pick(b.name,l)}">`
            : `<span class="brand-monogram">${pick(b.init,l)}</span>`}
        </div>
        <div class="brand-card-body">
          <span class="brand-swatch" style="background:${b.color}"></span>
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
    const productCard = p => `
      <div class="product-card">
        <div class="product-media" style="background:${p.color}1A">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="22" fill="${p.color}" opacity="0.85"/>
            <circle cx="30" cy="30" r="8" fill="#FFF8ED"/>
          </svg>
        </div>
        <div class="product-body">
          <span>${pick(p.brand,l)}</span>
          <h4>${pick(p.name,l)}</h4>
        </div>
      </div>
    `;
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

  renderContent(lang);
  restartAutoplay();
})();
