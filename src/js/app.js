let pagina = 1;

document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
})

function iniciarApp() {    
    mostrarServicios();

    // Resalta el Div Actual segundo el tab al que se presiona

    // Oculta o muestra una seccion segun el tab al que se presiona
    cambiarSeccion();
}

function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();

            pagina = parseInt(e.target.dataset.paso);

            const seccion = document.querySelector(`#paso-${pagina}`);
            seccion.classList.add('mostrar-seccion');
        })
    })
}

async function mostrarServicios() {
    try {
        const resultado = await fetch('./servicios.json');
        const db = await resultado.json();

        const {servicios} = db;

        // Generar el HTML
        servicios.forEach( servicio => {
            const { id, nombre, precio } = servicio;

            // DOM Scripting
            // Generar nombre de servicio
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');

            // Generar precio del servicio
            const precioServicio = document.createElement('P');
            precioServicio.textContent = `$ ${precio}`;
            precioServicio.classList.add('precio-servicio');

            // Generar div contenedor de servicio
            const servicioDiv = document.createElement('DIV');
            servicioDiv.classList.add('servicio');
            servicioDiv.dataset.idServicio = id;

            // Selecciona un servicio para la cita
            servicioDiv.onclick = seleccionarServicio;

            // Inyectas Precio y nombre al div de servicio
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);

            // Inyectar en el HTML
            document.querySelector('#servicios').appendChild(servicioDiv);
        })
    } catch (error) {
        console.log(error);
    }
}

function seleccionarServicio(e) {
    let elemento;

    // Forzar que el elemento al cual le damos click sea el DIV
    if(e.target.tagName === 'P') {
        elemento = e.target.parentElement;        
    } else {
        elemento = e.target;
    }
    if(elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado');
    } else {
        elemento.classList.add('seleccionado');
    }
    
}