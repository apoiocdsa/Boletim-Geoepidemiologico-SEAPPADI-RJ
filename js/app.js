let map, geojsonLayer, csvData = [], geojsonData = null, chartAgravo = null, chartTemporal = null;

const colorScale = [
    {min:0,max:0,color:'transparent',label:'Sem ocorrência'},
    {min:1,max:2,color:'#fff3cd',label:'Muito baixa (1-2)'},
    {min:3,max:5,color:'#ffc107',label:'Baixa (3-5)'},
    {min:6,max:10,color:'#fd7e14',label:'Média (6-10)'},
    {min:11,max:20,color:'#dc3545',label:'Alta (11-20)'},
    {min:21,max:Infinity,color:'#8b0000',label:'Muito alta (>20)'}
];

function initMap() {
    map = L.map('map', {center:[-22.0,-42.5], zoom:7, zoomControl:true});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:'© OpenStreetMap | SEAPPADI-RJ', maxZoom:18
    }).addTo(map);

    const legendControl = L.control({ position: 'bottomright' });
    legendControl.onAdd = function() {
        const div = L.DomUtil.create('div', 'legend');
        div.id = 'legend';
        return div;
    };
    legendControl.addTo(map);
}

function getColor(count) {
    if (!count || count === 0) return 'transparent';
    for (let i = colorScale.length - 1; i >= 0; i--) {
        if (count >= colorScale[i].min) return colorScale[i].color;
    }
    return 'transparent';
}

// Encontra a coluna de núcleo aceitando qualquer nome (Núcleo, Nucleo, NUCLEO, etc.)
function findNucleoColumn(row) {
    for (const key of Object.keys(row)) {
        const norm = key.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (norm.includes('nucleo')) return row[key];
    }
    return '';
}

function loadGeoJSON() {
    fetch('geojson/rj_municipios.geojson')
        .then(r => r.json())
        .then(data => { geojsonData = data; renderMap(); })
        .catch(err => console.error('Erro GeoJSON:', err));
}

function loadCSV() {
    Papa.parse('base_hub.csv', {
        download: true, header: true, dynamicTyping: true, skipEmptyLines: true,
        complete: function(results) {
            csvData = results.data.map(function(row) {
                row.nucleo = findNucleoColumn(row);
                return row;
            });
            populateFilters();
            applyFilters();
        },
        error: function(err) { console.error('Erro CSV:', err); }
    });
}

function populateFilters() {
    const agravos = [...new Set(csvData.map(r => r.agravo))].sort();
    const anos = [...new Set(csvData.map(r => r.ano))].sort((a,b) => b-a);
    const selAgravo = document.getElementById('filterAgravo');
    agravos.forEach(a => { const o = document.createElement('option'); o.value = a; o.textContent = a; selAgravo.appendChild(o); });
    const selAno = document.getElementById('filterAno');
    anos.forEach(a => { const o = document.createElement('option'); o.value = a; o.textContent = a; selAno.appendChild(o); });
    const selMun = document.getElementById('filterMunicipio');
    const municipios = [...new Set(csvData.map(r => r.municipio))].sort();
    municipios.forEach(m => { const o = document.createElement('option'); o.value = m; o.textContent = m; selMun.appendChild(o); });
    const selNucleo = document.getElementById('filterNucleo');
    const nucleos = [...new Set(csvData.map(r => r.nucleo))].filter(Boolean).sort();
    nucleos.forEach(n => { const o = document.createElement('option'); o.value = n; o.textContent = n; selNucleo.appendChild(o); });
}

function renderMap(aggregated = {}, selectedMunicipio = null) {
    if (geojsonLayer) map.removeLayer(geojsonLayer);
    geojsonLayer = L.geoJSON(geojsonData, {
        style: function(feature) {
            const cod = String(feature.properties.CD_MUN || feature.properties.cod_ibge || feature.properties.id || '');
            const nome = feature.properties.NM_MUN || feature.properties.nome || feature.properties.name || '';
            const count = aggregated[cod] || 0;
            const isSelected = selectedMunicipio && nome === selectedMunicipio;
            return {
                fillColor: getColor(count),
                weight: isSelected ? 4 : 2,
                opacity: 1,
                color: isSelected ? '#000' : '#666',
                fillOpacity: count > 0 ? 0.75 : (isSelected ? 0.3 : 0.1)
            };
        },
        onEachFeature: function(feature, layer) {
            const nome = feature.properties.NM_MUN || feature.properties.nome || feature.properties.name || 'Município';
            const cod = String(feature.properties.CD_MUN || feature.properties.cod_ibge || feature.properties.id || '');
            const count = aggregated[cod] || 0;
            layer.bindPopup('<strong>' + nome + '</strong><br>IBGE: ' + cod + '<br>Focos/Casos: ' + count);
            layer.on('mouseover', function(e) {
                e.target.setStyle({ weight: 3, color: '#000' });
            });
            layer.on('mouseout', function(e) {
                geojsonLayer.resetStyle(e.target);
            });
        }
    }).addTo(map);
    renderLegend();
    if (selectedMunicipio) {
        geojsonLayer.eachLayer(function(layer) {
            const layerNome = layer.feature.properties.NM_MUN || layer.feature.properties.nome || layer.feature.properties.name || '';
            if (layerNome === selectedMunicipio) {
                map.fitBounds(layer.getBounds(), { padding: [50, 50] });
            }
        });
    }
}

function renderLegend() {
    const legend = document.getElementById('legend');
    if (!legend) return;
    legend.innerHTML = '<strong>Focos/Casos</strong><br>';
    colorScale.forEach(item => {
        legend.innerHTML += '<div class="legend-item"><div class="legend-color" style="background:' + item.color + '"></div><span>' + item.label + '</span></div>';
    });
}

function init() { initMap(); loadGeoJSON(); loadCSV(); }
document.addEventListener('DOMContentLoaded', init);
