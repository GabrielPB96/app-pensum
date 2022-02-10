/**
 * set()
 * update()
 * push()
 * on("value", callback)
 * on("child_added", callback)
 * on("child_changed", callback)
*/

/*var o = firebase.database().ref().child("semestre6").on("child_added", (s) => {
    console.log(s.val());
});*/

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
const APROBADA  = "aprobada";
const CURSANDO  = "cursando";
const NO_TOMADA = "no_tomada";

var dataBase = firebase.database().ref();
var SEMESTRES = [];


function write(usuario, estado, name, id, semestre) {
    var materia = {
        'name' : name,
        'estado' : estado,
        'id' : id
    }
    firebase.database().ref(usuario +'/'+ semestre + '/' + id).set(materia);
}

function stateUpdate(semestre, id, estado) {
    var materia = {
        'estado' : estado
    }
    firebase.database().ref(semestre + '/' + id).update(materia);
}

function crearPensum(usuario) {
    //PRIMER SEMESTRE
    write(usuario, NO_TOMADA, 'Álgebra 1', 'Algebra1', 'semestre1');
    write(usuario, NO_TOMADA, 'Cálculo 1', 'Calculo1', 'semestre1');
    write(usuario, NO_TOMADA, 'Fisica General', 'FisicaGeneral', 'semestre1');
    write(usuario, NO_TOMADA, 'Ingles 1', 'Ingles1', 'semestre1');
    write(usuario, NO_TOMADA, 'Introducción a la Programación', 'IntroProgramacion', 'semestre1');

    //SEGUNDO SEMESTRE
    write(usuario, NO_TOMADA, 'Álgebra 2', 'Algebra2', 'semestre2');
    write(usuario, NO_TOMADA, 'Cálculo 2', 'Calculo1', 'semestre2');
    write(usuario, NO_TOMADA, 'Arquitectura de Computadoras 1', 'ArquiComputadoras1', 'semestre2');
    write(usuario, NO_TOMADA, 'Ingles 2', 'Ingles2', 'semestre2');
    write(usuario, NO_TOMADA, 'Elementos de Programación y Estructuras de Datos', 'Elementos', 'semestre2');
    write(usuario, NO_TOMADA, 'Programación', 'Programacion', 'semestre2');
}*/

var timeInactivo = 0;
var inac;

function inactivo() {
    timeInactivo++;
    if(timeInactivo == 420){
        //window.location.href = "../index.html";
        localStorage.setItem('timeInac', timeInactivo);
        clearInterval(inac);
    }
}

function clearTime() {
    timeInactivo = 0;
}

class EstadosMateria{
    constructor(e1, e2, e3, materia, semestre) {
        this.aprobada = e1;
        this.cursando = e2;
        this.no_tomada = e3;
        this.materia = materia;
        this.semestre = semestre;
        this.addEvent();
    }

    addEvent() {
        var info = this.materia.childNodes[3];
       
        this.aprobada.addEventListener("change", () => {
            stateUpdate(this.semestre, this.materia.id, APROBADA);
            info.style.background = "green";
        });
        this.cursando.addEventListener("change", () => {
            stateUpdate(this.semestre, this.materia.id, CURSANDO);
            info.style.background = "orange";
        });
        this.no_tomada.addEventListener("change", () => {
            stateUpdate(this.semestre, this.materia.id, NO_TOMADA);
            info.style.background = "gray";
        });
    }

    estadoActivo() {
        if(this.aprobada.checked) {
            return this.aprobada;
        }
        if(this.cursando.checked) {
            return this.cursando;
        }
        if(this.no_tomada.checked) {
            return this.no_tomada;
        }
    }
}

class Semestre{
    constructor(){
        this.materias = [];
    }

    addMateria(materia){
        this.materias.push(materia);
    }
}

//write(APROBADA, 'Porgramación', 'Programacion', 'semestre2');

//LEER DATOS
var CHECKEDS = [];
function readMateria(semestre, callback) {
    dataPensum.child(semestre).once('value').then(
        function(snapshot) {
            for(let i in snapshot.val()) {
                dataPensum.child(semestre).child(i).once('value').then(
                    (s) => {
                        var ob = s.val();
                        var nameId = ob.estadoActual +""+ ob.id;
                        var check = document.getElementById(nameId);
                        check.checked = true;
                        var divPaint = document.getElementById(i).childNodes[3];
                        if(ob.estadoActual == APROBADA) {
                            divPaint.style.background = "green";
                        }else if(ob.estadoActual == CURSANDO){
                            divPaint.style.background = "orange";
                        }else{
                            divPaint.style.background = "gray";
                        }
                    }
                )
            }
        }
    )
    callback();
}

