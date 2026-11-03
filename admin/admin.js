/* EgyGulf Foods — admin panel.
   Reads data.js + i18n.js from the GitHub repo, edits them in the browser,
   and saves everything (texts + uploaded images) back as ONE commit.
   Vercel picks up the commit and redeploys the site automatically. */
(function(){
'use strict';

/* ======================================================================
   State
   ====================================================================== */
const LS_KEY = 'egygulf_admin';
const A = {
  token:'', owner:'', repo:'', branch:'',
  data:null, i18n:null,
  orig:{ data:'', i18n:'' },
  shas:{ data:'', i18n:'' },
  pending:new Map(),          // repo path -> { b64, url, size }
  open:new Set(),             // open card keys
  section:'banner',
  q:'',                       // search box in texts / products
  cat:'all',
};
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const SEP = '|';

/* ======================================================================
   Helpers: paths ("d|products|3|name|ar", "t|ar|hero.title")
   ====================================================================== */
const root = () => ({ d:A.data, t:A.i18n });
function getP(path){
  return path.split(SEP).reduce((o,k) => (o == null ? undefined : o[k]), root());
}
function setP(path, val){
  const keys = path.split(SEP); const last = keys.pop();
  let o = root();
  for (const k of keys){
    if (o[k] == null) o[k] = /^\d+$/.test(k) ? [] : {};
    o = o[k];
  }
  o[last] = val;
}
const P = (...parts) => parts.join(SEP);

/* ======================================================================
   Serialisation — the exact file format the site loads
   ====================================================================== */
const serData = d => '// EgyGulf Foods — site content. Edited from /admin.html; you can also edit by hand.\nconst SITE_DATA = ' + JSON.stringify(d, null, 2) + ';\n';
const serI18n = t => '// EgyGulf Foods — page texts (ar/en). Edited from /admin.html; you can also edit by hand.\nconst I18N = ' + JSON.stringify(t, null, 2) + ';\n';
function evalFile(text, name){
  // these files are our own site content; evaluate them the same way the site does
  return new Function(text + '\n;return typeof ' + name + ' !== "undefined" ? ' + name + ' : undefined;')();
}

/* ======================================================================
   GitHub API
   ====================================================================== */
async function gh(path, opts = {}){
  const res = await fetch('https://api.github.com' + path, {
    ...opts,
    headers:{
      'Authorization':'Bearer ' + A.token,
      'Accept':'application/vnd.github+json',
      'X-GitHub-Api-Version':'2022-11-28',
      ...(opts.body ? {'Content-Type':'application/json'} : {}),
    },
  });
  if (!res.ok){
    let msg = res.status + '';
    try { const j = await res.json(); msg += ' — ' + (j.message || ''); } catch(e){}
    const err = new Error(msg); err.status = res.status; throw err;
  }
  return res.status === 204 ? null : res.json();
}
const repoPath = () => `/repos/${encodeURIComponent(A.owner)}/${encodeURIComponent(A.repo)}`;
function b64ToUtf8(b64){
  const bin = atob(b64.replace(/\n/g,''));
  return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
}
async function readRepoFile(path){
  const j = await gh(`${repoPath()}/contents/${path}?ref=${encodeURIComponent(A.branch)}`);
  return { text:b64ToUtf8(j.content), sha:j.sha };
}

/* ======================================================================
   Boot / login
   ====================================================================== */
function showLoading(text){ $('#loadingText').textContent = text || 'جاري التحميل...'; $('#loadingView').hidden = false; }
function hideLoading(){ $('#loadingView').hidden = true; }

function toast(msg, type = 'info', ms = 4500){
  const el = document.createElement('div');
  el.className = 'toast toast-' + type; el.innerHTML = msg;
  $('#toasts').appendChild(el);
  if (ms) setTimeout(() => el.remove(), ms);
  return el;
}

async function connect(){
  showLoading('جاري الاتصال بـ GitHub...');
  const repo = await gh(repoPath());
  if (!A.branch) A.branch = repo.default_branch;
  if (repo.permissions && !repo.permissions.push) {
    throw Object.assign(new Error('الـ token ده معندوش صلاحية كتابة على الريبو (Contents: Read and write).'), {status:403});
  }
  showLoading('جاري تحميل محتوى الموقع...');
  const [df, tf] = await Promise.all([readRepoFile('data.js'), readRepoFile('i18n.js')]);
  A.data = evalFile(df.text, 'SITE_DATA');
  A.i18n = evalFile(tf.text, 'I18N');
  if (!A.data || !A.i18n) throw new Error('مش قادر أقرا data.js أو i18n.js');
  normalise();
  A.orig.data = serData(A.data); A.orig.i18n = serI18n(A.i18n);
  A.shas.data = df.sha; A.shas.i18n = tf.sha;
  A.pending.clear();
}

function normalise(){
  const d = A.data;
  d.settings = Object.assign({ siteUrl:'', email:'', phones:[], whatsapp:'', facebook:'', instagram:'', linkedin:'', formEndpoint:'' }, d.settings || {});
  d.images = Object.assign({ heroMosaic:'', snacksMosaic:'', candyMosaic:'', aboutImage:'', chairmanPhoto:'', expoVideo:'' }, d.images || {});
  for (const k of ['stats','events','brands','products','certifications','reach','leadership','markets']) if (!Array.isArray(d[k])) d[k] = [];
  A.i18n.ar = A.i18n.ar || {}; A.i18n.en = A.i18n.en || {};
}

function loadSaved(){
  try { return JSON.parse(localStorage.getItem(LS_KEY) || sessionStorage.getItem(LS_KEY) || 'null'); } catch(e){ return null; }
}
function saveLogin(remember){
  const v = JSON.stringify({ token:A.token, owner:A.owner, repo:A.repo, branch:A.branch });
  try {
    if (remember) localStorage.setItem(LS_KEY, v); else { localStorage.removeItem(LS_KEY); sessionStorage.setItem(LS_KEY, v); }
  } catch(e){}
}
function clearLogin(){ try { localStorage.removeItem(LS_KEY); sessionStorage.removeItem(LS_KEY); } catch(e){} }

function loginErrorText(e){
  if (e.status === 401) return 'الـ token غلط أو انتهت صلاحيته.';
  if (e.status === 404) return 'مش لاقي الريبو، أو الـ token ملوش صلاحية عليه. اتأكد من اسم الريبو ومن اختيار الريبو في إعدادات الـ token.';
  if (e.status === 403) return e.message.includes('صلاحية') ? e.message : 'GitHub رفض الطلب (403). اتأكد إن صلاحية Contents = Read and write.';
  return 'حصل خطأ: ' + esc(e.message);
}

async function start(){
  const saved = loadSaved();
  if (saved && saved.token){
    Object.assign(A, saved);
    try { await connect(); openApp(); return; }
    catch(e){ hideLoading(); showLogin(loginErrorText(e)); return; }
  }
  hideLoading(); showLogin();
}
function showLogin(err){
  $('#appView').hidden = true; $('#loginView').hidden = false;
  if (A.owner) $('#loginOwner').value = A.owner;
  if (A.repo) $('#loginRepo').value = A.repo;
  $('#loginError').innerHTML = err || '';
}
$('#loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  A.token = $('#loginToken').value.trim();
  A.owner = $('#loginOwner').value.trim();
  A.repo = $('#loginRepo').value.trim();
  A.branch = $('#loginBranch').value.trim();
  $('#loginError').textContent = '';
  $('#loginBtn').disabled = true;
  try {
    await connect();
    saveLogin($('#loginRemember').checked);
    $('#loginView').hidden = true;
    openApp();
  } catch(err){
    hideLoading();
    $('#loginError').innerHTML = loginErrorText(err);
  } finally { $('#loginBtn').disabled = false; }
});
$('#logoutBtn').addEventListener('click', () => {
  if (isDirty() && !confirm('فيه تعديلات مش محفوظة. تخرج برضه؟')) return;
  clearLogin(); location.reload();
});

function openApp(){
  hideLoading();
  $('#appView').hidden = false;
  const fromHash = location.hash.slice(1);
  if (SECTIONS.some(s => s.id === fromHash)) A.section = fromHash;
  renderNav(); render(); updateDirty();
}

/* ======================================================================
   Dirty tracking + save
   ====================================================================== */
function referencedPending(texts){
  const all = texts.data + texts.i18n;
  return [...A.pending.keys()].filter(p => all.includes(JSON.stringify(p).slice(1,-1)));
}
function currentTexts(){ return { data:serData(A.data), i18n:serI18n(A.i18n) }; }
function isDirty(){
  const t = currentTexts();
  return t.data !== A.orig.data || t.i18n !== A.orig.i18n || referencedPending(t).length > 0;
}
let dirtyTimer = null;
function updateDirty(){
  clearTimeout(dirtyTimer);
  dirtyTimer = setTimeout(() => {
    const d = isDirty();
    $('#dirtyBadge').hidden = !d;
    $('#discardBtn').hidden = !d;
    $('#saveBtn').disabled = !d;
  }, 150);
}
window.addEventListener('beforeunload', e => { if (A.data && isDirty()) { e.preventDefault(); e.returnValue = ''; } });

$('#discardBtn').addEventListener('click', () => {
  if (!confirm('هترجع كل التعديلات اللي ما اتحفظتش. متأكد؟')) return;
  A.data = evalFile(A.orig.data, 'SITE_DATA');
  A.i18n = evalFile(A.orig.i18n, 'I18N');
  normalise();
  A.pending.forEach(v => URL.revokeObjectURL(v.url)); A.pending.clear();
  render(); updateDirty();
});

$('#saveBtn').addEventListener('click', save);
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's'){ e.preventDefault(); if (!$('#saveBtn').disabled) save(); }
});

