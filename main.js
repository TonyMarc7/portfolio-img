const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.querySelector('#grid').classList.add('imagenes-cargadas');


    // FILTRADO DE IMAGENES //
    const enlaces = document.querySelectorAll('.categorias a')
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria='${categoria}']`);
        });
    });

    // BARRA DE BUSQUEDA //
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter((item) => item.getElement().dataset.etiqueta.includes(busqueda));
     });
         // LLAMAR IMAGENES AL FRENTE //
    const resaltar = document.getElementById('resaltar');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
        
            resaltar.classList.add('activo');
            document.querySelector('#resaltar img').src = ruta;
            document.querySelector('#resaltar .descripcion').innerHTML = descripcion;
    
        });
    });
        // CERRAR CON EL BOTON //
    document.querySelector('#btn-cerrar').addEventListener('click', () => {
        resaltar.classList.remove('activo');
    });
        // CERRAR CON CLICK EN PANTALLA //
    resaltar.addEventListener('click', (evento) => {
        evento.target.id === 'resaltar' ? resaltar.classList.remove('activo') : '';
    });
});

       