function init() {
    console.log("init");
    
    var storageTime = localStorage.getItem('timeInac');

    document.addEventListener("touchmove", clearTime);
    document.onmousemove = clearTime;
    document.onclick = clearTime;
    document.addEventListener("keypress", clearTime);
    if( Number.parseInt(storageTime) == 420){
        window.location.href = "../index.html";
        localStorage.setItem('timeInac', 0);
    }
    var r = localStorage.getItem('ruta');
    dataPensum = firebase.database().ref(r);
    readInfo('semestre1');
    readInfo('semestre2');
    readInfo('semestre3');
    readInfo('semestre4');
    readInfo('semestre5');
    readInfo('semestre6');
    readInfo('semestre7');
    readInfo('semestre8');
    readInfo('semestre9');
    try {
        actualizarInfo();
    } catch (error) {
        
    }
    for(let i = 0; i < 9; i++) {
        var new_semestre = new Semestre();
        SEMESTRES_USER.push(new_semestre);
    }

    readMateria("semestre1", () => initMaterias(1));
    readMateria("semestre2", () => initMaterias(2));
    readMateria("semestre3", () => initMaterias(3));
    readMateria("semestre4", () => initMaterias(4));
    readMateria("semestre5", () => initMaterias(5));
    readMateria("semestre6", () => initMaterias(6));
    readMateria("semestre7", () => initMaterias(7));
    readMateria("semestre8", () => initMaterias(8));
    readMateria("semestre9", () => initMaterias(9));
    inac = setInterval(inactivo, 1000);
}

