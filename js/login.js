document.addEventListener("DOMContentLoaded", function () {
    checkLocalStorage();
});

// Datos del usuario
var userData = {
    nombre: "Ash Ketchum",
    PIN: "1234",
    cuenta: "0987654321",
    saldoInicial: 500.00
};


// Funcion para realizar el inicio de sesion
function login() {
    var username = document.getElementById("exampleInputUser").value;
    var password = document.getElementById("inputPassword2").value;

    if (password === userData.PIN && username === userData.nombre) {
        showUserData(userData.nombre, userData.cuenta);
        
        var rememberUser = document.getElementById("exampleCheck1").checked;
        saveUserData(username, rememberUser);

        window.location.href = "../pages/acciones.html";
    } else {
        swal({
            icon: "error",
            title: "Error",
            text: "PIN o contraseña incorrectos. Por favor, inténtalo de nuevo."
        });
    }
}

function showUserData(nombre, cuenta) {
    swal({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Nombre: " + nombre + "\nCuenta: " + cuenta,
    });
}

// Funcion para realizar las validaciones del formato de la contraseña
function validatePassword(password) {
    var constraints = {
        password: {
            format: {
                pattern: /^\d{4}$/,
                message: "La contraseña debe ser un PIN de cuatro digitos."
            }
        }
    };

    return validate({ password }, constraints);
}


// Funcion para verificar y cargar datos desde LocalStorage al cargar la página
function checkLocalStorage() {
    var storedUsername = localStorage.getItem("username");
    var rememberUser = localStorage.getItem("rememberUser");

    if (storedUsername) {
        document.getElementById("exampleInputUser").value = storedUsername;

        
        if (rememberUser === "true") {
            document.getElementById("exampleCheck1").checked = true;
        }
    }
}

// Función para mostrar una alerta interactiva con los errores de validación
function showValidationAlert(errors) {
    var errorMessage = Object.values(errors).map(function (error) {
        return error.join("\n");
    }).join("\n");

    swal({
        icon: "error",
        title: "Error de validacion",
        text: errorMessage
    });
}

// Funcion para guardar los datos
function saveUserData(username, rememberUser) {
    localStorage.setItem("username", username);
    localStorage.setItem("rememberUser", rememberUser);
}