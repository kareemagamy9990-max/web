# ربط صفحة العروض بـ Google Sheet

كل زائر بيسجّل في صفحة **العروض** (الاسم + الموبايل + الإيميل) بيتضاف صف جديد في الشيت.
الربط مرة واحدة بس، وبياخد حوالي 5 دقايق.

## 1) اعمل الشيت
1. افتح https://sheets.new — سمّيه مثلاً **تسجيلات العروض**.
2. من القائمة: **Extensions ← Apps Script**.

## 2) حط الكود
امسح أي كود موجود في `Code.gs` وحط ده، وبعدين **Save**:

```javascript
const SHEET_NAME = 'Leads';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['التاريخ', 'الاسم', 'الموبايل', 'الإيميل', 'اللغة', 'الصفحة']);
      sh.setFrozenRows(1);
    }
    const p = (e && e.parameter) || {};
    // the leading ' keeps phone zeros and blocks formulas typed into the form
    const clean = v => "'" + String(v || '').slice(0, 200);
    sh.appendRow([new Date(), clean(p.name), clean(p.phone), clean(p.email), clean(p.lang), clean(p.page)]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## 3) انشره كـ Web app
1. **Deploy ← New deployment** ← من الترس اختار **Web app**.
2. **Execute as:** Me — **Who has access:** Anyone.
3. **Deploy** ← وافق على الصلاحيات (هتظهر رسالة "Google hasn't verified this app": اضغط Advanced ← Go to ...).
4. انسخ **Web app URL** (بيخلص بـ `/exec`).

## 4) حط الرابط في الموقع
لوحة التحكم ← **التواصل والإعدادات** ← **تسجيلات صفحة العروض** ← الصق الرابط ← **حفظ ونشر**.

جرّب تسجّل من صفحة العروض، والصف هيظهر في الشيت خلال ثواني.

> لو عدّلت الكود بعد كده: **Deploy ← Manage deployments ← Edit ← Version: New version**، عشان الرابط يفضل زي ما هو.
> لحد ما الرابط يتحط، التسجيلات بتوصل على إيميل Formspree بدل الشيت.