async function save(){
  const texts = currentTexts();
  const imgs = referencedPending(texts);
  const changed = [];
  if (texts.data !== A.orig.data) changed.push('data.js');
  if (texts.i18n !== A.orig.i18n) changed.push('i18n.js');
  if (!changed.length && !imgs.length) return;
  $('#saveBtn').disabled = true;
  showLoading('جاري الحفظ على GitHub...');
  try {
    // someone else (or another tab) changed the content since we loaded it?
    const [rd, rt] = await Promise.all([
      changed.includes('data.js') ? gh(`${repoPath()}/contents/data.js?ref=${encodeURIComponent(A.branch)}`) : null,
      changed.includes('i18n.js') ? gh(`${repoPath()}/contents/i18n.js?ref=${encodeURIComponent(A.branch)}`) : null,
    ]);
    if ((rd && rd.sha !== A.shas.data) || (rt && rt.sha !== A.shas.i18n)){
      hideLoading();
      if (!confirm('المحتوى اتعدّل على GitHub من مكان تاني بعد ما فتحت اللوحة. لو حفظت دلوقتي هتكتب فوق التعديلات دي.\n\nتحفظ برضه؟')) { $('#saveBtn').disabled = false; return; }
      showLoading('جاري الحفظ على GitHub...');
    }
    const ref = await gh(`${repoPath()}/git/ref/heads/${encodeURIComponent(A.branch)}`);
    const headSha = ref.object.sha;
    const head = await gh(`${repoPath()}/git/commits/${headSha}`);
    const tree = [];
    for (const f of changed){
      tree.push({ path:f, mode:'100644', type:'blob', content: f === 'data.js' ? texts.data : texts.i18n });
    }
    let n = 0;
    for (const p of imgs){
      showLoading(`جاري رفع الصور (${++n}/${imgs.length})...`);
      const blob = await gh(`${repoPath()}/git/blobs`, { method:'POST', body:JSON.stringify({ content:A.pending.get(p).b64, encoding:'base64' }) });
      tree.push({ path:p, mode:'100644', type:'blob', sha:blob.sha });
    }
    showLoading('جاري إنشاء الـ commit...');
    const newTree = await gh(`${repoPath()}/git/trees`, { method:'POST', body:JSON.stringify({ base_tree:head.tree.sha, tree }) });
    const parts = [];
    if (changed.length) parts.push('المحتوى');
    if (imgs.length) parts.push(imgs.length === 1 ? 'صورة' : imgs.length + ' صور');
    const commit = await gh(`${repoPath()}/git/commits`, { method:'POST', body:JSON.stringify({
      message:'تحديث ' + parts.join(' و') + ' من لوحة التحكم', tree:newTree.sha, parents:[headSha] }) });
    await gh(`${repoPath()}/git/refs/heads/${encodeURIComponent(A.branch)}`, { method:'PATCH', body:JSON.stringify({ sha:commit.sha }) });

    // refresh our baseline
    const [nd, nt] = await Promise.all([
      gh(`${repoPath()}/contents/data.js?ref=${commit.sha}`), gh(`${repoPath()}/contents/i18n.js?ref=${commit.sha}`)]);
    A.shas.data = nd.sha; A.shas.i18n = nt.sha;
    A.orig = { data:texts.data, i18n:texts.i18n };
    imgs.forEach(p => A.pending.delete(p));
    hideLoading(); updateDirty();
    render();
    toast('✓ اتحفظ على GitHub. الموقع هيتحدث خلال دقيقة تقريباً.', 'ok', 6000);
    watchPublish(texts.data);
  } catch(e){
    hideLoading();
    $('#saveBtn').disabled = false;
    const noWrite = e.status === 403 || e.status === 404;
    toast(noWrite
      ? `الحفظ ما نجحش: الـ token ده يقدر يقرا الريبو بس مش يكتب عليه.<br>اعمل token جديد وانت داخل بحساب <b>${esc(A.owner)}</b>، واختار فيه <b>Resource owner = ${esc(A.owner)}</b> وريبو <b>${esc(A.repo)}</b>، و<b>Contents = Read and write</b>. وبعدين اعمل تسجيل خروج وادخل بيه.`
      : 'الحفظ ما نجحش: ' + esc(e.message) + (e.status === 409 ? ' — جرّب تاني.' : ''), 'error', 20000);
  }
}

