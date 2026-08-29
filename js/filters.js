function applyFilters() {
    const agravo = document.getElementById('filterAgravo').value;
    const ano = document.getElementById('filterAno').value;
    const mes = document.getElementById('filterMes').value;
    const municipio = document.getElementById('filterMunicipio').value;

    let filtered = csvData.filter(row => {
        let match = true;
        if (agravo !== 'todos' && row.agravo !== agravo) match = false;
        if (ano !== 'todos' && String(row.ano) !== String(ano)) match = false;
        if (ano !== 'todos' && mes !== '0' && String(row.mes) !== String(mes)) match = false;
        if (municipio && row.municipio !== municipio) match = false;
        return match;
    });

    const aggregated = {};
    filtered.forEach(row => {
        const cod = String(row.cod_ibge);
        if (!aggregated[cod]) aggregated[cod] = 0;
        aggregated[cod] += (row.quantidade || 1);
    });

    renderMap(aggregated, municipio);
    updateDashboard(filtered, aggregated);
}

function resetFilters() {
    document.getElementById('filterAgravo').value = 'todos';
    document.getElementById('filterAno').value = 'todos';
    document.getElementById('filterMes').value = '0';
    document.getElementById('filterMunicipio').value = '';
    applyFilters();
}
