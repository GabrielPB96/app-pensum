var MESES = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November', 'December'];

var registrar, ingresar, registrarse;
var USER, PASSWORD, CARRERA, selectCarrera;

function agregarUsuario(usuario, password) {
    var verifiA = false;
    
    for(let o of LIST_USERS) {
        if(o.user == usuario) {
            verifiA = true;
        }
    }
    if(!verifiA) {
        /* var date = new Date();

        timeCurrent = MESES[date.getMonth()] +" "+ date.getDate() +" "+ date.getFullYear();
        
        var hrs;
        if(date.getHours() < 10){
            hrs = "0" + date.getHours();
        }else{
            hrs = date.getHours();
        }

        var minutes;
        if(date.getMinutes() < 10){
            minutes = "0" + date.getMinutes();
        }else{
            minutes = date.getMinutes();
        }

        var seconds;
        if(date.getSeconds() < 10){
            seconds = "0" + date.getSeconds();
        }else{
            seconds = date.getSeconds();
        }

        timeCurrent += " "+ hrs+":"+minutes+":"+seconds + (" GMT-0400"); 
 */
        var new_salt = salt(10);
        var new_usuario = {
            'user' : usuario,
            'salt' : new_salt,
            'hash' : hash(password + new_salt),
            'signUpDate' : getTimeCurrent(),
            'carrera' : selectCarrera
        }

        dataBase.child('z-usuarios').child(selectCarrera).child(usuario).update(new_usuario);
        /****************************************** */
        crearMalla(usuario, selectCarrera);
        alert("Registro Correcto");
        location.reload();
    }else{
        alert("El usuario ya existe");
    }
}
function getTimeCurrent() {
    var date = new Date();

    let timeCurrent = MESES[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();

    var hrs;
    if (date.getHours() < 10) {
        hrs = "0" + date.getHours();
    } else {
        hrs = date.getHours();
    }

    var minutes;
    if (date.getMinutes() < 10) {
        minutes = "0" + date.getMinutes();
    } else {
        minutes = date.getMinutes();
    }

    var seconds;
    if (date.getSeconds() < 10) {
        seconds = "0" + date.getSeconds();
    } else {
        seconds = date.getSeconds();
    }

    timeCurrent += " " + hrs + ":" + minutes + ":" + seconds + (" GMT-0400");
    return timeCurrent;
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

    if(PASSWORD.value != "" && USER.value != "" && selectCarrera != ""){
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
                USER.style.margin = "0px";
                document.getElementById("spanUser").innerHTML = "Remove the spaces";
                document.getElementById("spanUser").style.display = "block";
            }
            if(!VP) {
                document.getElementById('passwordEye').style.border = "1px solid red";
                document.getElementById("spanPassword").innerHTML = "Remove the spaces";
                document.getElementById("spanPassword").style.display = "block";
            }
        }
    }else {
        controlCamposVacios();
    }
}

function acceder(usuario, password){
    var verifiB= false;
    var contraInco = false;
    var currentUser;
    var usersCandidatos = LIST_USERS.get(selectCarrera);
    for(let u of usersCandidatos) {
        if(u.user == usuario) {
            if(hash(password + u.salt) == u.hash) {
                verifiB = true;
                currentUser = u;
            }else{
                contraInco = true;
                PASSWORD.value = "";
                alert("Contraseña incorrecta");
            }
        }
    }

    if(verifiB) {
        document.getElementById('defaultCarrera').selected = true;
        USER_CURRENT = selectCarrera +'/'+ usuario;
        localStorage.setItem('ruta', selectCarrera +'/'+ usuario);
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('carrera', selectCarrera);
        dataBase.child('z-usuarios').child(selectCarrera).child(usuario).update({
            'lastAccess' : getTimeCurrent()
        });
        
        if(selectCarrera == 'informatica') {
            localStorage.setItem('carrera', 'informatica');
            try{ 
                window.location.href = "../pensumInformatica.html";
            }catch(error) {
                window.location.href = "../404.html";
            }
        }else if(selectCarrera == 'sistemas') {
            localStorage.setItem('carrera', 'sistemas'); 
            window.location.href = "../pensumSistemas.html";
        }
    }else{
        if(!contraInco){
            USER.style.border = "none";
            USER.style.marginBottom = "15px";
            document.getElementById('carreras').style.marginBottom = "10px"
            document.getElementById('carreras').style.border = "none";
            document.getElementById('passwordEye').style.border = "none";
            document.getElementById("spanUser").style.display = "none";
            document.getElementById("spanPassword").style.display = "none";
            document.getElementById('spanSelect').style.display = 'none';
            USER.value = "";
            PASSWORD.value = "";
            document.getElementById('defaultCarrera').selected = true;
            selectCarrera = '';
            alert("Usuario incorrecto");
        }
    }
}

function controlCamposVacios() {
    if(USER.value == "") {
        USER.style.border = "1px solid red";
        USER.style.margin = "0px";
        document.getElementById("spanUser").style.display = "block";
    }
    if(PASSWORD.value == "") {
        document.getElementById('passwordEye').style.border = "1px solid red";
        document.getElementById("spanPassword").style.display = "block";
    }

    if(selectCarrera == "") {
        document.getElementById('carreras').style.border = "1px solid red";
        document.getElementById('carreras').style.marginBottom = "0px"
        document.getElementById('spanSelect').style.display = 'block';
    }
}

function login() {
    if(USER.value != "" && PASSWORD.value != "" && selectCarrera != "") {
        acceder(USER.value, PASSWORD.value);
    }else{
        controlCamposVacios();
    }
}

function registrarseF() {
    /*
        cambiar, urgente
    */
    document.getElementById('defaultCarrera').selected = true;
    document.getElementById('carreras').style.border = 'none';
    document.getElementById('carreras').style.marginBottom = "10px"
    document.getElementById('spanSelect').style.display = 'none';
    USER.style.border = "none";
    USER.style.marginBottom = "15px";
    document.getElementById('passwordEye').style.border = "none";
    document.getElementById("spanUser").style.display = "none";
    document.getElementById("spanPassword").style.display = "none";
    USER.value = "";
    PASSWORD.value = "";
    ingresar.style.display= "none";
    registrar.style.display = "block";
}

function pressKey() {
    let tecla = event.keyCode;
    if(tecla == 13) {
        if(ingresar.style.display != 'none') {
            login();
        }else{
            addUser();
        }
    }
}

function init() {
    localStorage.setItem('timeInac', 0);

    CARRERA = document.getElementById("carreras");
    USER = document.getElementById("usuario");
    PASSWORD = document.getElementById("password");

    selectCarrera = CARRERA.options[CARRERA.selectedIndex].value;

    CARRERA.addEventListener('change',
        function(){
            selectCarrera = this.options[CARRERA.selectedIndex].value;
        }
    );

    registrarse = document.getElementById("botonRegistrarse");
    registrarse.addEventListener("click", registrarseF);

    ingresar = document.getElementById("botonIngresar");
    ingresar.addEventListener("click", login);
    /* ingresar.addEventListener('keydown', (e)=>{
        console.log(e.keyCode);
    }); */

    registrar = document.getElementById("botonRegistrar");
    registrar.addEventListener("click", addUser);
}


window.addEventListener("load", init, false);
window.onkeydown = pressKey;