/*const firebaseConfig = {
    apiKey: "AIzaSyD5WQba1pAYZz5Y4bPD5tu-63NvoQ87qtc",
    authDomain: "pensum-376eb.firebaseapp.com",
    databaseURL: "https://pensum-376eb-default-rtdb.firebaseio.com",
    projectId: "pensum-376eb",
    storageBucket: "pensum-376eb.appspot.com",
    messagingSenderId: "341853128640",
    appId: "1:341853128640:web:866a23a6275e2370deaa25",
    measurementId: "G-81DLD5QYCX"
};
firebase.initializeApp(firebaseConfig);

var dataBase = firebase.database().ref();*/

var registrar, ingresar, registrarse;
var USER, PASSWORD;

function agregarUsuario(usuario, password) {
    var verifiA = false;
    var new_usuario = {
        'email' : usuario,
        'password' : password
    }
    for(let o of LIST_USERS) {
        if(o.email == usuario) {
            verifiA = true;
        }
    }
    if(!verifiA) {
        dataBase.child('z-usuarios').child(usuario).update(new_usuario);
        crearPensum(usuario);
        alert("Registro Correcto");
        location.reload();
    }else{
        alert("El usuario ya existe");
    }
}

function validarCampos(text) {
    let validar = true;
    if(text != "") {
        for(let i = 0; i < text.length && validar; i++)  {
            if(text.charAt(i) == ' ') {
                validar = false;
            }
        }
    }else{
        validar = false;
    }

    return validar;
}

function addUser() {
    var VP, VU;

    VP = validarCampos(PASSWORD.value);
    VU = validarCampos(USER.value.trim());

    if(VP && VU) {
        if(PASSWORD.value.length < 5) {
            alert("Contraseña muy corta");
            PASSWORD.value = "";
        }else{
            agregarUsuario(USER.value.trim(), PASSWORD.value);
        }
    }else{
        if(!VU) {
            USER.style.border = "1px solid red";
            document.getElementById("spanUser").innerHTML = "Remove the spaces";
            document.getElementById("spanUser").style.display = "block";
        }else if(!VP) {
            PASSWORD.style.border = "1px solid red";
            document.getElementById("spanPassword").innerHTML = "Remove the spaces";
            document.getElementById("spanPassword").style.display = "block";
        }else{
            USER.style.border = "1px solid red";
            PASSWORD.style.border = "1px solid red";
            USER.value = "";
            PASSWORD.value = "";
            document.getElementById("spanUser").style.display = "block";
            document.getElementById("spanPassword").style.display = "block";
        }
    }
}

function acceder(usuario, password){
    var verifiB= false;
    var contraInco = false;
    var pos = 0;
    while(pos < LIST_USERS.length && !verifiB){
        if(LIST_USERS[pos].email == usuario) {
            if(LIST_USERS[pos].password === password) {
                verifiB = true;
            }else{
                contraInco = true;
                PASSWORD.value = "";
                alert("Contraseña incorrecta");
            }
        }
        pos++;
    }

    if(verifiB) {
        USER_CURRENT = usuario;
        localStorage.setItem('ruta', usuario);
        window.location.href = "../pensum.html";
    }else{
        if(!contraInco){
            USER.style.border = "none";
            PASSWORD.style.border = "none";
            document.getElementById("spanUser").style.display = "none";
            document.getElementById("spanPassword").style.display = "none";
            USER.value = "";
            PASSWORD.value = "";
            alert("Usuario incorrecto");
        }
    }
}

function login() {
    if(USER.value != "" && PASSWORD.value != "") {
        acceder(USER.value, PASSWORD.value);
    }else{
        USER.style.border = "1px solid red";
        PASSWORD.style.border = "1px solid red";
        document.getElementById("spanUser").style.display = "block";
        document.getElementById("spanPassword").style.display = "block";
    }
}

function registrarseF() {
    USER.style.border = "none";
    PASSWORD.style.border = "none";
    document.getElementById("spanUser").style.display = "none";
    document.getElementById("spanPassword").style.display = "none";
    USER.value = "";
    PASSWORD.value = "";
    ingresar.style.display= "none";
    registrarse.style.display = "none";
    registrar.style.display = "block";
}

function init() {
    localStorage.setItem('timeInac', 0);
    USER = document.getElementById("usuario");
    PASSWORD = document.getElementById("password");

    registrarse = document.getElementById("botonRegistrarse");
    registrarse.addEventListener("click", registrarseF);

    ingresar = document.getElementById("botonIngresar");
    ingresar.addEventListener("click", login);

    registrar = document.getElementById("botonRegistrar");
    registrar.addEventListener("click", addUser);
}
window.addEventListener("load", init, false);