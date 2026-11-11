// Optional analytics stays completely unloaded until the visitor opts in.
(function () {
  if (window.HPIConsent) return;
  var KEY = 'hpi-cookie-choice-v1', MAX_AGE = 180 * 86400000;
  var ID = 'G-EZVR5R6CX8';
  var production = ['healthplusint.com.au', 'www.healthplusint.com.au'].includes(location.hostname);
  var loaded = false, choice = readChoice(), banner, dialog;
  function readChoice() {
    try {
      var value = JSON.parse(localStorage.getItem(KEY));
      if (value && value.version === 1 && typeof value.analytics === 'boolean' &&
          typeof value.time === 'number' && value.time <= Date.now() && Date.now() - value.time < MAX_AGE) return value;
    } catch (_) {}
    return null;
  }
  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach(function (item) {
      var name = item.split('=')[0].trim();
      if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) return;
      ['', location.hostname, 'healthplusint.com.au', '.healthplusint.com.au'].forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (domain ? '; domain=' + domain : '');
      });
    });
  }
  function startAnalytics() {
    if (!production || loaded || !choice || !choice.analytics) return;
    loaded = true;
    window['ga-disable-' + ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 15552000,
      cookie_update: false,
      // Avoid sending query strings, fragments or external referrer parameters.
      page_location: location.origin + location.pathname,
      page_referrer: ''
    });
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(tag);
    var metricool = document.createElement('script');
    metricool.async = true;
    metricool.src = 'https://tracker.metricool.com/resources/be.js';
    var tracked = false;
    metricool.onload = function () {
      // Recheck permission in case it changed while the script downloaded.
      if (tracked || !choice || !choice.analytics || !window.beTracker) return;
      tracked = true;
      window.beTracker.t({ hash: 'c8e5c8f57752e29b2baf29f4b8e3aa6c' });
    };
    document.head.appendChild(metricool);
  }
  function save(analytics) {
    var withdrawing = loaded && !analytics;
    choice = { version: 1, analytics: !!analytics, time: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch (_) {}
    if (banner) banner.hidden = true;
    if (dialog && dialog.open) dialog.close();
    if (!analytics) {
      window['ga-disable-' + ID] = true;
      clearAnalyticsCookies();
      // A fresh document removes the already-loaded tracker and its listeners.
      if (withdrawing) { location.reload(); return; }
    } else startAnalytics();
  }
  function preferences() {
    dialog.querySelector('#hpi-allow-analytics').checked = !!(choice && choice.analytics);
    dialog.showModal();
  }
  window.HPIConsent = { open: preferences, save: save };
  window['ga-disable-' + ID] = !(choice && choice.analytics);
  if (!choice || !choice.analytics) clearAnalyticsCookies();
  function mount() {
    banner = document.createElement('section');
    banner.className = 'hpi-cookie-banner';
    banner.setAttribute('aria-label', 'Cookie choices');
    banner.hidden = !!choice;
    banner.innerHTML = '<div><strong>Your privacy, your choice</strong><p>Essential storage keeps this site working. Allow optional analytics to help us improve it. <a href="/privacy#cookies">Cookie information</a></p></div><div class="hpi-cookie-actions"><button type="button" data-choice="accept">Accept all</button><button type="button" data-choice="reject">Reject optional</button><button type="button" data-choice="manage">Manage preferences</button></div>';
    dialog = document.createElement('dialog');
    dialog.className = 'hpi-cookie-dialog';
    dialog.setAttribute('aria-labelledby', 'hpi-cookie-title');
    dialog.innerHTML = '<h2 id="hpi-cookie-title">Cookie preferences</h2><p>Choose what you allow. Optional cookies are off until you agree.</p><div class="hpi-cookie-option"><strong>Essential — always on</strong><p>Security and remembering your cookie choice for 180 days.</p></div><div class="hpi-cookie-option"><label><input id="hpi-allow-analytics" type="checkbox"> <strong>Analytics</strong></label><p>Allow Google Analytics and Metricool to measure visits and website usage. These providers may process information overseas.</p></div><div class="hpi-cookie-option"><strong>Marketing — not in use</strong><p>Advertising cookies are not currently installed. We will ask for a separate choice before introducing them.</p></div><p><a href="/privacy#cookies">Read our cookie information</a>. Change your choice anytime using Cookie settings in the footer.</p><div class="hpi-cookie-actions"><button type="button" data-choice="save">Save preferences</button><button type="button" data-choice="reject">Reject optional</button><button type="button" data-choice="close">Close</button></div>';
    document.body.appendChild(banner);
    document.body.appendChild(dialog);
    document.addEventListener('click', function (event) {
      var target = event.target.closest('[data-choice], [data-cookie-settings]');
      if (!target) return;
      if (target.hasAttribute('data-cookie-settings')) { event.preventDefault(); preferences(); return; }
      var action = target.getAttribute('data-choice');
      if (action === 'accept') save(true);
      if (action === 'reject') save(false);
      if (action === 'manage') preferences();
      if (action === 'save') save(dialog.querySelector('#hpi-allow-analytics').checked);
      if (action === 'close') dialog.close();
    });
    startAnalytics();
  }
  window.addEventListener('storage', function (event) {
    if (event.key !== KEY && event.key !== null) return;
    choice = readChoice();
    if (!choice || !choice.analytics) {
      window['ga-disable-' + ID] = true;
      clearAnalyticsCookies();
      if (loaded) { location.reload(); return; }
    } else startAnalytics();
    if (banner) banner.hidden = !!choice;
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
