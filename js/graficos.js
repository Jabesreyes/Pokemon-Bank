// codigo de la libreria Chartjs
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const transacciones = ['Depositos', 'Retiros', 'Consulta de saldos', 'Pagos']
const datosDeTransacciones = {
    depositos: [3, 10, 5, 15, 10, 20, 5, 25, 12, 20, 8, 30],
    retiros: [3, 7, 11, 15, 19, 23, 27, 29, 17, 13, 9, 5],
    consultas: [23, 2, 7, 11, 30, 4, 7, 10, 15, 22, 18, 12],
    pagos: [20, 6, 30, 14, 8, 2, 12, 18, 10, 16, 4, 22]
}

const data = {
    labels: meses,
    datasets: [{
        label: transacciones[0],
        data: datosDeTransacciones['depositos'],
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
const btnConsultas = document.getElementById('btnConsulta')
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
    data.datasets[0].label = transacciones[0];
    data.datasets[0].data = datosDeTransacciones['depositos'];
    myChart.update();
    modalTransacciones.style.display = 'none'
})

btnRetiros.addEventListener('click', (e) => {
    e.preventDefault()
    data.datasets[0].label = transacciones[1];
    data.datasets[0].data = datosDeTransacciones['retiros'];
    myChart.update();
    modalTransacciones.style.display = 'none'
})

btnConsultas.addEventListener('click', (e) => {
    e.preventDefault()
    data.datasets[0].label = transacciones[2];
    data.datasets[0].data = datosDeTransacciones['consultas'];
    myChart.update();
    modalTransacciones.style.display = 'none'
})

btnPagos.addEventListener('click', (e) => {
    e.preventDefault()
    data.datasets[0].label = transacciones[3];
    data.datasets[0].data = datosDeTransacciones['pagos'];
    myChart.update();
    modalTransacciones.style.display = 'none'
})