function initMaterias(sem) {
    console.log("initMaterias");
    if(sem == 1) {
        crearMateria("Algebra1", "aprobadaAlgebra1", "cursandoAlgebra1", "no_tomadaAlgebra1", 'semestre1', 0);
        crearMateria('Calculo1', "aprobadaCalculo1", "cursandoCalculo1", "no_tomadaCalculo1", 'semestre1', 0);
        crearMateria('FisicaGeneral', "aprobadaFisicaGeneral", "cursandoFisicaGeneral", "no_tomadaFisicaGeneral", 'semestre1', 0);
        crearMateria('Ingles1', "aprobadaIngles1", "cursandoIngles1", "no_tomadaIngles1", 'semestre1', 0);
        crearMateria('IntroProgramacion', "aprobadaIntroProgramacion", "cursandoIntroProgramacion", "no_tomadaIntroProgramacion", 'semestre1', 0);
    }else if(sem == 2) {
        crearMateria('Algebra2', "aprobadaAlgebra2", "cursandoAlgebra2", "no_tomadaAlgebra2", 'semestre2', 1);
        crearMateria('Calculo2', "aprobadaCalculo2", "cursandoCalculo2", "no_tomadaCalculo2", 'semestre2', 1);
        crearMateria('ArquiComputadoras1', "aprobadaArquiComputadoras1", "cursandoArquiComputadoras1", "no_tomadaArquiComputadoras1", 'semestre2', 1);
        crearMateria('Ingles2', "aprobadaIngles2", "cursandoIngles2", "no_tomadaIngles2", 'semestre2', 1);
        crearMateria('Elementos', "aprobadaElementos", "cursandoElementos", "no_tomadaElementos", 'semestre2', 1);
        crearMateria('Programacion', "aprobadaProgramacion", "cursandoProgramacion", "no_tomadaProgramacion", 'semestre2', 1);
    }else if(sem == 3) {
        crearMateria('Logica', "aprobadaLogica", "cursandoLogica", "no_tomadaLogica", 'semestre3', 2);
        crearMateria('CalculoNumerico', "aprobadaCalculoNumerico", "cursandoCalculoNumerico", "no_tomadaCalculoNumerico", 'semestre3', 2);
        crearMateria('ArquiComputadoras2', "aprobadaArquiComputadoras2", "cursandoArquiComputadoras2", "no_tomadaArquiComputadoras2", 'semestre3', 2);
        crearMateria('OrganizacionMetodos', "aprobadaOrganizacionMetodos", "cursandoOrganizacionMetodos", "no_tomadaOrganizacionMetodos", 'semestre3', 2);
        crearMateria('MedTecnProgramacion', "aprobadaMedTecnProgramacion", "cursandoMedTecnProgramacion", "no_tomadaMedTecnProgramacion", 'semestre3', 2);
        crearMateria('Grafos', "aprobadaGrafos", "cursandoGrafos", "no_tomadaGrafos", 'semestre3', 2);
    }else if(sem == 4) {
        crearMateria('PrograFuncional', "aprobadaPrograFuncional", "cursandoPrograFuncional", "no_tomadaPrograFuncional", 'semestre4', 3);
        crearMateria('ProbEstadistica', "aprobadaProbEstadistica", "cursandoProbEstadistica", "no_tomadaProbEstadistica", 'semestre4', 3);
        crearMateria('TallerPrograBajoNivel', "aprobadaTallerPrograBajoNivel", "cursandoTallerPrograBajoNivel", "no_tomadaTallerPrograBajoNivel", 'semestre4', 3);
        crearMateria('BaseDatos1', "aprobadaBaseDatos1", "cursandoBaseDatos1", "no_tomadaBaseDatos1", 'semestre4', 3);
        crearMateria('SisInformacion1', "aprobadaSisInformacion1", "cursandoSisInformacion1", "no_tomadaSisInformacion1", 'semestre4', 3);
        crearMateria('Algoritmos', "aprobadaAlgoritmos", "cursandoAlgoritmos", "no_tomadaAlgoritmos", 'semestre4', 3);
    }else if(sem == 5) {
        crearMateria('IA1', "aprobadaIA1", "cursandoIA1", "no_tomadaIA1", 'semestre5', 4);
        crearMateria('TallerSisOperativos', "aprobadaTallerSisOperativos", "cursandoTallerSisOperativos", "no_tomadaTallerSisOperativos", 'semestre5', 4);
        crearMateria('Automatas', "aprobadaAutomatas", "cursandoAutomatas", "no_tomadaAutomatas", 'semestre5', 4);
        crearMateria('BaseDatos2', "aprobadaBaseDatos2", "cursandoBaseDatos2", "no_tomadaBaseDatos2", 'semestre5', 4);
        crearMateria('SisInformacion2', "aprobadaSisInformacion2", "cursandoSisInformacion2", "no_tomadaSisInformacion2", 'semestre5', 4);
        crearMateria('GrafComputadora', "aprobadaGrafComputadora", "cursandoGrafComputadora", "no_tomadaGrafComputadora", 'semestre5', 4);
    }else if(sem == 6) {
        crearMateria('IA2', "aprobadaIA2", "cursandoIA2", "no_tomadaIA2", 'semestre6', 5);
        crearMateria('Redes', "aprobadaRedes", "cursandoRedes", "no_tomadaRedes", 'semestre6', 5);
        crearMateria('LenguajesProgramacion', "aprobadaLenguajesProgramacion", "cursandoLenguajesProgramacion", "no_tomadaLenguajesProgramacion", 'semestre6', 5);
        crearMateria('TallerBaseDatos', "aprobadaTallerBaseDatos", "cursandoTallerBaseDatos", "no_tomadaTallerBaseDatos", 'semestre6', 5);
        crearMateria('IngSoftware', "aprobadaIngSoftware", "cursandoIngSoftware", "no_tomadaIngSoftware", 'semestre6', 5);
        crearMateria('PrograWeb', "aprobadaPrograWeb", "cursandoPrograWeb", "no_tomadaPrograWeb", 'semestre6', 5);
    }else if(sem == 7){
        crearMateria('Electiva1', "aprobadaElectiva1", "cursandoElectiva1", "no_tomadaElectiva1", 'semestre7', 6);
        crearMateria('Electiva2', "aprobadaElectiva2", "cursandoElectiva2", "no_tomadaElectiva2", 'semestre7', 6);
        crearMateria('TallerIngSoftware', "aprobadaTallerIngSoftware", "cursandoTallerIngSoftware", "no_tomadaTallerIngSoftware", 'semestre7', 6);
        crearMateria('ArquiSoftware', "aprobadaArquiSoftware", "cursandoArquiSoftware", "no_tomadaArquiSoftware", 'semestre7', 6);
        crearMateria('IntrHumanoCompu', "aprobadaIntrHumanoCompu", "cursandoIntrHumanoCompu", "no_tomadaIntrHumanoCompu", 'semestre7', 6);
        crearMateria('RedesAvanzadas', "aprobadaRedesAvanzadas", "cursandoRedesAvanzadas", "no_tomadaRedesAvanzadas", 'semestre7', 6);
    }else if(sem == 8) {
        crearMateria('Electiva3', "aprobadaElectiva3", "cursandoElectiva3", "no_tomadaElectiva3", 'semestre8', 7);
        crearMateria('Electiva4', "aprobadaElectiva4", "cursandoElectiva4", "no_tomadaElectiva4", 'semestre8', 7);
        crearMateria('Electiva5', "aprobadaElectiva5", "cursandoElectiva5", "no_tomadaElectiva5", 'semestre8', 7);
        crearMateria('Electiva6', "aprobadaElectiva6", "cursandoElectiva6", "no_tomadaElectiva6", 'semestre8', 7);
        crearMateria('TallerGrado1', "aprobadaTallerGrado1", "cursandoTallerGrado1", "no_tomadaTallerGrado1", 'semestre8', 7);
        crearMateria('EvalAudiSistemas', "aprobadaEvalAudiSistemas", "cursandoEvalAudiSistemas", "no_tomadaEvalAudiSistemas", 'semestre8', 7);
        crearMateria('TallerGrado2', "aprobadaTallerGrado2", "cursandoTallerGrado2", "no_tomadaTallerGrado2", 'semestre8', 7);
    }else if(sem == 9) {
        crearMateria('ModTitulacion', "aprobadaModTitulacion", "cursandoModTitulacion", "no_tomadaModTitulacion", 'semestre9', 8);
    }
}

