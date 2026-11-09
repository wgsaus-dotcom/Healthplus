// Public website analytics only; initialise once per document.
(function () {
  if (!["healthplusint.com.au", "www.healthplusint.com.au"].includes(location.hostname)) return;
  if (window.__hpiAnalyticsLoaded) return;
  window.__hpiAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  // GA4 handles the initial view and enhanced-measurement history events.
  window.gtag("config", "G-EZVR5R6CX8", {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  // Queue the view immediately, but keep the third-party download out of the
  // initial rendering path. Every visit still loads analytics, without requiring
  // a click or scroll, and enhanced measurement remains enabled.
  function loadTag() {
    var tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=G-EZVR5R6CX8";
    document.head.appendChild(tag);
  }
  function afterLoad() {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadTag, { timeout: 1500 });
    } else {
      window.setTimeout(loadTag, 0);
    }
  }
  if (document.readyState === "complete") afterLoad();
  else window.addEventListener("load", afterLoad, { once: true });
})();