// After a save, poll the live site's data.js until the new version is served.
async function watchPublish(expected){
  if (!/^https?:/.test(location.protocol)) return;
  const note = toast('⏳ مستني الموقع يتنشر بالتعديلات...', 'info', 0);
  const started = Date.now();
  while (Date.now() - started < 4 * 60 * 1000){
    await new Promise(r => setTimeout(r, 6000));
    try {
      const res = await fetch('data.js?check=' + Date.now(), { cache:'no-store' });
      if (res.ok && (await res.text()) === expected){
        note.remove(); toast('✓ التعديلات ظهرت على الموقع.', 'ok', 8000); return;
      }
    } catch(e){}
  }
  note.remove();
  toast('التعديلات اتحفظت، بس لسه ما ظهرتش على الموقع. لو طولت، شوف حالة النشر في Vercel.', 'info', 10000);
}

/* ======================================================================
   Images: resize + convert to WebP in the browser, upload on save
   ====================================================================== */
function slug(name){
  return (name || 'img').replace(/\.[^.]+$/, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'img';
}
function blobToB64(blob){
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(',')[1]);
    r.onerror = rej; r.readAsDataURL(blob);
  });
}
async function processImage(file, maxSide){
  if (/svg|gif/.test(file.type)) return { blob:file, ext:file.type.includes('svg') ? 'svg' : 'gif' };
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  c.getContext('2d').drawImage(bmp, 0, 0, w, h);
  let blob = await new Promise(r => c.toBlob(r, 'image/webp', 0.86));
  let ext = 'webp';
  if (!blob || blob.type !== 'image/webp'){ blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.86)); ext = 'jpg'; }
  return { blob, ext };
}
async function handleUpload(input){
  const file = input.files && input.files[0];
  if (!file) return;
  const path = input.dataset.upload, max = parseInt(input.dataset.max || '1600', 10), isVideo = input.dataset.kind === 'video';
  try {
    let blob, ext;
    if (isVideo){
      if (file.size > 40 * 1024 * 1024){ toast('الفيديو أكبر من 40 ميجا. صغّره الأول (مثلاً بـ HandBrake) وجرّب تاني.', 'error', 8000); return; }
      blob = file; ext = (file.name.split('.').pop() || 'mp4').toLowerCase();
    } else {
      if (!file.type.startsWith('image/')){ toast('اختار ملف صورة.', 'error'); return; }
      ({ blob, ext } = await processImage(file, max));
    }
    const repoFile = `images/uploads/${slug(file.name)}-${Date.now().toString(36)}.${ext}`;
    const b64 = await blobToB64(blob);
    A.pending.set(repoFile, { b64, url:URL.createObjectURL(blob), size:blob.size });
    setP(path, repoFile);
    render(); updateDirty();
    toast(`تمت إضافة ${isVideo ? 'الفيديو' : 'الصورة'} (${Math.round(blob.size/1024)} KB). اضغط "حفظ ونشر" عشان تترفع.`, 'ok');
  } catch(e){
    toast('مش قادر أقرا الملف ده: ' + esc(e.message), 'error');
  }
}
const previewUrl = src => (src && A.pending.has(src)) ? A.pending.get(src).url : src;

/* ======================================================================
   Field builders (return HTML strings; inputs carry data-bind="path")
   ====================================================================== */
