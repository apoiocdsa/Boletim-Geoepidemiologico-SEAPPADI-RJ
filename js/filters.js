function applyFilters() {
    const nucleo = document.getElementById('filterNucleo').value;
    const municipio = document.getElementById('filterMunicipio').value;
    const agravo = document.getElementById('filterAgravo').value;
    const ano = document.getElementById('filterAno').value;
    const mes = document.getElementById('filterMes').value;

    let filtered = csvData.filter(row => {
        let match = true;
        if (nucleo && row.nucleo !== nucleo) match = false;
        if (municipio && row.municipio !== municipio) match = false;
        if (agravo !== 'todos' && row.agravo !== agravo) match = false;
        if (ano !== 'todos' && String(row.ano) !== String(ano)) match = false;
        if (ano !== 'todos' && mes !== '0' && String(row.mes) !== String(mes)) match = false;
        return match;
    });

    const aggregated = {};
    filtered.forEach(row => {
        const cod = String(row.cod_ibge);
        if (!aggregated[cod]) aggregated[cod] = 0;
        aggregated[cod] += (row.quantidade || 1);
    });

    renderMap(aggregated, municipio, nucleo);
    updateDashboard(filtered, aggregated);
}

function resetFilters() {
    document.getElementById('filterNucleo').value = '';
    document.getElementById('filterMunicipio').value = '';
    document.getElementById('filterAgravo').value = 'todos';
    document.getElementById('filterAno').value = 'todos';
    document.getElementById('filterMes').value = '0';
    applyFilters();
}