function crearMateria(idC, idE1, idE2, idE3, semestre, posS) {
    var materiaP = document.getElementById(idC);
    var e1 = document.getElementById(idE1);
    var e2 = document.getElementById(idE2);
    var e3 = document.getElementById(idE3);
    
    var materia = new EstadosMateria(e1, e2, e3, materiaP, semestre);
    SEMESTRES_USER[posS].addMateria(materia);
}

var aprobadasCant = 0, cursandoCant = 0;

function readInfo(semestre) {
 
        dataPensum.child(semestre).once('value').then(
            function(snapshot) {
                for(let j in snapshot.val()) {
                    dataPensum.child(semestre).child(j).once('value').then(
                        (s) => {
                            var ob1 = s.val();
                            if(ob1.estadoActual == APROBADA) {
                                aprobadasCant++;
                            }else if(ob1.estadoActual == CURSANDO) {
                                cursandoCant++;
                            }
                        }
                    )
                }
                document.getElementById("h4Apro").innerHTML = "Aprobadas: " + aprobadasCant;
                document.getElementById("h4Cur").innerHTML = "Cursando: " + cursandoCant;
            }
        )
}

function actualizarInfo() {    
    var textSemestre = "semestre";

    for(let i = 1; i <= 9; i++){
        dataPensum.child(textSemestre + i).on('child_changed', (s) => {
            var ob = s.val();
            if(ob.estadoActual == APROBADA) {
                aprobadasCant++;
                if(ob.estadoAnterior == CURSANDO) {
                    if(cursandoCant != 0) cursandoCant--;
                }
            }else if(ob.estadoActual == CURSANDO) {
                cursandoCant++;
                if(ob.estadoAnterior == APROBADA) {
                    if(aprobadasCant != 0) aprobadasCant--;
                }
            }else{
                if(ob.estadoAnterior == APROBADA) {
                    if(aprobadasCant != 0) aprobadasCant--;
                }else if(ob.estadoAnterior == CURSANDO) {
                    if(cursandoCant != 0) cursandoCant--;
                }
            }
            document.getElementById("h4Apro").innerHTML = "Aprobadas: " + aprobadasCant;
            document.getElementById("h4Cur").innerHTML = "Cursando: " + cursandoCant;
        });
    }
}


window.addEventListener("load", init);

/*var data = {
    'name' : 'Algebra 1',
    'estado' : NO_TOMADA
}
ref.update(data);*/
/*ref.child("semestre1").on("value", function(snapshot){
        console.log(snapshot.val());
});*/

/*function paint(estado, materia) {
    var element = document.getElementById(materia);
    if(estado == APROBADA) {
        element.style.background = 
    }
}*/

/*dataBase.child("semestre1").child("prueba").push({
    'name' : 3
});*/

/*dataBase.ref('semestre1/Algebra1').once('value').then(
    function(snapshot){
            var title = snapshot.val().name;
            console.log(title);
    }
)*/

//readMateria('semestre1', "Calculo1");
/*var newPostKey = firebase.database().ref().child('semestre1/Algebra1').push().key;
console.log(newPostKey);*/