const pick = (f, l) => !f ? '' : (typeof f === 'string' ? f : (f[l] || f.ar || ''));
function fText(path, label, o = {}){
  const v = getP(path);
  return `<label class="f ${o.cls || ''}"><span class="f-label">${label}</span>
    <input type="${o.type || 'text'}" data-bind="${path}" value="${esc(v)}" ${o.dir ? `dir="${o.dir}"` : ''} placeholder="${esc(o.ph || '')}">
    ${o.help ? `<small class="f-help">${o.help}</small>` : ''}</label>`;
}
function fArea(path, label, o = {}){
  const v = getP(path) || '';
  const rows = o.rows || Math.min(8, Math.max(2, Math.ceil(String(v).length / 70)));
  return `<label class="f ${o.cls || ''}"><span class="f-label">${label}</span>
    <textarea data-bind="${path}" rows="${rows}" ${o.dir ? `dir="${o.dir}"` : ''}>${esc(v)}</textarea>
    ${o.help ? `<small class="f-help">${o.help}</small>` : ''}</label>`;
}
function fBi(path, label, o = {}){
  const fn = o.area ? fArea : fText;
  return `<div class="f-bi"><div class="f-bi-label">${label}</div><div class="f-bi-row">
    ${fn(P(path,'ar'), 'عربي', { ...o, help:'' })}
    ${fn(P(path,'en'), 'English', { ...o, dir:'ltr', help:'' })}
  </div>${o.help ? `<small class="f-help">${o.help}</small>` : ''}</div>`;
}
function fColor(path, label){
  const v = getP(path) || '#201C63';
  return `<label class="f f-color"><span class="f-label">${label}</span>
    <span class="color-row"><input type="color" data-bind="${path}" value="${esc(v)}"><input type="text" data-bind="${path}" value="${esc(v)}" dir="ltr"></span></label>`;
}
function fSelect(path, label, options){
  let v = getP(path);
  if (v === undefined || v === null) v = options.some(([o]) => o === false) ? false : options[0][0];
  return `<label class="f"><span class="f-label">${label}</span><select data-bind="${path}">
    ${options.map(([val, txt]) => `<option value="${esc(val)}" ${String(val) === String(v) ? 'selected' : ''}>${txt}</option>`).join('')}</select></label>`;
}
function fCheck(path, label){
  return `<label class="f-check"><input type="checkbox" data-bind="${path}" ${getP(path) ? 'checked' : ''}> ${label}</label>`;
}
function fLines(path, label, o = {}){
  const v = (getP(path) || []).join('\n');
  return `<label class="f"><span class="f-label">${label}</span>
    <textarea data-bind="${path}" data-type="lines" rows="${o.rows || 3}" dir="ltr">${esc(v)}</textarea>
    ${o.help ? `<small class="f-help">${o.help}</small>` : ''}</label>`;
}
function fImage(path, label, o = {}){
  const v = getP(path) || '';
  const isVideo = o.kind === 'video';
  const url = previewUrl(v);
  const pend = A.pending.has(v);
  const prev = !v ? `<div class="img-empty">${isVideo ? 'مفيش فيديو' : 'مفيش صورة'}</div>`
    : isVideo ? `<video src="${esc(url)}" muted playsinline controls preload="metadata"></video>`
    : `<img src="${esc(url)}" alt="" loading="lazy">`;
  return `<div class="f f-img ${o.cls || ''}"><span class="f-label">${label}</span>
    <div class="img-box ${o.dark ? 'dark' : ''} ${o.wide ? 'wide' : ''}">${prev}${pend ? '<span class="pend">جديدة — هتترفع مع الحفظ</span>' : ''}</div>
    <div class="img-actions">
      <label class="btn btn-sm">${v ? 'تغيير' : 'رفع'} ${isVideo ? 'فيديو' : 'صورة'}
        <input type="file" hidden accept="${isVideo ? 'video/mp4,video/webm' : 'image/*'}" data-upload="${path}" data-max="${o.max || 1600}" data-kind="${isVideo ? 'video' : 'image'}"></label>
      ${v && !o.required ? `<button type="button" class="btn btn-sm btn-ghost" data-act="clear" data-path="${path}">إزالة</button>` : ''}
    </div>
    <input type="text" class="img-path" data-bind="${path}" value="${esc(v)}" dir="ltr" title="مسار الملف">
    ${o.help ? `<small class="f-help">${o.help}</small>` : ''}</div>`;
}

/* Collapsible list of cards with move / delete / add */
function cards(path, o){
  const list = getP(path) || [];
  const items = list.map((it, i) => {
    if (o.filter && !o.filter(it, i)) return '';
    const key = P(path, i);
    const open = A.open.has(key);
    const thumb = o.thumb ? previewUrl(o.thumb(it)) : '';
    return `<div class="card ${open ? 'open' : ''} ${it && it.hidden ? 'is-hidden' : ''}">
      <div class="card-head" data-act="toggle" data-key="${key}">
        ${o.thumb ? (thumb ? `<img class="card-thumb" src="${esc(thumb)}" alt="" loading="lazy">` : `<span class="card-thumb empty" ${o.color ? `style="background:${esc(o.color(it))}"` : ''}></span>`) : ''}
        <div class="card-title"><b>${esc(o.title(it, i)) || '<i class="muted">بدون اسم</i>'}</b>${o.sub ? `<small>${esc(o.sub(it, i))}</small>` : ''}</div>
        ${it && it.hidden ? '<span class="tag">مخفي</span>' : ''}
        <div class="card-tools">
          <button type="button" class="icon-btn" data-act="up" data-path="${path}" data-i="${i}" title="لفوق" ${i === 0 ? 'disabled' : ''}>▲</button>
          <button type="button" class="icon-btn" data-act="down" data-path="${path}" data-i="${i}" title="لتحت" ${i === list.length - 1 ? 'disabled' : ''}>▼</button>
          <button type="button" class="icon-btn danger" data-act="del" data-path="${path}" data-i="${i}" title="حذف">✕</button>
        </div>
        <span class="chev">⌄</span>
      </div>
      ${open ? `<div class="card-body">${o.body(P(path, i), it, i)}</div>` : ''}
    </div>`;
  }).join('');
  return `<div class="cards">${items || '<p class="muted empty-list">مفيش عناصر لسه.</p>'}</div>
    <button type="button" class="btn btn-add" data-act="add" data-path="${path}" data-new="${o.newKey}">+ ${o.addLabel}</button>`;
}

