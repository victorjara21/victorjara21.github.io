// Crear mapa centrado en el norte argentino
const map = L.map('map').setView([-23.2, -65.35], 7);

// Capa base (mapa)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Cargar los POIs desde el JSON
fetch('pois.json')
  .then(response => response.json())
  .then(data => {
    let markers = [];

    function renderMarkers(category) {
      markers.forEach(m => map.removeLayer(m));
      markers = [];

      data.forEach(poi => {
        if (category === 'all' || poi.category === category) {
          const marker = L.marker([poi.lat, poi.lng]).addTo(map);
          marker.bindPopup(`
            <b>${poi.name}</b><br>
            ${poi.description}<br>
            <small>${poi.address}</small><br>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${poi.lat},${poi.lng}" target="_blank">
              🚗 Llevarme allí
            </a>
          `);
          markers.push(marker);
        }
      });
    }

    renderMarkers('all');

    document.getElementById('filter').addEventListener('change', (e) => {
      renderMarkers(e.target.value);
    });
  });
