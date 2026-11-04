// Public website analytics only; initialise once per document.
(function () {
  if (!["healthplusint.com.au", "www.healthplusint.com.au"].includes(location.hostname)) return;
  if (window.__hpiAnalyticsLoaded) return;
  window.__hpiAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  // GA4 handles the initial view and enhanced-measurement history events.
  window.gtag("config", "G-7KLWXBSFEK", {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  var tag = document.createElement("script");
  tag.async = true;
  tag.src = "https://www.googletagmanager.com/gtag/js?id=G-7KLWXBSFEK";
  document.head.appendChild(tag);
})();
