// Fragments are browser-only; the server cannot redirect old homepage anchors.
(function () {
  var destinations = {
    '#employer-request': '/employers#request',
    '#request': '/employers#request',
    '#worker-application': '/work-with-us#apply',
    '#workforce': '/roles#',
    '#rapid-response': '/#how',
    '#contact': '/#start',
    '#partnership': '/about#partners'
  };
  function redirectOldAnchor() {
    var path = window.location.pathname.replace(/\/+$/, '') || '/';
    var hash = window.location.hash;
    if (path === '/' && Object.prototype.hasOwnProperty.call(destinations, hash)) {
      var target = new URL(destinations[hash], window.location.origin);
      target.search = window.location.search;
      window.location.replace(target.href);
    } else if (path === '/faq' && hash) {
      window.history.replaceState(window.history.state, '', '/faq' + window.location.search);
      window.scrollTo(0, 0);
    }
  }
  redirectOldAnchor();
  window.addEventListener('hashchange', redirectOldAnchor);
  window.addEventListener('pageshow', redirectOldAnchor);
}());
