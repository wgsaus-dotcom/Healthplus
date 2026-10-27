const mapDocument = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>New South Wales map</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="anonymous">
<style>html,body,#map{height:100%;width:100%;margin:0}body{font:16px Arial,sans-serif;background:#f7f3ea;color:#09243b}.leaflet-control-attribution{font:16px Arial,sans-serif}.leaflet-container{font:16px Arial,sans-serif}#fallback{padding:20px}</style>
</head><body><div id="map" role="region" aria-label="Map of New South Wales"><p id="fallback">New South Wales</p></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin="anonymous"></script>
<script>if(window.L){document.getElementById('fallback').remove();var map=L.map('map',{scrollWheelZoom:false}).fitBounds([[-37.6,141],[-28.1,153.7]]);L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:18,attribution:'Tiles &copy; Esri — Esri, HERE, Garmin, USGS, NGA and the GIS User Community'}).addTo(map);}</script>
</body></html>`;

export default function NSWMap() {
  return <figure className="inner-map">
    <iframe title="Map of New South Wales" srcDoc={mapDocument} width="100%" height="320" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" />
    <figcaption><a className="inner-link" href="https://www.openstreetmap.org/#map=6/-32.8/147.2" target="_blank" rel="noopener noreferrer">Open the NSW map</a></figcaption>
  </figure>;
}
