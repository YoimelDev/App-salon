document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
})

function iniciarApp() {
    console.log('Iniciando app');
    mostrarServicios();
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