const NEW = {
  event: () => ({ image:'', banner:true, title:{ar:'',en:''}, sub:{ar:'',en:''}, link:'' }),
  stat: () => ({ value:'', label:{ar:'',en:''} }),
  brand: () => ({ key:'brand-' + Date.now().toString(36), category:'snacks', color:'#201C63', logo:'', name:{ar:'',en:''}, desc:{ar:'',en:''}, tag:{ar:'',en:''}, init:{ar:'',en:''} }),
  product: () => ({ name:{ar:'',en:''}, brand:{ar:'',en:''}, color:'#201C63', category: A.cat === 'candy' ? 'candy' : 'snacks', sizes:{ar:'',en:''}, details:{ar:'',en:''}, flavors:[] }),
  flavor: () => ({ img:'', name:{ar:'',en:''} }),
  cert: () => ({ name:{ar:'',en:''}, code:'' }),
  reach: () => ({ name:{ar:'',en:''}, value:{ar:'',en:''} }),
  market: () => ({ name:{ar:'',en:''} }),
  leader: () => ({ name:{ar:'',en:''}, title:{ar:'',en:''}, photo:'' }),
};

/* ======================================================================
   i18n text groups
   ====================================================================== */
const GROUPS = {
  util:'الشريط العلوي', nav:'القائمة والأزرار العامة', hero:'الرئيسية — الواجهة', catBlock:'الرئيسية — قسمي السناكس والحلويات',
  about:'من نحن', chairman:'كلمة رئيس مجلس الإدارة', leadership:'فريق القيادة', markets:'أسواقنا',
  brands:'العلامات — عنوان القسم', brandsPage:'صفحة العلامات', products:'المنتجات — عنوان القسم', productsPage:'صفحات المنتجات',
  certs:'الجودة والاعتماد', reach:'التصدير', privateLabel:'التصنيع الخاص', expoVideo:'فيديو المعارض',
  cta:'قسم "راسلنا" أسفل الصفحات', form:'خانات الفورم', contact:'صفحة التواصل', footer:'الفوتر',
};
const KEY_HINTS = { eyebrow:'العنوان الصغير', title:'العنوان', sub:'الوصف', button:'الزرار', name:'الاسم', role:'المنصب' };
function keyLabel(k){
  const tail = k.split('.').slice(1).join('.');
  for (const [h, t] of Object.entries(KEY_HINTS)) if (tail === h) return t;
  return tail;
}
function textFields(keys){
  return keys.map(k => {
    const long = Math.max(String(A.i18n.ar[k] || '').length, String(A.i18n.en[k] || '').length) > 70;
    return `<div class="f-bi"><div class="f-bi-label">${esc(keyLabel(k))} <code>${esc(k)}</code></div><div class="f-bi-row">
      ${long ? fArea(P('t','ar',k), 'عربي') : fText(P('t','ar',k), 'عربي')}
      ${long ? fArea(P('t','en',k), 'English', { dir:'ltr' }) : fText(P('t','en',k), 'English', { dir:'ltr' })}
    </div></div>`;
  }).join('');
}
const keysOf = prefixes => Object.keys(A.i18n.ar).filter(k => prefixes.includes(k.split('.')[0]));
function textBlock(prefixes, title, open){
  const keys = keysOf(prefixes);
  if (!keys.length) return '';
  return `<details class="panel" ${open ? 'open' : ''}><summary>${title || 'نصوص القسم'}</summary>
    <p class="muted small">الكلام اللي بين <code>&lt;em&gt;</code> و <code>&lt;/em&gt;</code> بيظهر ملوّن.</p>${textFields(keys)}</details>`;
}

/* ======================================================================
   Sections
   ====================================================================== */
const SECTIONS = [
  { id:'banner',   label:'البانر الرئيسي',  render:secBanner },
  { id:'home',     label:'الصفحة الرئيسية', render:secHome },
  { id:'products', label:'المنتجات',        render:secProducts },
  { id:'brands',   label:'العلامات التجارية', render:secBrands },
  { id:'certs',    label:'الشهادات',        render:secCerts },
  { id:'export',   label:'التصدير والأسواق', render:secExport },
  { id:'team',     label:'من نحن والإدارة',  render:secTeam },
  { id:'texts',    label:'كل نصوص الموقع',   render:secTexts },
  { id:'settings', label:'التواصل والإعدادات', render:secSettings },
];

function secBanner(){
  return `<p class="lead">الصور اللي بتقلّب أول الصفحة الرئيسية. رتّبها بالأسهم، وأول صورة هي اللي بتظهر الأول.</p>
  <div class="tip">المقاس الأنسب لصورة البانر الكاملة <b>1900×535</b>. ولو عايزها تبان أكبر على الموبايل، ارفع لها نسخة موبايل بمقاس <b>1200×750</b>.</div>
  ${cards(P('d','events'), {
    newKey:'event', addLabel:'إضافة صورة للبانر',
    thumb:e => e.image,
    title:(e, i) => pick(e.title, 'ar') || ('صورة ' + (i + 1)),
    sub:e => e.banner ? 'بانر كامل' : 'صورة بعنوان',
    body:(p, e) => `
      <div class="grid2">
        ${fImage(P(p,'image'), 'الصورة', { max:2000, wide:true, dark:true, required:true })}
        ${fImage(P(p,'imageMobile'), 'نسخة الموبايل (اختياري)', { max:1300, dark:true, help:'لو سبتها فاضية، هتظهر نفس الصورة.' })}
      </div>
      ${fSelect(P(p,'banner'), 'نوع العرض', [[true,'بانر كامل — الصورة فيها التصميم والكلام'],[false,'صورة عادية — يظهر عليها عنوان ووصف']])}
      ${fBi(P(p,'title'), e.banner ? 'وصف الصورة (لمحركات البحث)' : 'العنوان')}
      ${e.banner ? '' : fBi(P(p,'sub'), 'الوصف')}
      <div class="grid2">
        ${fText(P(p,'link'), 'رابط عند الضغط (اختياري)', { dir:'ltr', ph:'products-snacks.html أو https://...' })}
        ${e.banner ? '' : fText(P(p,'position'), 'مكان التركيز في الصورة', { dir:'ltr', ph:'center 35%', help:'لو الصورة متقطعة غلط: جرّب center top أو center 30%.' })}
      </div>
      ${fCheck(P(p,'hidden'), 'إخفاء من الموقع مؤقتاً')}`,
  })}`;
}

