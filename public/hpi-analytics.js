// Optional analytics stays completely unloaded until the visitor opts in.
(function () {
  if (window.HPIConsent) return;
  var KEY = 'hpi-cookie-choice-v1', MAX_AGE = 180 * 86400000;
  var ID = 'G-EZVR5R6CX8';
  var production = ['healthplusint.com.au', 'www.healthplusint.com.au'].includes(location.hostname);
  var CLARITY_ID = 'zk2c9x902o';
  var replayPages = ['/', '/about', '/roles', '/why-hpi', '/aged-care-workforce-nsw', '/regional-nsw-healthcare-workforce'];
  var loaded = false, replayLoaded = false, replaySuspended = false, replayReloading = false, replayTag, choice = readChoice(), banner, dialog;
  function readChoice() {
    try {
      var value = JSON.parse(localStorage.getItem(KEY));
      if (value && value.version === 1 && typeof value.analytics === 'boolean' &&
          typeof value.time === 'number' && value.time <= Date.now() && Date.now() - value.time < MAX_AGE) {
        // Existing analytics consent did not include replays.
        return { version: 1, analytics: value.analytics, replay: value.replay === true, time: value.time };
      }
    } catch (_) {}
    return null;
  }
  function clearCookies(pattern) {
    document.cookie.split(';').forEach(function (item) {
      var name = item.split('=')[0].trim();
      if (!pattern.test(name)) return;
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
  function allowsReplay() {
    var path = location.pathname.replace(/\/$/, '') || '/';
    if (!production || !replayPages.includes(path) || location.search || location.hash ||
        document.querySelector('form, input[type="file"], [contenteditable="true"]')) return false;
    try {
      if (document.referrer) {
        var source = new URL(document.referrer);
        if (source.search || source.hash) return false;
        if (source.origin === location.origin &&
            !replayPages.includes(source.pathname.replace(/\/$/, '') || '/')) return false;
      }
    } catch (_) { return false; }
    return true;
  }
  function replayConsent(allowed) {
    if (!window.clarity) return;
    window.clarity('consentv2', {
      ad_Storage: 'denied', analytics_Storage: allowed ? 'granted' : 'denied'
    });
  }
  function startReplay() {
    if (replayLoaded || replaySuspended || !choice || !choice.replay || !allowsReplay()) return;
    replayLoaded = true;
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    replayConsent(true);
    replayTag = document.createElement('script');
    replayTag.async = true;
    replayTag.referrerPolicy = 'no-referrer';
    replayTag.src = 'https://www.clarity.ms/tag/' + CLARITY_ID;
    document.head.appendChild(replayTag);
  }
  function suspendReplay() {
    if (!replayLoaded || replaySuspended) return;
    replaySuspended = true;
    // Stop before a same-document navigation where the browser exposes it.
    // If the tag is still loading, drop the queued consent and detach it.
    try {
      if (window.clarity && window.clarity.v) window.clarity('stop');
      else if (window.clarity) window.clarity.q = [];
    } catch (_) {}
    if (replayTag) replayTag.remove();
  }
  function onAddressChange() {
    if (!replayLoaded || replayReloading || allowsReplay()) return;
    replayReloading = true;
    suspendReplay();
    // Leave the visitor's choice intact. The new document will fail the URL guard.
    location.reload();
  }
  if (window.navigation && typeof window.navigation.addEventListener === 'function') {
    window.navigation.addEventListener('navigate', function (event) {
      if (!replayLoaded || !event.destination || !event.destination.sameDocument) return;
      try {
        var target = new URL(event.destination.url);
        if (target.hash || target.search || target.pathname !== location.pathname) suspendReplay();
      } catch (_) { suspendReplay(); }
    });
  }
  window.addEventListener('hashchange', onAddressChange, { capture: true });
  window.addEventListener('popstate', onAddressChange, { capture: true });
  function applyChoice() {
    var optInAnalytics = !!(choice && choice.analytics);
    var optInReplay = !!(choice && choice.replay);
    if (!optInAnalytics) {
      window['ga-disable-' + ID] = true;
      clearCookies(/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/);
    }
    if (!optInReplay) {
      if (replayLoaded) replayConsent(false);
      clearCookies(/^_cl(?:ck|sk)$/);
    }
    // Reload to stop trackers already attached to this document.
    if ((loaded && !optInAnalytics) || (replayLoaded && !optInReplay)) {
      location.reload();
      return;
    }
    startAnalytics();
    startReplay();
  }
  function save(analytics, replay) {
    choice = { version: 1, analytics: !!analytics, replay: !!replay, time: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch (_) {}
    if (banner) banner.hidden = true;
    if (dialog && dialog.open) dialog.close();
    applyChoice();
  }
  function preferences() {
    dialog.querySelector('#hpi-allow-analytics').checked = !!(choice && choice.analytics);
    dialog.querySelector('#hpi-allow-replay').checked = !!(choice && choice.replay);
    dialog.showModal();
  }
  window.HPIConsent = { open: preferences, save: save };
  window['ga-disable-' + ID] = !(choice && choice.analytics);
  function mount() {
    banner = document.createElement('section');
    banner.className = 'hpi-cookie-banner';
    banner.setAttribute('aria-label', 'Cookie choices');
    banner.hidden = !!choice;
    banner.innerHTML = '<div><strong>Your privacy, your choice</strong><p>We use essential cookies to keep this site working. Accept all to allow visitor analytics and Microsoft Clarity session replays on selected public pages. <a href="/privacy#cookies">Cookie information</a></p></div><div class="hpi-cookie-actions"><button type="button" data-choice="accept">Accept all</button><button type="button" data-choice="reject">Essentials only</button></div>';
    dialog = document.createElement('dialog');
    dialog.className = 'hpi-cookie-dialog';
    dialog.setAttribute('aria-labelledby', 'hpi-cookie-title');
    dialog.innerHTML = '<h2 id="hpi-cookie-title">Cookie preferences</h2><p>Choose what you allow. Optional cookies are off until you agree.</p><div class="hpi-cookie-option"><strong>Essential — always on</strong><p>Security and remembering your cookie choice for 180 days.</p></div><div class="hpi-cookie-option"><label><input id="hpi-allow-analytics" type="checkbox"> <strong>Analytics</strong></label><p>Allow Google Analytics and Metricool to measure visits and website usage. These providers may process information overseas.</p></div><div class="hpi-cookie-option"><label><input id="hpi-allow-replay" type="checkbox"> <strong>Session replay</strong></label><p>Allow Microsoft Clarity to record clicks, scrolling and page interactions on selected public pages. We exclude forms and use strict text masking. Microsoft may process information overseas.</p></div><div class="hpi-cookie-option"><strong>Marketing — not in use</strong><p>Advertising cookies are not currently installed. We will ask for a separate choice before introducing them.</p></div><p><a href="/privacy#cookies">Read our cookie information</a>. Change your choice anytime using Cookie settings in the footer.</p><div class="hpi-cookie-actions"><button type="button" data-choice="save">Save preferences</button><button type="button" data-choice="reject">Essentials only</button><button type="button" data-choice="close">Close</button></div>';
    document.body.appendChild(banner);
    document.body.appendChild(dialog);
    document.addEventListener('click', function (event) {
      var target = event.target.closest('[data-choice], [data-cookie-settings]');
      if (!target) return;
      if (target.hasAttribute('data-cookie-settings')) { event.preventDefault(); preferences(); return; }
      var action = target.getAttribute('data-choice');
      if (action === 'accept') save(true, true);
      if (action === 'reject') save(false);
      if (action === 'manage') preferences();
      if (action === 'save') save(dialog.querySelector('#hpi-allow-analytics').checked, dialog.querySelector('#hpi-allow-replay').checked);
      if (action === 'close') dialog.close();
    });
    applyChoice();
  }
  function refreshChoice() {
    choice = readChoice();
    if (banner) banner.hidden = !!choice;
    if (dialog) applyChoice();
  }
  window.addEventListener('storage', function (event) {
    if (event.key === KEY || event.key === null) refreshChoice();
  });
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) refreshChoice();
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
