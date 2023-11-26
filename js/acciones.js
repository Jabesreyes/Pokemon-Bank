var formularios = [
    "<div class=' mb-4' id='collapseExample'><div class='card card-body'>" +
    "<label for='exampleFormControlInput1' class='form-label'>Cuenta Origen :</label>" +
    "<input type='cuenta' class='form-control' id='exampleFormControlInput1'>" +

    " <label for='exampleFormControlInput1' class='form-label'>Cuenta Destino :</label>" +
    "<input type='cuenta' class='form-control' id='exampleFormControlInput1' value='" + (JSON.parse(localStorage.getItem("cliente"))? JSON.parse(localStorage.getItem("cliente")).cuenta: "") + "' disabled='true'>" +

    "<label for='exampleFormControlInput1' class='form-label mt-3'>Monto :</label>" +
    " <div class='input-group  mb-3'>" +
    " <span class='input-group-text'>$</span>" +
    "<input type='text' id='abono' class='form-control' aria-label='Amount (to the nearest dollar)'>" +
    "" +
    " </div>" +

    " <label for='exampleFormControlInput1' class='form-label'>Detalles: </label>" +
    " <input type='cuenta' class='form-control' id='exampleFormControlInput1' > " +
    " <button type='button' class='btn btn-danger mt-3' id='btn1'>Continuar </button></div></div>",
    `<div class=' mb-4' id='collapseExample2'>
       <div class='card card-body'>
             <label for='numeroCuenta' class='form-label'>Cuenta Origen :</label>
             <input type='cuenta' 
             value='${(JSON.parse(localStorage.getItem("cliente"))? JSON.parse(localStorage.getItem("cliente")).cuenta: "")}'
             class='form-control' id='numeroCuenta' disabled='true'>
       
             <label for='montoRetirar' class='form-label mt-3'>Monto a retirar :</label>
             <div class='input-group  mb-3'>
                 <span class='input-group-text'>$</span>
                 <input type='text' class='form-control' aria-label='Amount (to the nearest dollar)' id='montoRetirar'>
        
             </div>
       
             <button type='button' id='btnRetirar' class='btn btn-danger mt-3'>
               Continuar
             </button>
       </div>
       </div>`,
    ` <div class=' mb-4' id='collapseExample3'>
       <div class='card card-body'>
         <select class='form-select'
         id='nombreServicio' aria-label='Default select example'>
             <option value='' selected>Servicio a Pagar: </option>
             <option value='Energía Eléctrica'>Energía Eléctrica</option>
             <option value='Internet'>Internet</option>
             <option value='Telefonia'>Telefonia</option>
             <option value='Agua Potable'>Agua Potable</option>
         </select>
         
         <label for='exampleFormControlInput1' class='form-label mt-3'>Monto :</label>
             <div class='input-group  mb-3'>
                 <span class='input-group-text'>$</span>
                 <input type='text'
                 id='montoPago' class='form-control' aria-label='Amount (to the nearest dollar)'>
                
             </div>
         
         <button type='button' id='pagarServicio' class='btn btn-danger mt-3'>
         Continuar
         </button>
       </div>
       </div>`
];


var datosUsuario = {
    nombre: "",
    PIN: "",
    cuenta: "",
    saldoInicial: 0
};


document.addEventListener("DOMContentLoaded", function () {
    checkLocalStorage();
})


