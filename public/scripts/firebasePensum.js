
const firebaseConfig = {
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
var dataPensum;
var LIST_USERS  = new Map();

var SEMESTRES_USER = [];

var USER_CURRENT;

var pensumFactory;

function leerUsers() {
    dataBase.child('z-usuarios').on('child_added', (snapshot) => {
        var colec = snapshot.val();
        var users = [];
        for(let i in colec) {
            dataBase.child('z-usuarios').child(snapshot.key)
            .on('child_added', (s) => {
                users.push(s.val());
            });
        }
        
        LIST_USERS.set(snapshot.key, users)
    });
}

leerUsers();


function write(usuario, carrera, estado, estadoAnt, name, id, semestre) {
    var materia = {
        'name' : name,
        'estadoActual' : estado,
        'estadoAnterior': estadoAnt,
        'id' : id
    }
    firebase.database().ref(carrera+'/'+usuario +'/'+ semestre + '/' + id).set(materia);
}

var stAct = 'no';

function stateUpdate(semestre, id, estado) {
    var stAct;
    dataPensum.child(semestre).child(id).once('value').then(
        (s) => {
            stAct = s.val().estadoActual;
            var materia = {
                'estadoActual' : estado,
                'estadoAnterior' : stAct
            }
            
            dataPensum.child(semestre).child(id).update(materia);
        }
    );
}

function crearPensumSistemas(usuario, carrera) {}

function crearPensumInformatica(usuario, carrera) {
    //PRIMER SEMESTRE
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Álgebra 1', 'Algebra1', 'semestre1');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Cálculo 1', 'Calculo1', 'semestre1');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Fisica General', 'FisicaGeneral', 'semestre1');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Ingles I', 'Ingles1', 'semestre1');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Introducción a la Programación', 'IntroProgramacion', 'semestre1');

    //SEGUNDO SEMESTRE
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Álgebra II', 'Algebra2', 'semestre2');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Cálculo II', 'Calculo2', 'semestre2');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Arquitectura de Computadoras I', 'ArquiComputadoras1', 'semestre2');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Ingles II', 'Ingles2', 'semestre2');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Elementos de Programación y Estructuras de Datos', 'Elementos', 'semestre2');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Programación', 'Programacion', 'semestre2');

    //TERCER SEMESTRE
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Lógica', 'Logica', 'semestre3');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Cálculo Numérico', 'CalculoNumerico', 'semestre3');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Arquitectura de Computadoras II', 'ArquiComputadoras2', 'semestre3');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Organización y Métodos', 'OrganizacionMetodos', 'semestre3');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Métodos y Técnicas de Programación', 'MedTecnProgramacion', 'semestre3');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Teoría de Grafos', 'Grafos', 'semestre3');

    //CUARTO SEMESTRE
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Programación Funcional', 'PrograFuncional', 'semestre4');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Probabilidad y Estadística', 'ProbEstadistica', 'semestre4');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Taller de Programación en Bajo Nivel', 'TallerPrograBajoNivel', 'semestre4');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Base de Datos I', 'BaseDatos1', 'semestre4');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Sistemas de Información I', 'SisInformacion1', 'semestre4');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Algoritmos Avanzados', 'Algoritmos', 'semestre4');

    //QUINTO SEMESTRE
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Inteligencia Artificial I', 'IA1', 'semestre5');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Taller de Sistemas Operativos', 'TallerSisOperativos', 'semestre5');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Teoria de Autómatas y Lenguajes Formales', 'Automatas', 'semestre5');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Base de Datos II', 'BaseDatos2', 'semestre5');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Sistemas de Información II', 'SisInformacion2', 'semestre5');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Graficación por Computadora', 'GrafComputadora', 'semestre5');

    //SEXTO SEMESTRE
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Inteligencia Artificial II', 'IA2', 'semestre6');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Redes de Computadoras', 'Redes', 'semestre6');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Estructura y Semántica de Lenguajes de Programción', 'LenguajesProgramacion', 'semestre6');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Taller de Base de Datos', 'TallerBaseDatos', 'semestre6');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Ingeniería de Software', 'IngSoftware', 'semestre6');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Programción Web', 'PrograWeb', 'semestre6');

    //SEPTIMO SEMESTRE
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Interacción Humano Computadora', 'IntrHumanoCompu', 'semestre7');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Tecnología de Redes Avanzadas', 'RedesAvanzadas', 'semestre7');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Electiva I', 'Electiva1', 'semestre7');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Electiva II', 'Electiva2', 'semestre7');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Taller de Ingeniería de Software', 'TallerIngSoftware', 'semestre7');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Arquitectura de Software', 'ArquiSoftware', 'semestre7');

    //OCTAVO SEMESTRE
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Electiva III', 'Electiva3', 'semestre8');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Electiva IV', 'Electiva4', 'semestre8');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Electiva V', 'Electiva5', 'semestre8');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Electiva VI', 'Electiva6', 'semestre8');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Taller de Grado I', 'TallerGrado1', 'semestre8');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Evalución y Auditoria de Sistemas', 'EvalAudiSistemas', 'semestre8');
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Taller de Grado II', 'TallerGrado2', 'semestre8');

    //NOVENO SEMESTRE
    write(usuario, carrera, NO_TOMADA, NO_TOMADA, 'Modalidad de Titulación', 'ModTitulacion', 'semestre9');
}

function crearFactory(type) {
    if(type == 'informatica') {
        pensumFactory = new PensumInformaticaFactory();
    }else if(type == 'sistemas') {
        pensumFactory = new PensumSistemasFactory();
    }
}

function crearMalla(usuario, carrera) {
    crearFactory(carrera);
    pensumFactory.createPensum(usuario);
}

/* var horario = [
    {
        'id' : '123-m',
        'estado' : 1
    },
    {
        'id' : '1453-n',
        'estado' : 5
    },
    {
        'id' : '14356-g',
        'estado' : 10
    }
    ,
    {
        'id' : '143-g',
        'estado' : 15
    }
] */

/* dataBase.child('Horario').on('value', 
    function(s){
        var hor = Array.from(s.val());
        for(let i of hor) {
            console.log(i);
        }
    }
);

//dataBase.child('Horario').set(horario); */