function secHome(){
  return `
  <div class="panel"><h3>صور الصفحة الرئيسية</h3><div class="grid3">
    ${fImage(P('d','images','heroMosaic'), 'صورة الواجهة (جنب العنوان)', { max:1600, dark:true, required:true })}
    ${fImage(P('d','images','snacksMosaic'), 'صورة قسم السناكس', { max:1400, dark:true, required:true, help:'يفضّل PNG/WebP بخلفية شفافة.' })}
    ${fImage(P('d','images','candyMosaic'), 'صورة قسم الحلويات', { max:1400, dark:true, required:true, help:'يفضّل PNG/WebP بخلفية شفافة.' })}
  </div></div>
  <div class="panel"><h3>الأرقام تحت الواجهة</h3>
  ${cards(P('d','stats'), {
    newKey:'stat', addLabel:'إضافة رقم',
    title:s => (s.value || '') + ' — ' + pick(s.label, 'ar'),
    body:p => `${fText(P(p,'value'), 'الرقم', { dir:'ltr', ph:'2004' })}${fBi(P(p,'label'), 'الوصف')}`,
  })}</div>
  ${textBlock(['hero'], 'نصوص الواجهة', true)}
  ${textBlock(['catBlock'], 'نصوص قسمي السناكس والحلويات')}
  ${textBlock(['cta','form'], 'قسم "راسلنا" والفورم')}`;
}

function brandOptions(){
  return [['', '— اختار علامة لملء الاسم واللون —'], ...A.data.brands.map((b, i) => [String(i), pick(b.name,'ar') + ' / ' + pick(b.name,'en')])];
}
function secProducts(){
  const q = A.q.trim().toLowerCase();
  const match = p => (A.cat === 'all' || p.category === A.cat) &&
    (!q || [pick(p.name,'ar'), pick(p.name,'en'), pick(p.brand,'ar'), pick(p.brand,'en')].join(' ').toLowerCase().includes(q));
  return `<div class="toolbar">
    <div class="seg">${[['all','الكل'],['snacks','سناكس'],['candy','حلويات']].map(([v,t]) => `<button type="button" class="${A.cat === v ? 'on' : ''}" data-act="cat" data-v="${v}">${t}</button>`).join('')}</div>
    <input type="search" class="search" data-act-input="q" value="${esc(A.q)}" placeholder="بحث باسم المنتج أو العلامة...">
  </div>
  <div class="tip">صورة المنتج في الكارت هي أول نكهة، إلا لو رفعت "صورة الغلاف". صور النكهات أحسن تكون بخلفية شفافة.</div>
  ${cards(P('d','products'), {
    newKey:'product', addLabel:'إضافة منتج', filter:match,
    thumb:p => p.image || (p.flavors && p.flavors[0] && p.flavors[0].img) || '',
    color:p => p.color,
    title:p => pick(p.name, 'ar'),
    sub:p => [pick(p.brand,'ar'), p.category === 'candy' ? 'حلويات' : 'سناكس', (p.flavors || []).length + ' نكهة'].filter(Boolean).join(' · '),
    body:(p, it) => `
      ${fBi(P(p,'name'), 'اسم المنتج')}
      <div class="grid3">
        ${fSelect(P(p,'category'), 'القسم', [['snacks','سناكس'],['candy','حلويات']])}
        <label class="f"><span class="f-label">العلامة</span><select data-act-change="pickBrand" data-path="${p}">${brandOptions().map(([v,t]) => `<option value="${v}">${esc(t)}</option>`).join('')}</select></label>
        ${fColor(P(p,'color'), 'لون الخلفية')}
      </div>
      ${fBi(P(p,'brand'), 'اسم العلامة كما يظهر')}
      ${fBi(P(p,'sizes'), 'المقاسات والتعبئة')}
      ${fBi(P(p,'details'), 'الوصف', { area:true })}
      <div class="grid2">
        ${fImage(P(p,'image'), 'صورة الغلاف (اختياري)', { max:1000, help:'لو فاضية بتظهر صورة أول نكهة.' })}
        <div>${fCheck(P(p,'wide'), 'صورة عريضة (تكبير الصورة في الكارت)')}${fCheck(P(p,'hidden'), 'إخفاء المنتج من الموقع')}</div>
      </div>
      <div class="sub-panel"><h4>النكهات (${(it.flavors || []).length})</h4>
      ${cards(P(p,'flavors'), {
        newKey:'flavor', addLabel:'إضافة نكهة',
        thumb:f => f.img, title:f => pick(f.name, 'ar'), sub:f => pick(f.name, 'en'),
        body:fp => `<div class="grid2">${fImage(P(fp,'img'), 'صورة النكهة', { max:900 })}<div>${fBi(P(fp,'name'), 'اسم النكهة')}</div></div>`,
      })}</div>`,
  })}`;
}

