function updateDashboard(filtered, aggregated) {
    const totalFocos = filtered.reduce((s, r) => s + (r.quantidade || 1), 0);
    const municipios = Object.keys(aggregated).filter(k => aggregated[k] > 0).length;
    const agravos = [...new Set(filtered.map(r => r.agravo))].length;

    document.getElementById('totalFocos').textContent = totalFocos;
    document.getElementById('totalMunicipios').textContent = municipios;
    document.getElementById('totalAgravos').textContent = agravos;

    updateChartAgravo(filtered);
    updateChartTemporal(filtered);
    updateTopMunicipios(aggregated);
}

function updateChartAgravo(filtered) {
    const counts = {};
    filtered.forEach(r => { if (!counts[r.agravo]) counts[r.agravo] = 0; counts[r.agravo] += (r.quantidade || 1); });
    const labels = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    const data = labels.map(l => counts[l]);
    if (chartAgravo) chartAgravo.destroy();
    chartAgravo = new Chart(document.getElementById('chartAgravo'), {
        type: 'bar',
        data: { labels: labels, datasets: [{ label: 'Focos/Casos', data: data, backgroundColor: '#1a3a5c' }] },
        options: { responsive: true, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } }
    });
}

function updateChartTemporal(filtered) {
    const counts = {};
    filtered.forEach(r => {
        const key = `${r.ano}-${String(r.mes).padStart(2, '0')}`;
        if (!counts[key]) counts[key] = 0;
        counts[key] += (r.quantidade || 1);
    });
    const labels = Object.keys(counts).sort();
    const data = labels.map(l => counts[l]);
    if (chartTemporal) chartTemporal.destroy();
    chartTemporal = new Chart(document.getElementById('chartTemporal'), {
        type: 'line',
        data: { labels: labels, datasets: [{ label: 'Focos/Casos', data: data, borderColor: '#dc3545', backgroundColor: 'rgba(220,53,69,.1)', fill: true, tension: 0.3 }] },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
}

function updateTopMunicipios(aggregated) {
    const codToName = {};
    csvData.forEach(r => { codToName[String(r.cod_ibge)] = r.municipio; });
    const entries = Object.entries(aggregated).filter(([c, n]) => n > 0).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const tbody = document.querySelector('#topMunicipios tbody');
    tbody.innerHTML = '';
    entries.forEach(([cod, count], i) => {
        const name = codToName[cod] || `IBGE: ${cod}`;
        tbody.innerHTML += `<tr><td>${i+1}</td><td>${name}</td><td>${count}</td></tr>`;
    });
}
