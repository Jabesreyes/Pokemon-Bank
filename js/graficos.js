// codigo de la libreria Chartjs

const transacciones = ['Depositos', 'Retiros', 'Pagos']

const transaccionesObjeto = JSON.parse(localStorage.getItem('transacciones'))

const tipoRetiro = Object.values(transaccionesObjeto).filter(transaccion => transaccion && transaccion.tipo === 'Retiro').map(transaccion => transaccion.monto);
const tipoDeposito = Object.values(transaccionesObjeto).filter(transaccion => transaccion && transaccion.tipo === 'Deposito').map(transaccion => transaccion.monto);
const tipoPago = Object.values(transaccionesObjeto).filter(transaccion => transaccion && transaccion.tipo === 'Pago servicio').map(transaccion => transaccion.monto);


const clavesRetiros = Object.values(transaccionesObjeto).filter(transaccion => transaccion && transaccion.tipo === 'Retiro').map(transaccion => transaccion.descripcion);
const clavesDeposito = Object.values(transaccionesObjeto).filter(transaccion => transaccion && transaccion.tipo === 'Deposito').map(transaccion => transaccion.descripcion);
const clavesPagos = Object.values(transaccionesObjeto).filter(transaccion => transaccion && transaccion.tipo === 'Pago servicio').map(transaccion => transaccion.descripcion);

const datosDeTransacciones = {
    depositos: tipoDeposito,
    retiros: tipoRetiro,
    pagos: tipoPago
}

const descripciones = {
    depositos: clavesDeposito,
    retiros: clavesRetiros,
    pagos: clavesPagos
}
 let data = {
    labels: descripciones["depositos"],
    datasets: [{
        label: transacciones[0],
        data: datosDeTransacciones["depositos"],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
};
const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);

const btnCerrarModal = document.getElementById('btnCerrarModal')
const modalTransacciones = document.getElementById('modalTransacciones')

const btnCambiarTransaccion = document.getElementById('btnCambiarTransaccion')

//botones del modal
const btnDepositos = document.getElementById('btnDeposito')
const btnRetiros = document.getElementById('btnRetiro')
const btnPagos = document.getElementById('btnPago')

// Evento para el boton cerrar modal
btnCerrarModal.addEventListener('click', (e) => {
    e.preventDefault()
    modalTransacciones.style.display = 'none'
})

btnCambiarTransaccion.addEventListener('click', (e) => {
    e.preventDefault()
    modalTransacciones.style.display = 'flex'
})


// cambio de datos en la estadistica 
btnDepositos.addEventListener('click', (e) => {
    e.preventDefault()
    data.labels = descripciones["depositos"]
    data.datasets[0].label = transacciones[0];
    data.datasets[0].data = datosDeTransacciones["depositos"];
    myChart.update();
    modalTransacciones.style.display = 'none'
})

btnRetiros.addEventListener('click', (e) => {
    e.preventDefault()
    data.labels = descripciones["retiros"]
    data.datasets[0].label = transacciones[1]
    data.datasets[0].data = datosDeTransacciones["retiros"];
    myChart.update();
    modalTransacciones.style.display = 'none'
})


btnPagos.addEventListener('click', (e) => {
    e.preventDefault()
    data.labels = descripciones["pagos"]
    data.datasets[0].label = transacciones[2];
    data.datasets[0].data = datosDeTransacciones["pagos"];
    myChart.update();
    modalTransacciones.style.display = 'none'
})