function secBrands(){
  return `<p class="lead">بتظهر في صفحة العلامات، مقسّمة سناكس وحلويات.</p>
  ${cards(P('d','brands'), {
    newKey:'brand', addLabel:'إضافة علامة',
    thumb:b => b.logo, color:b => b.color,
    title:b => pick(b.name, 'ar'), sub:b => (b.category === 'candy' ? 'حلويات' : 'سناكس') + ' · ' + pick(b.tag, 'ar'),
    body:p => `
      ${fBi(P(p,'name'), 'اسم العلامة')}
      <div class="grid3">
        ${fSelect(P(p,'category'), 'القسم', [['snacks','سناكس'],['candy','حلويات']])}
        ${fColor(P(p,'color'), 'لون الكارت')}
        ${fImage(P(p,'logo'), 'اللوجو', { max:800, help:'PNG/WebP بخلفية شفافة.' })}
      </div>
      ${fBi(P(p,'tag'), 'التصنيف الصغير')}
      ${fBi(P(p,'desc'), 'الوصف', { area:true })}
      ${fCheck(P(p,'hidden'), 'إخفاء العلامة من الموقع')}`,
  })}
  ${textBlock(['brands','brandsPage'], 'نصوص صفحة العلامات')}`;
}

function secCerts(){
  return `${cards(P('d','certifications'), {
    newKey:'cert', addLabel:'إضافة شهادة',
    thumb:c => c.image || '', title:c => pick(c.name, 'ar'), sub:c => c.code,
    body:p => `${fBi(P(p,'name'), 'اسم الشهادة')}
      <div class="grid2">${fText(P(p,'code'), 'السطر الصغير تحتها', { dir:'ltr', ph:'FOOD SAFETY' })}
      ${fImage(P(p,'image'), 'لوجو الشهادة (اختياري)', { max:400, help:'لو فاضي بتظهر علامة الدرع الافتراضية.' })}</div>`,
  })}
  ${textBlock(['certs'], 'نصوص صفحة الجودة', true)}`;
}

function secExport(){
  return `<div class="panel"><h3>المناطق في صفحة التصدير</h3>
  ${cards(P('d','reach'), {
    newKey:'reach', addLabel:'إضافة منطقة',
    title:r => pick(r.name, 'ar'), sub:r => pick(r.value, 'ar'),
    body:p => `${fBi(P(p,'name'), 'اسم المنطقة (والعدد)')}${fBi(P(p,'value'), 'الدول', { area:true })}`,
  })}</div>
  <div class="panel"><h3>أسواقنا (صفحة من نحن)</h3>
  ${cards(P('d','markets'), {
    newKey:'market', addLabel:'إضافة دولة',
    title:m => pick(m.name, 'ar'), sub:m => pick(m.name, 'en'),
    body:p => fBi(P(p,'name'), 'اسم الدولة'),
  })}</div>
  <div class="panel"><h3>فيديو المعارض</h3>
    ${fImage(P('d','images','expoVideo'), 'الفيديو', { kind:'video', help:'MP4 أقل من 40 ميجا. لو شلته، القسم كله هيختفي.' })}</div>
  ${textBlock(['reach','privateLabel','expoVideo'], 'نصوص صفحة التصدير')}`;
}

function secTeam(){
  return `<div class="panel"><h3>من نحن</h3>
    ${fImage(P('d','images','aboutImage'), 'صورة قسم من نحن', { max:1400 })}
    ${textBlock(['about'], 'نصوص من نحن', true)}</div>
  <div class="panel"><h3>كلمة رئيس مجلس الإدارة</h3>
    ${fImage(P('d','images','chairmanPhoto'), 'صورة رئيس مجلس الإدارة', { max:900, help:'صورة طولية (3:4) بتظهر أحسن.' })}
    ${textBlock(['chairman'], 'الكلمة والاسم', true)}</div>
  <div class="panel"><h3>فريق القيادة</h3>
  <div class="tip">لو مسحت كل الأعضاء، القسم هيختفي من الموقع.</div>
  ${cards(P('d','leadership'), {
    newKey:'leader', addLabel:'إضافة عضو',
    thumb:m => m.photo || '', title:m => pick(m.name, 'ar'), sub:m => pick(m.title, 'ar'),
    body:p => `${fBi(P(p,'name'), 'الاسم')}${fBi(P(p,'title'), 'المنصب')}${fImage(P(p,'photo'), 'الصورة (اختياري)', { max:600 })}`,
  })}
  ${textBlock(['leadership','markets'], 'عناوين الأقسام')}</div>`;
}

function secTexts(){
  const q = A.q.trim().toLowerCase();
  const all = Object.keys(A.i18n.ar);
  const groups = {};
  for (const k of all){
    if (q && !(k.toLowerCase().includes(q) || String(A.i18n.ar[k]).toLowerCase().includes(q) || String(A.i18n.en[k] || '').toLowerCase().includes(q))) continue;
    (groups[k.split('.')[0]] = groups[k.split('.')[0]] || []).push(k);
  }
  const order = [...Object.keys(GROUPS), ...Object.keys(groups).filter(g => !GROUPS[g])];
  const html = order.filter(g => groups[g]).map(g =>
    `<details class="panel" ${q ? 'open' : ''}><summary>${esc(GROUPS[g] || g)} <span class="count">${groups[g].length}</span></summary>${textFields(groups[g])}</details>`).join('');
  return `<div class="toolbar"><input type="search" class="search" data-act-input="q" value="${esc(A.q)}" placeholder="دوّر على أي كلام في الموقع..."></div>
  <p class="muted small">الكلام اللي بين <code>&lt;em&gt;</code> و <code>&lt;/em&gt;</code> بيظهر ملوّن. و <code>&amp;amp;</code> معناها علامة &amp;.</p>
  ${html || '<p class="muted">مفيش نتايج.</p>'}`;
}