window.onload = function () {
    //aparecer formulario para depositos 
    document.getElementById("botonDepositar").addEventListener("click", function () {
        document.getElementById("formularios").innerHTML = formularios[0];

        document.getElementById("btn1").addEventListener("click", function(){
            let cuentaOrigen = document.getElementById("exampleFormControlInput1").value; 
            console.log(cuentaOrigen); 
            let montoAbono = document.getElementById("abono").value; 
            let descripcion = document.getElementById("exampleFormControlInput1").value; 

            let procesoCorrecto = true; 
            //validamos la cuenta de origen que solo permita número o 
            //que no este vacio 
            if(cuentaOrigen == "" || !cuentaOrigen.match(/^\d+$/)){
               swal( "Error" ,  "Por favor validar la cuenta de origen" ,  "error")
               procesoCorrecto = false; 
            } 
            //validamos el monto que no este vacio o sea menor o igual a 0
            if(montoAbono == "" || parseInt(montoAbono)<0 || 
               !montoAbono.match(/^\d+(\.\d+)?$/)){
                swal( "Error" ,  "El monto a deposita debe ser mayor a 0" ,  "error")
                procesoCorrecto = false; 
            }
            if(descripcion == ""){
                swal( "Error" ,  "La descripción es obligatoria" ,  "error")
                procesoCorrecto = false; 
            }
            if(procesoCorrecto){
                datosUsuario.saldoInicial += parseFloat(montoAbono); 
                localStorage.setItem("cliente", JSON.stringify(datosUsuario));
                document.getElementById("monto").innerText = "$" + parseFloat(datosUsuario.saldoInicial).toFixed(2);
                document.getElementById("formularios").innerHTML = ""
                guardarTransaccion("Deposito", montoAbono, descripcion)
            }

        })
    })
    //aparecer formulario para depositos 
    document.getElementById("botonRetirar").addEventListener("click", function () {

        document.getElementById("formularios").innerHTML = formularios[1];
        document.getElementById("btnRetirar").addEventListener("click", function(){
            let montoRetirar = document.getElementById("montoRetirar").value; 
            let procesoCorrecto = true; 
            if(montoRetirar == "" || parseInt(montoRetirar)<0 || 
               !montoRetirar.match(/^\d+(\.\d+)?$/)){
                swal( "Error" ,  "El monto a retirar debe ser mayor a $0" ,  "error")
                procesoCorrecto = false; 
            }
            if(montoRetirar > datosUsuario.saldoInicial){
                swal( "Error" ,  "El monto a retirar debe ser menor a $" + parseFloat(datosUsuario.saldoInicial).toFixed(2) ,  "error")
                procesoCorrecto = false; 
            }
            if(procesoCorrecto){
                datosUsuario.saldoInicial -= parseFloat(montoRetirar); 
                localStorage.setItem("cliente", JSON.stringify(datosUsuario));
                document.getElementById("monto").innerText = "$" + parseFloat(datosUsuario.saldoInicial).toFixed(2);
                document.getElementById("formularios").innerHTML = ""
                guardarTransaccion("Retiro", montoRetirar, "Retiro de efectivo " + new Date().toDateString())
            }
        })

    })

    document.getElementById("botonPagar").addEventListener("click", function () {
        document.getElementById("formularios").innerHTML = formularios[2];
        document.getElementById("pagarServicio").addEventListener("click", function(){
            let montoPagar = document.getElementById("montoPago").value; 
            let procesoCorrecto = true; 
            let servicio = document.getElementById("nombreServicio").value; 
            console.log(servicio)
            if(servicio==""){
                swal( "Error" ,  "Por favor seleccionar un servicio." ,  "error")
                procesoCorrecto = false; 
            }
            if(montoPagar == "" || parseInt(montoPagar)<0 || 
               !montoPagar.match(/^\d+(\.\d+)?$/)){
                swal( "Error" ,  "El monto a pagar debe ser mayor a $0" ,  "error")
                procesoCorrecto = false; 
            }
            if(montoPagar > datosUsuario.saldoInicial){
                swal( "Error" ,  "No cuenta con el saldo suficiente.\n Saldo actual:  $" + parseFloat(datosUsuario.saldoInicial).toFixed(2) + "\nSaldo requerido: $"+ parseFloat(montoPagar).toFixed(2) ,  "error")
                procesoCorrecto = false; 
            }
            if(procesoCorrecto){
                datosUsuario.saldoInicial -= parseFloat(montoPagar); 
                localStorage.setItem("cliente", JSON.stringify(datosUsuario));
                document.getElementById("monto").innerText = "$" + parseFloat(datosUsuario.saldoInicial).toFixed(2);
                document.getElementById("formularios").innerHTML = ""
                guardarTransaccion("Pago servicio", montoPagar, 
                "Pago de servicio:  " +servicio); 
            }
        })
    })
}




function guardarTransaccion(tipo, monto, descripcion){
    let listadoTransaccion = localStorage.getItem("transacciones"); 
    if(listadoTransaccion){
        let objeto = JSON.parse(listadoTransaccion); 
        let numeroTransaccion = objeto.contador; 
        numeroTransaccion++; 
        objeto["transaccion"+numeroTransaccion] = {
            "tipo": tipo, 
            "monto": monto, 
            "descripcion": descripcion, 
            "fecha" :  new Date() 
        }; 
        objeto.contador++; 
        console.log(objeto); 
        localStorage.setItem("transacciones", JSON.stringify(objeto) ); 
    }else{
        let primeraTransaccion = {
           "transaccion1" : {
                "tipo": tipo, 
                "monto": monto, 
                "descripcion": descripcion, 
                "fecha" :  new Date() 
            }, 
            "contador" : 1
        }
        localStorage.setItem("transacciones", JSON.stringify(primeraTransaccion) ); 
    }
}



// Funcion para verificar y cargar datos desde LocalStorage al cargar la página
function checkLocalStorage() {
    var storedUsername = localStorage.getItem("username");
    var rememberUser = localStorage.getItem("rememberUser");
    datosUsuario = JSON.parse(localStorage.getItem("cliente"));
    if (storedUsername) {
        document.getElementById("username").innerText = storedUsername;
        document.getElementById("codigoCuenta").innerText = datosUsuario.cuenta;


        document.getElementById("monto").innerText = "$" + parseFloat(datosUsuario.saldoInicial).toFixed(2);
    } else {
        location.href = "login.html";
    }
}
