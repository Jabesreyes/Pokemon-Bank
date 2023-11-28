document.addEventListener("DOMContentLoaded", function () {
    mostrarTransacciones();

    // Agregar eventos de escucha a los elementos de filtro
    document.getElementById("typeFilter").addEventListener("change", function () {
        filtrarTransacciones();
    });

    document.getElementById("amountFilter").addEventListener("input", function () {
        filtrarTransacciones();
    });
});

function mostrarTransacciones() {
    // Obtener las transacciones del almacenamiento local
    let listadoTransaccion = localStorage.getItem("transacciones");

    if (listadoTransaccion) {
        let transacciones = JSON.parse(listadoTransaccion);

        // Obtener la tabla en la que se mostrarán las transacciones
        let tabla = document.querySelector("table tbody");

        // Limpiar la tabla antes de agregar las transacciones
        tabla.innerHTML = "";

        // Recorrer las transacciones y agregarlas a la tabla
        for (let i = 1; i <= transacciones.contador; i++) {
            let transaccion = transacciones["transaccion" + i];
            agregarFilaTabla(tabla, transaccion);
        }

        // Mostrar detalles de la primera transacción al cargar la página
        if (transacciones.contador > 0) {
            actualizarDetallesTransaccion(transacciones["transaccion1"]);
        }
    }
}


function agregarFilaTabla(tabla, transaccion) {
    // Crear una nueva fila
    let fila = tabla.insertRow();

    // Crear celdas para la fila
    let fecha = fila.insertCell(0);
    let tipo = fila.insertCell(1);
    let descripcion = fila.insertCell(2);
    let monto = fila.insertCell(3);

    // Llenar las celdas con los datos de la transacción
    fecha.innerText = transaccion.fecha;
    tipo.innerText = transaccion.tipo;
    descripcion.innerText = transaccion.descripcion;
    monto.innerText = "$" + parseFloat(transaccion.monto).toFixed(2);

    // Agregar evento de clic a la fila para actualizar los detalles de transacción
    fila.addEventListener("click", function () {
        actualizarDetallesTransaccion(transaccion);
    });
}


function filtrarTransacciones() {
    // Obtener el tipo de transacción seleccionado en el filtro
    let tipoFiltro = document.getElementById("typeFilter").value; 
    
    // Obtener el monto ingresado en el filtro de monto
    let montoFiltro = parseFloat(document.getElementById("amountFilter").value) || 0;


    // Obtener las transacciones del almacenamiento local
    let listadoTransaccion = localStorage.getItem("transacciones");

    if (listadoTransaccion) {
        let transacciones = JSON.parse(listadoTransaccion);

        // Obtener la tabla en la que se mostrarán las transacciones
        let tabla = document.querySelector("table tbody");

        // Limpiar la tabla antes de agregar las transacciones filtradas
        tabla.innerHTML = "";

        // Recorrer las transacciones y agregar solo las que coincidan con los filtros
        for (let i = 1; i <= transacciones.contador; i++) {
            let transaccion = transacciones["transaccion" + i];

            // Ajustar el valor del tipo de transacción para la comparación
            let tipoTransaccion = transaccion.tipo;

            // Aplicar filtro por tipo (comparación insensible a mayúsculas y minúsculas)
            if (tipoFiltro === "todos" || tipoFiltro === tipoTransaccion) {
                // Aplicar filtro por monto
                if (transaccion.monto >= montoFiltro) {
                    agregarFilaTabla(tabla, transaccion);
                }
            }
        }
    }
}

function actualizarDetallesTransaccion(transaccion) {
    // Actualizar los elementos en la sección de detalles de transacción
    document.getElementById("transactionDate").innerText = transaccion.fecha;
    document.getElementById("transactionType").innerText = transaccion.tipo;
    document.getElementById("transactionDescription").innerText = transaccion.descripcion;
    document.getElementById("transactionAmount").innerText = "$" + parseFloat(transaccion.monto).toFixed(2);
}