function secSettings(){
  const s = P('d','settings');
  return `<div class="panel"><h3>بيانات التواصل</h3>
    <div class="grid2">
      ${fText(P(s,'email'), 'الإيميل', { dir:'ltr', type:'email' })}
      ${fText(P(s,'whatsapp'), 'رقم واتساب (اختياري)', { dir:'ltr', ph:'01099281170', help:'لو حطيت رقم، هيظهر زرار واتساب عائم في كل الصفحات.' })}
    </div>
    ${fLines(P(s,'phones'), 'أرقام التليفون (رقم في كل سطر)')}
    ${textBlock(['util'], 'العنوان في الشريط العلوي', true)}
  </div>
  <div class="panel"><h3>السوشيال ميديا</h3><div class="grid3">
    ${fText(P(s,'facebook'), 'فيسبوك', { dir:'ltr' })}
    ${fText(P(s,'instagram'), 'إنستجرام', { dir:'ltr' })}
    ${fText(P(s,'linkedin'), 'لينكدإن', { dir:'ltr' })}
  </div><small class="f-help">سيب الخانة فاضية عشان الأيقونة تختفي.</small></div>
  <div class="panel"><h3>الفورم</h3>
    ${fText(P(s,'formEndpoint'), 'رابط Formspree', { dir:'ltr', help:'الرسايل اللي بتتبعت من فورم الموقع بتوصل على الإيميل المربوط بالرابط ده في Formspree.' })}
  </div>
  <div class="panel"><h3>الحساب</h3>
    <p class="muted small">متصل بـ <code dir="ltr">${esc(A.owner)}/${esc(A.repo)}</code> على فرع <code dir="ltr">${esc(A.branch)}</code>.</p>
  </div>`;
}

/* ======================================================================
   Render + events
   ====================================================================== */
function renderNav(){
  $('#sideNav').innerHTML = SECTIONS.map(s => `<button type="button" class="${s.id === A.section ? 'on' : ''}" data-sec="${s.id}">${s.label}</button>`).join('');
}
function render(keepScroll = true){
  const sec = SECTIONS.find(s => s.id === A.section) || SECTIONS[0];
  $('#pageTitle').textContent = sec.label;
  const y = window.scrollY;
  const active = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.actInput : null;
  $('#content').innerHTML = sec.render();
  if (keepScroll) window.scrollTo(0, y);
  if (active){ const el = $(`[data-act-input="${active}"]`); if (el){ el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }
}

$('#sideNav').addEventListener('click', e => {
  const b = e.target.closest('[data-sec]'); if (!b) return;
  A.section = b.dataset.sec; A.q = ''; A.open.clear();
  history.replaceState(null, '', '#' + A.section);
  renderNav(); render(false); window.scrollTo(0, 0);
  document.body.classList.remove('nav-open');
});
$('#menuBtn').addEventListener('click', () => document.body.classList.toggle('nav-open'));

const content = $('#content');
content.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.actInput === 'q'){ A.q = t.value; clearTimeout(t._tm); t._tm = setTimeout(() => render(), 250); return; }
  const path = t.dataset.bind; if (!path) return;
  let v = t.type === 'checkbox' ? t.checked : t.value;
  if (t.dataset.type === 'lines') v = t.value.split('\n').map(s => s.trim()).filter(Boolean);
  if (t.tagName === 'SELECT' && (v === 'true' || v === 'false')) v = v === 'true';
  setP(path, v);
  // keep the two color inputs in sync
  if (t.type === 'color' || (t.type === 'text' && /^#[0-9a-f]{6}$/i.test(v))){
    content.querySelectorAll(`[data-bind="${CSS.escape(path)}"]`).forEach(o => { if (o !== t) o.value = v; });
  }
  updateDirty();
});
content.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.upload){ handleUpload(t); return; }
  if (t.dataset.actChange === 'pickBrand' && t.value !== ''){
    const b = A.data.brands[parseInt(t.value, 10)]; const p = t.dataset.path;
    if (b){ setP(P(p,'brand'), { ar:pick(b.name,'ar'), en:pick(b.name,'en') }); setP(P(p,'color'), b.color); setP(P(p,'category'), b.category); }
    render(); updateDirty(); return;
  }
  // structural selects (e.g. banner type, category) re-render to show/hide fields
  if (t.tagName === 'SELECT' || t.type === 'checkbox'){ render(); updateDirty(); }
});
content.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const act = b.dataset.act;
  if (act === 'toggle'){
    if (e.target.closest('.card-tools')) return;
    const k = b.dataset.key; A.open.has(k) ? A.open.delete(k) : A.open.add(k); render(); return;
  }
  if (act === 'cat'){ A.cat = b.dataset.v; render(); return; }
  const path = b.dataset.path;
  if (act === 'clear'){ setP(path, ''); render(); updateDirty(); return; }
  const list = getP(path); if (!Array.isArray(list)) return;
  const i = parseInt(b.dataset.i, 10);
  const shiftOpen = (from, to) => {
    const kf = P(path, from), kt = P(path, to);
    const of = A.open.has(kf), ot = A.open.has(kt);
    A.open.delete(kf); A.open.delete(kt);
    if (of) A.open.add(kt); if (ot) A.open.add(kf);
  };
  if (act === 'up' && i > 0){ [list[i-1], list[i]] = [list[i], list[i-1]]; shiftOpen(i, i-1); }
  else if (act === 'down' && i < list.length - 1){ [list[i+1], list[i]] = [list[i], list[i+1]]; shiftOpen(i, i+1); }
  else if (act === 'del'){
    const name = b.closest('.card').querySelector('.card-title b').textContent.trim();
    if (!confirm(`حذف "${name}"؟`)) return;
    list.splice(i, 1);
    [...A.open].filter(k => k.startsWith(path + SEP)).forEach(k => A.open.delete(k));
  }
  else if (act === 'add'){
    list.push(NEW[b.dataset.new]());
    A.open.add(P(path, list.length - 1));
    render(); updateDirty();
    const cardsEl = b.previousElementSibling; const last = cardsEl && cardsEl.lastElementChild;
    if (last && last.scrollIntoView) last.scrollIntoView({ behavior:'smooth', block:'center' });
    return;
  }
  render(); updateDirty();
});

start();
})();
