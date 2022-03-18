
var MESES = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November', 'December'];

var registrar, ingresar, registrarse, avatar, srcAvatar = "default";
var USER, PASSWORD, CARRERA, selectCarrera;

function agregarUsuario(usuario, password) {
    var verifiA = false;
    dataBase.child('z-usuarios').once('value').then(
        (s) => {
            let carreras = s.val();
            for(let i in carreras) {
                if(!verifiA) {
                    dataBase.child('z-usuarios').child(i).once('value').then(
                        (snap)=>{
                            let u = snap.val();
                            for(let j in u) {
                                if(j === usuario) {
                                    verifiA = true;
                                }
                            }
                            return verifiA;     
                        }
                    ).then(
                        (v)=>{
                            if(!v) {
                                var new_salt = salt(10);
                                var new_usuario = {
                                    'user' : usuario,
                                    'salt' : new_salt,
                                    'hash' : hash(password + new_salt),
                                    'signUpDate' : getTimeCurrent(),
                                    'carrera' : selectCarrera,
                                    'avatarPath' : srcAvatar
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
                    );
                }
            } 
        }
    );
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
                USER.classList.toggle('incorrecto');
                document.getElementById("spanUser").innerHTML = "Remove the spaces";
                document.getElementById("spanUser").classList.toggle('show');
            }
            if(!VP) {
                document.getElementById('passwordEye').classList.toggle('incorrecto');
                document.getElementById("spanPassword").innerHTML = "Remove the spaces";
                document.getElementById("spanPassword").classList.toggle('show');
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
        /* let avatarUser = dataBase.child('z-usuarios').child(selectCarrera).child(usuario)
                            .once('value')
                            .then(
                                (s) =>{
                                    let u = s.val();
                                    return u.avatarPath;
                                }
                            );
        localStorage.setItem('currentAvatar', avatarUser); */
        if(selectCarrera == 'informatica') {
            localStorage.setItem('carrera', 'informatica'); 
            window.location.href = "../pensumInformatica.html";
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

            document.getElementById('passwordEye').classList.toggle('incorrecto');
            document.getElementById("spanUser").classList.toggle('show');
            document.getElementById("spanPassword").classList.toggle('show');

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
        USER.classList.toggle('incorrecto');
        document.getElementById("spanUser").classList.toggle('show');
    }
    if(PASSWORD.value == "") {
        document.getElementById('passwordEye').classList.toggle('incorrecto');
        document.getElementById("spanPassword").classList.toggle('show');
    }

    if(selectCarrera == "") {
        document.getElementById('carreras').style.border = "1px solid red";
        document.getElementById('carreras').style.marginBottom = "0px"
        document.getElementById('spanSelect').style.display = 'block';
    }
}

function login(e) {
    try {
        e.preventDefault();
    } catch (error) {
        
    }
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
    //document.getElementById('defaultCarrera').selected = true;
    document.getElementById('carreras').style.border = 'none';
    document.getElementById('carreras').style.marginBottom = "10px"
    document.getElementById('spanSelect').style.display = 'none';
    if(USER.classList.contains('incorrecto')) {
        USER.classList.toggle('incorrecto');
    }
    if(document.getElementById('passwordEye').classList.contains('incorrecto')){
        document.getElementById('passwordEye').classList.toggle('incorrecto');
    }
    if(document.getElementById("spanUser").classList.contains('show')){
        document.getElementById("spanUser").classList.toggle('show');
    }
    if(document.getElementById("spanPassword").classList.contains('show')){
        document.getElementById("spanPassword").classList.toggle('show');
    }
    USER.value = "";
    PASSWORD.value = "";
    ingresar.classList.toggle('hidden');
    registrar.classList.toggle('show');
    document.getElementById('container-avatar').classList.toggle('show');
    document.getElementById('no-account').classList.toggle('hidden');
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
    ingresar.addEventListener("click", (event)=>{login(event)});

    registrar = document.getElementById("botonRegistrar");
    registrar.addEventListener("click", addUser);

    avatar = document.getElementById('button-avatar');
    avatar.addEventListener('click', ()=>{
        document.getElementById('popup-avatar').classList.toggle('show');
        if(!avatar.classList.toggle('cerrar')){
            avatar.innerHTML = 'Elige un Avatar';
        }else{
            avatar.innerHTML = 'X';
        }
    });

    
    document.addEventListener('click',(e)=>{
        if(document.getElementById('passwordEye').classList.contains('focus')) {
            document.getElementById('passwordEye').classList.remove('focus');
        }else{
            if(e.target === document.getElementById('password')) {
                document.getElementById('passwordEye').classList.add('focus');
            }
        }
    });

    PASSWORD.addEventListener('keypress', ()=>{
        console.log(PASSWORD.value)
        if(PASSWORD.value === '') {
            document.getElementById('spanEyeShow').classList.remove('show');
        }else{
            document.getElementById('spanEyeShow').classList.add('show');
        }
    });

    PASSWORD.addEventListener('mousemove', ()=>{
        console.log(PASSWORD.value)
        if(PASSWORD.value === '') {
            document.getElementById('spanEyeShow').classList.remove('show');
        }else{
            document.getElementById('spanEyeShow').classList.add('show');
        }
    });

    initAvatar();
}

function initAvatar() {
    for(let i=1; i<=10; i++) {
        let img = document.getElementById('avt'+i);
        img.addEventListener('click',()=>{
            getE('signin-avatar').src = img.src;
            if(!img.src.includes('user-default')) {
                getE('signin-avatar').style.width = '75px';
                getE('signin-avatar').style.height = '75px';
                getE('avatar-registro').classList.add('show');
            }else{
                getE('signin-avatar').style.width = '50px';
                getE('signin-avatar').style.height = '50px';
                getE('avatar-registro').classList.add('desvanecer');
                setTimeout(()=>{
                    getE('avatar-registro').classList.remove('show');
                    getE('avatar-registro').classList.remove('desvanecer');
                },2000);
            }
            srcAvatar = corregirLinkAvatar(img.src);
        });
    }
}

function corregirLinkAvatar(src) {
    let s = Array.from(src);
    s = './'+s.splice(29)
    s = s.replace(/,/g, "");
    return s;
}

function getE(id) {
    return document.getElementById(id);
}


window.addEventListener("load", init, false);
window.onkeydown = pressKey;