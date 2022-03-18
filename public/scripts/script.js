var timeInactivo = 0;
var inac;

function inactivo() {
    timeInactivo++;
    if (timeInactivo == 300) {
        //window.location.replace("../index.html");
        localStorage.setItem('timeInac', timeInactivo);
        clearInterval(inac);
        alert("Expired Session");
        window.location.replace("../index.html");
    }
}

function clearTime() {
    timeInactivo = 0;
}

class EstadosMateria {
    constructor(e1, e2, e3, materia, semestre) {
        this.aprobada = e1;
        this.cursando = e2;
        this.no_tomada = e3;
        this.materia = materia;
        this.semestre = semestre;
        this.addEvent();
    }

    addEvent() {
        //var info = this.materia.childNodes[3];

        this.aprobada.addEventListener("change", () => {
            stateUpdate(this.semestre, this.materia.id, APROBADA);
            //info.style.background = "green";
        });
        this.cursando.addEventListener("change", () => {
            stateUpdate(this.semestre, this.materia.id, CURSANDO);
            //info.style.background = "orange";
        });
        this.no_tomada.addEventListener("change", () => {
            stateUpdate(this.semestre, this.materia.id, NO_TOMADA);
            //info.style.background = "gray";
        });
    }

    estadoActivo() {
        if (this.aprobada.checked) {
            return this.aprobada;
        }
        if (this.cursando.checked) {
            return this.cursando;
        }
        if (this.no_tomada.checked) {
            return this.no_tomada;
        }
    }
}

class Semestre {
    constructor() {
        this.materias = [];
    }

    addMateria(materia) {
        this.materias.push(materia);
    }
}

//LEER DATOS
var CHECKEDS = [];
function readMateria(semestre, callback) {
    dataPensum.child(semestre).once('value').then(
        function (snapshot) {
            for (let i in snapshot.val()) {
                dataPensum.child(semestre).child(i).once('value').then(
                    (s) => {
                        var ob = s.val();
                        var nameId = ob.estadoActual + "" + ob.id;
                        var check = document.getElementById(nameId);
                        if (check == null) console.log(nameId);
                        check.checked = true;
                        var divPaint = document.getElementById(i).childNodes[3];
                        if (ob.estadoActual == APROBADA) {
                            divPaint.style.background = "green";
                        } else if (ob.estadoActual == CURSANDO) {
                            divPaint.style.background = "orange";
                        } else {
                            divPaint.style.background = "gray";
                        }
                    }
                )
            }
        }
    ).then(
        () =>{
            callback();
        }
    );
    
}

function readInfoInformatica() {
    readInfo('semestre1');
    readInfo('semestre2');
    readInfo('semestre3');
    readInfo('semestre4');
    readInfo('semestre5');
    readInfo('semestre6');
    readInfo('semestre7');
    readInfo('semestre8');
    readInfo('semestre9');
}

function readInfoSistemas() {
    readInfo('semestre1');
    readInfo('semestre2');
    readInfo('semestre3');
    readInfo('semestre4');
    readInfo('semestre5');
    readInfo('semestre6');
}

function createInitMateriasInformatica() {
    readMateria("semestre1", () => initMateriasInformatica(1));
    readMateria("semestre2", () => initMateriasInformatica(2));
    readMateria("semestre3", () => initMateriasInformatica(3));
    readMateria("semestre4", () => initMateriasInformatica(4));
    readMateria("semestre5", () => initMateriasInformatica(5));
    readMateria("semestre6", () => initMateriasInformatica(6));
    readMateria("semestre7", () => initMateriasInformatica(7));
    readMateria("semestre8", () => initMateriasInformatica(8));
    readMateria("semestre9", () => initMateriasInformatica(9));
}

function createInitMateriasSistemas() {
    readMateria("semestre1", () => initMateriasSistemas(1));
    readMateria("semestre2", () => initMateriasSistemas(2));
    readMateria("semestre3", () => initMateriasSistemas(3));
    readMateria("semestre4", () => initMateriasSistemas(4));
    readMateria("semestre5", () => initMateriasSistemas(5));
    readMateria("semestre6", () => initMateriasSistemas(6));
    /*readMateria("semestre7", () => initMateriasSistemas(7));
    readMateria("semestre8", () => initMateriasSistemas(8));
    readMateria("semestre9", () => initMateriasSistemas(9));*/
}

class ItemMenu {
    constructor(nombre) {
        this.nodo = document.getElementById(nombre);
        if (this.nodo == null) console.log(nombre)
        this.item = this.nodo.parentElement.childNodes[5];
        this.event();
    }

    event() {
        this.nodo.addEventListener("change", () => {
            if (this.nodo.checked) {
                this.item.classList.add("show");
            } else {
                this.item.classList.remove("show");
                this.item.classList.add("hidden");
                setTimeout(() => {
                    this.item.classList.remove("hidden");
                }, 280);
            }
        });

        this.nodo.parentNode.addEventListener('mouseleave', () => {
            if (this.nodo.checked) {
                this.item.classList.remove("show");
                this.item.classList.add("hidden");
                setTimeout(() => {
                    this.item.classList.remove("hidden");
                    this.nodo.checked = false;
                }, 280);
            }
        });
    }
}

function addEventOpacity(limitA, limitB) {
    var ITEMS = [];
    ITEMS.push(new ItemMenu("btn-menu"));
    for (let i = 2; i <= limitA; i++) {
        var item = new ItemMenu("btn-menuE" + i);
        ITEMS.push(item);
    }

    for (let i = 2; i <= limitB; i++) {
        var item = new ItemMenu("btn-menu" + i);
        ITEMS.push(item);
    }
}

function initMateriasInformatica(sem) {
    if (sem == 1) {
        crearMateria("Algebra1", "aprobadaAlgebra1", "cursandoAlgebra1", "no_tomadaAlgebra1", 'semestre1', 0);
        crearMateria('Calculo1', "aprobadaCalculo1", "cursandoCalculo1", "no_tomadaCalculo1", 'semestre1', 0);
        crearMateria('FisicaGeneral', "aprobadaFisicaGeneral", "cursandoFisicaGeneral", "no_tomadaFisicaGeneral", 'semestre1', 0);
        crearMateria('Ingles1', "aprobadaIngles1", "cursandoIngles1", "no_tomadaIngles1", 'semestre1', 0);
        crearMateria('IntroProgramacion', "aprobadaIntroProgramacion", "cursandoIntroProgramacion", "no_tomadaIntroProgramacion", 'semestre1', 0);
    } else if (sem == 2) {
        crearMateria('Algebra2', "aprobadaAlgebra2", "cursandoAlgebra2", "no_tomadaAlgebra2", 'semestre2', 1);
        crearMateria('Calculo2', "aprobadaCalculo2", "cursandoCalculo2", "no_tomadaCalculo2", 'semestre2', 1);
        crearMateria('ArquiComputadoras1', "aprobadaArquiComputadoras1", "cursandoArquiComputadoras1", "no_tomadaArquiComputadoras1", 'semestre2', 1);
        crearMateria('Ingles2', "aprobadaIngles2", "cursandoIngles2", "no_tomadaIngles2", 'semestre2', 1);
        crearMateria('Elementos', "aprobadaElementos", "cursandoElementos", "no_tomadaElementos", 'semestre2', 1);
        crearMateria('Programacion', "aprobadaProgramacion", "cursandoProgramacion", "no_tomadaProgramacion", 'semestre2', 1);
    } else if (sem == 3) {
        crearMateria('Logica', "aprobadaLogica", "cursandoLogica", "no_tomadaLogica", 'semestre3', 2);
        crearMateria('CalculoNumerico', "aprobadaCalculoNumerico", "cursandoCalculoNumerico", "no_tomadaCalculoNumerico", 'semestre3', 2);
        crearMateria('ArquiComputadoras2', "aprobadaArquiComputadoras2", "cursandoArquiComputadoras2", "no_tomadaArquiComputadoras2", 'semestre3', 2);
        crearMateria('OrganizacionMetodos', "aprobadaOrganizacionMetodos", "cursandoOrganizacionMetodos", "no_tomadaOrganizacionMetodos", 'semestre3', 2);
        crearMateria('MedTecnProgramacion', "aprobadaMedTecnProgramacion", "cursandoMedTecnProgramacion", "no_tomadaMedTecnProgramacion", 'semestre3', 2);
        crearMateria('Grafos', "aprobadaGrafos", "cursandoGrafos", "no_tomadaGrafos", 'semestre3', 2);
    } else if (sem == 4) {
        crearMateria('PrograFuncional', "aprobadaPrograFuncional", "cursandoPrograFuncional", "no_tomadaPrograFuncional", 'semestre4', 3);
        crearMateria('ProbEstadistica', "aprobadaProbEstadistica", "cursandoProbEstadistica", "no_tomadaProbEstadistica", 'semestre4', 3);
        crearMateria('TallerPrograBajoNivel', "aprobadaTallerPrograBajoNivel", "cursandoTallerPrograBajoNivel", "no_tomadaTallerPrograBajoNivel", 'semestre4', 3);
        crearMateria('BaseDatos1', "aprobadaBaseDatos1", "cursandoBaseDatos1", "no_tomadaBaseDatos1", 'semestre4', 3);
        crearMateria('SisInformacion1', "aprobadaSisInformacion1", "cursandoSisInformacion1", "no_tomadaSisInformacion1", 'semestre4', 3);
        crearMateria('Algoritmos', "aprobadaAlgoritmos", "cursandoAlgoritmos", "no_tomadaAlgoritmos", 'semestre4', 3);
    } else if (sem == 5) {
        crearMateria('IA1', "aprobadaIA1", "cursandoIA1", "no_tomadaIA1", 'semestre5', 4);
        crearMateria('TallerSisOperativos', "aprobadaTallerSisOperativos", "cursandoTallerSisOperativos", "no_tomadaTallerSisOperativos", 'semestre5', 4);
        crearMateria('Automatas', "aprobadaAutomatas", "cursandoAutomatas", "no_tomadaAutomatas", 'semestre5', 4);
        crearMateria('BaseDatos2', "aprobadaBaseDatos2", "cursandoBaseDatos2", "no_tomadaBaseDatos2", 'semestre5', 4);
        crearMateria('SisInformacion2', "aprobadaSisInformacion2", "cursandoSisInformacion2", "no_tomadaSisInformacion2", 'semestre5', 4);
        crearMateria('GrafComputadora', "aprobadaGrafComputadora", "cursandoGrafComputadora", "no_tomadaGrafComputadora", 'semestre5', 4);
    } else if (sem == 6) {
        crearMateria('IA2', "aprobadaIA2", "cursandoIA2", "no_tomadaIA2", 'semestre6', 5);
        crearMateria('Redes', "aprobadaRedes", "cursandoRedes", "no_tomadaRedes", 'semestre6', 5);
        crearMateria('LenguajesProgramacion', "aprobadaLenguajesProgramacion", "cursandoLenguajesProgramacion", "no_tomadaLenguajesProgramacion", 'semestre6', 5);
        crearMateria('TallerBaseDatos', "aprobadaTallerBaseDatos", "cursandoTallerBaseDatos", "no_tomadaTallerBaseDatos", 'semestre6', 5);
        crearMateria('IngSoftware', "aprobadaIngSoftware", "cursandoIngSoftware", "no_tomadaIngSoftware", 'semestre6', 5);
        crearMateria('PrograWeb', "aprobadaPrograWeb", "cursandoPrograWeb", "no_tomadaPrograWeb", 'semestre6', 5);
    } else if (sem == 7) {
        crearMateria('Electiva1', "aprobadaElectiva1", "cursandoElectiva1", "no_tomadaElectiva1", 'semestre7', 6);
        crearMateria('Electiva2', "aprobadaElectiva2", "cursandoElectiva2", "no_tomadaElectiva2", 'semestre7', 6);
        crearMateria('TallerIngSoftware', "aprobadaTallerIngSoftware", "cursandoTallerIngSoftware", "no_tomadaTallerIngSoftware", 'semestre7', 6);
        crearMateria('ArquiSoftware', "aprobadaArquiSoftware", "cursandoArquiSoftware", "no_tomadaArquiSoftware", 'semestre7', 6);
        crearMateria('IntrHumanoCompu', "aprobadaIntrHumanoCompu", "cursandoIntrHumanoCompu", "no_tomadaIntrHumanoCompu", 'semestre7', 6);
        crearMateria('RedesAvanzadas', "aprobadaRedesAvanzadas", "cursandoRedesAvanzadas", "no_tomadaRedesAvanzadas", 'semestre7', 6);
    } else if (sem == 8) {
        crearMateria('Electiva3', "aprobadaElectiva3", "cursandoElectiva3", "no_tomadaElectiva3", 'semestre8', 7);
        crearMateria('Electiva4', "aprobadaElectiva4", "cursandoElectiva4", "no_tomadaElectiva4", 'semestre8', 7);
        crearMateria('Electiva5', "aprobadaElectiva5", "cursandoElectiva5", "no_tomadaElectiva5", 'semestre8', 7);
        crearMateria('Electiva6', "aprobadaElectiva6", "cursandoElectiva6", "no_tomadaElectiva6", 'semestre8', 7);
        crearMateria('TallerGrado1', "aprobadaTallerGrado1", "cursandoTallerGrado1", "no_tomadaTallerGrado1", 'semestre8', 7);
        crearMateria('EvalAudiSistemas', "aprobadaEvalAudiSistemas", "cursandoEvalAudiSistemas", "no_tomadaEvalAudiSistemas", 'semestre8', 7);
        crearMateria('TallerGrado2', "aprobadaTallerGrado2", "cursandoTallerGrado2", "no_tomadaTallerGrado2", 'semestre8', 7);
    } else if (sem == 9) {
        crearMateria('ModTitulacion', "aprobadaModTitulacion", "cursandoModTitulacion", "no_tomadaModTitulacion", 'semestre9', 8);
    }
}

function initMateriasSistemas(sem) {
    if (sem == 1) {
        crearMateria("Algebra1", "aprobadaAlgebra1", "cursandoAlgebra1", "no_tomadaAlgebra1", 'semestre1', 0);
        crearMateria('Calculo1', "aprobadaCalculo1", "cursandoCalculo1", "no_tomadaCalculo1", 'semestre1', 0);
        crearMateria('FisicaGeneral', "aprobadaFisicaGeneral", "cursandoFisicaGeneral", "no_tomadaFisicaGeneral", 'semestre1', 0);
        crearMateria('Ingles1', "aprobadaIngles1", "cursandoIngles1", "no_tomadaIngles1", 'semestre1', 0);
        crearMateria('IntroProgramacion', "aprobadaIntroProgramacion", "cursandoIntroProgramacion", "no_tomadaIntroProgramacion", 'semestre1', 0);
    } else if (sem == 2) {
        crearMateria('Algebra2', "aprobadaAlgebra2", "cursandoAlgebra2", "no_tomadaAlgebra2", 'semestre2', 1);
        crearMateria('Calculo2', "aprobadaCalculo2", "cursandoCalculo2", "no_tomadaCalculo2", 'semestre2', 1);
        crearMateria('ArquiComputadoras1', "aprobadaArquiComputadoras1", "cursandoArquiComputadoras1", "no_tomadaArquiComputadoras1", 'semestre2', 1);
        crearMateria('Ingles2', "aprobadaIngles2", "cursandoIngles2", "no_tomadaIngles2", 'semestre2', 1);
        crearMateria('Elementos', "aprobadaElementos", "cursandoElementos", "no_tomadaElementos", 'semestre2', 1);
    } else if (sem == 3) {
        crearMateria('CalculoNumerico', "aprobadaCalculoNumerico", "cursandoCalculoNumerico", "no_tomadaCalculoNumerico", 'semestre3', 2);
        crearMateria('ArquiComputadoras2', "aprobadaArquiComputadoras2", "cursandoArquiComputadoras2", "no_tomadaArquiComputadoras2", 'semestre3', 2);
        crearMateria('MedTecnProgramacion', "aprobadaMedTecnProgramacion", "cursandoMedTecnProgramacion", "no_tomadaMedTecnProgramacion", 'semestre3', 2);
    } else if (sem == 4) {
        crearMateria('ProbEstadistica', "aprobadaProbEstadistica", "cursandoProbEstadistica", "no_tomadaProbEstadistica", 'semestre4', 3);
        crearMateria('BaseDatos1', "aprobadaBaseDatos1", "cursandoBaseDatos1", "no_tomadaBaseDatos1", 'semestre4', 3);
        crearMateria('SisInformacion1', "aprobadaSisInformacion1", "cursandoSisInformacion1", "no_tomadaSisInformacion1", 'semestre4', 3);
    } else if (sem == 5) {
        crearMateria('IA1', "aprobadaIA1", "cursandoIA1", "no_tomadaIA1", 'semestre5', 4);
        crearMateria('TallerSisOperativos', "aprobadaTallerSisOperativos", "cursandoTallerSisOperativos", "no_tomadaTallerSisOperativos", 'semestre5', 4);
        crearMateria('BaseDatos2', "aprobadaBaseDatos2", "cursandoBaseDatos2", "no_tomadaBaseDatos2", 'semestre5', 4);
        crearMateria('SisInformacion2', "aprobadaSisInformacion2", "cursandoSisInformacion2", "no_tomadaSisInformacion2", 'semestre5', 4);
    } else if (sem == 6) {
        crearMateria('Redes', "aprobadaRedes", "cursandoRedes", "no_tomadaRedes", 'semestre6', 5);
        crearMateria('TallerBaseDatos', "aprobadaTallerBaseDatos", "cursandoTallerBaseDatos", "no_tomadaTallerBaseDatos", 'semestre6', 5);
        crearMateria('IngSoftware', "aprobadaIngSoftware", "cursandoIngSoftware", "no_tomadaIngSoftware", 'semestre6', 5);
        crearMateria('PrograWeb', "aprobadaPrograWeb", "cursandoPrograWeb", "no_tomadaPrograWeb", 'semestre6', 5);
    }/*else if(sem == 7){
        crearMateria('Electiva1', "aprobadaElectiva1", "cursandoElectiva1", "no_tomadaElectiva1", 'semestre7', 6);
        crearMateria('Electiva2', "aprobadaElectiva2", "cursandoElectiva2", "no_tomadaElectiva2", 'semestre7', 6);
        crearMateria('TallerIngSoftware', "aprobadaTallerIngSoftware", "cursandoTallerIngSoftware", "no_tomadaTallerIngSoftware", 'semestre7', 6);
        crearMateria('ArquiSoftware', "aprobadaArquiSoftware", "cursandoArquiSoftware", "no_tomadaArquiSoftware", 'semestre7', 6);
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
    }*/
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
var numberAct = [];
function readInfo(semestre) {
    dataPensum.child(semestre).once('value').then(
        function (snapshot) {
            for (let j in snapshot.val()) {
                dataPensum.child(semestre).child(j).once('value').then(
                    (s) => {
                        var ob1 = s.val();
                        if (ob1.estadoActual == APROBADA) {
                            aprobadasCant++;                 
                        } else if (ob1.estadoActual == CURSANDO) {
                            cursandoCant++;
                        }
                        return [aprobadasCant, cursandoCant];
                    }
                ).then(
                    (cantidad)=>{
                        if(numberAct.length == 9){
                            document.getElementById("h4Apro").innerHTML = "Aprobadas: " + cantidad[0];
                            document.getElementById("h4Cur").innerHTML = "Cursando: " + cantidad[1];
                            setTimeout(()=>{
                                document.getElementById('loader-info').classList.toggle('show');
                            }, 80);
                        }
                    }
                );
            }
            numberAct.push(1);
        }
    )
}

function actualizarInfo() {
    var textSemestre = "semestre";
    for (let i = 1; i <= 9; i++) {
        dataPensum.child(textSemestre + i)
        .on('child_changed', (s) => {
            var ob = s.val();
            var nodoAct = document.getElementById(ob.id).childNodes[3];
            renderEstadoMaterias(ob, nodoAct);
            document.getElementById("h4Apro").innerHTML = "Aprobadas: " + aprobadasCant;
            document.getElementById("h4Cur").innerHTML = "Cursando: " + cursandoCant;
        }
        );
    }
}

function renderEstadoMaterias(ob, nodoAct) {
    if (ob.estadoActual == APROBADA) {
        aprobadasCant++;
        nodoAct.style.background = "green";
        document.getElementById("aprobada" + ob.id).checked = true;
        if (ob.estadoAnterior == CURSANDO) {
            if (cursandoCant != 0) cursandoCant--;
        }
    } else if (ob.estadoActual == CURSANDO) {
        cursandoCant++;
        nodoAct.style.background = "orange";
        document.getElementById("cursando" + ob.id).checked = true;
        if (ob.estadoAnterior == APROBADA) {
            if (aprobadasCant != 0) aprobadasCant--;
        }
    } else {
        nodoAct.style.background = "gray";
        document.getElementById("no_tomada" + ob.id).checked = true;
        if (ob.estadoAnterior == APROBADA) {
            if (aprobadasCant != 0) aprobadasCant--;
        } else if (ob.estadoAnterior == CURSANDO) {
            if (cursandoCant != 0) cursandoCant--;
        }
    }
}

function cargarAvatares() {
    let avatares = {
        avtM1 : './assets/avatar/avtM1.png',
        avtM2 : './assets/avatar/avtM2.png',
        avtM3 : './assets/avatar/avtM3.png',
        avtM4 : './assets/avatar/avtM4.png',
        avtM5 : './assets/avatar/avtM5.png',
        avtF1 : './assets/avatar/avtF1.png',
        avtF2 : './assets/avatar/avtF2.png',
        avtF3 : './assets/avatar/avtF3.png',
        avtF4 : './assets/avatar/avtF4.png',
    };
    dataBase.child('avatares').update(avatares);
}

function capitalize(str){
    let sub = str.substr(1, str.length);
    return str[0].toUpperCase() + sub.toLowerCase();
}
function cargarAvatar(usuario, carrera) {
    let imgAvt = document.getElementById('avatar-user'),
    nameUser = document.getElementById('name-user');
    
    dataBase.child('z-usuarios').child(carrera).child(usuario).once('value')
    .then(
        (s)=>{
            let u = s.val();
            let ruta = u.avatarPath;
            nameUser.innerHTML = capitalize(usuario);
            if(ruta.includes('default')) {
                //activar ventana para elegir un avatar :)
                document.getElementById('avatar-elige').classList.remove('hidden');
            }else{
                imgAvt.src = ruta;
                imgAvt.style.width = '80px';
                imgAvt.style.height = '80px';
            }
        }
    );
}


function init() {
    cargarAvatar(localStorage.getItem('usuario'), localStorage.getItem('carrera'));

    document.getElementById('logout').addEventListener('click', () => {
        window.location.replace("../index.html");
    })

    var storageTime = localStorage.getItem('timeInac');

    document.addEventListener("touchmove", clearTime);
    document.onmousemove = clearTime;
    document.onclick = clearTime;
    document.addEventListener("keypress", clearTime);

    if (Number.parseInt(storageTime) == 300) {
        localStorage.setItem('timeInac', 0);
        window.location.replace("../index.html");
    }

    var r = localStorage.getItem('ruta');

    dataPensum = firebase.database().ref(r);
    if (localStorage.getItem('carrera') == 'informatica') {
        numberAct.length = 0;
        readInfoInformatica();
    } else if (localStorage.getItem('carrera') == 'sistemas') {
        numberAct.length = 0;
        readInfoSistemas();
    }

    try {
        actualizarInfo();
    } catch (error) {

    }

    for (let i = 0; i < 9; i++) {
        var new_semestre = new Semestre();
        SEMESTRES_USER.push(new_semestre);
    }

    if (localStorage.getItem('carrera') == 'informatica') {
        createInitMateriasInformatica();
        addEventOpacity(5, 45);
    } else if (localStorage.getItem('carrera') == 'sistemas') {
        createInitMateriasSistemas();
        addEventOpacity(5, 15);
    }

    inac = setInterval(inactivo, 1000);

    document.getElementById('button-avatar').addEventListener('click',()=>{
        getE('popup-avatar').classList.toggle('show');
        if(!getE('button-avatar').classList.toggle('cerrar')){
            getE('button-avatar').innerHTML = 'Elige un Avatar';
        }else{
            document.getElementById('button-avatar').innerHTML = 'X';
        }
    });
    getE('span-cerrar').addEventListener('click',()=>{
        document.getElementById('avatar-elige').classList.toggle('hidden');
        if(getE('popup-avatar').classList.contains('show')) {
            getE('popup-avatar').classList.remove('show');
            getE('button-avatar').classList.remove('cerrar')
            getE('button-avatar').innerHTML = 'Elige un Avatar';
        }
    });
    document.getElementById('avatar-elige').addEventListener('mouseenter', ()=>{
        document.getElementById('avatar-elige').classList.remove('animation');
    });

    let parpadear = true;
    document.getElementById('avatar-elige').addEventListener('mouseleave',()=>{
        //verificar si el avatarPath sigue en default
        dataBase.child('z-usuarios').child(localStorage.getItem('carrera')).child(localStorage.getItem('usuario')).once('value')
        .then(
            (s)=>{
                let u = s.val();
                let ruta = u.avatarPath;
                if(ruta.includes('default') && parpadear) {
                    document.getElementById('avatar-elige').classList.add('animation');
                }
            }
        );
    });
    document.getElementById('popup-avatar').addEventListener('mouseleave',()=>{
        dataBase.child('z-usuarios').child(localStorage.getItem('carrera')).child(localStorage.getItem('usuario')).once('value')
        .then(
            (s)=>{
                let u = s.val();
                let ruta = u.avatarPath;
                if(ruta.includes('default')) {
                    document.getElementById('avatar-user').src = './assets/user-default.png';
                    document.getElementById('avatar-user').style.width = '53px';
                    document.getElementById('avatar-user').style.height = '53px';
                }else{
                    document.getElementById('avatar-user').src = ruta;
                    document.getElementById('avatar-user').style.width = '80px';
                    document.getElementById('avatar-user').style.height = '80px';
                }
            }
        );
    });

    getE('avatar-user').addEventListener('click',()=>{
        if(getE('avatar-elige').classList.contains('hidden')) {
            getE('avatar-elige').classList.remove('animation');
            getE('avatar-elige').classList.toggle('hidden');
            getE('span-cerrar').style.display = 'none';
            if(getE('popup-avatar').classList.contains('show')) {
                getE('popup-avatar').classList.remove('show');
                getE('button-avatar').classList.remove('cerrar');
                getE('button-avatar').innerHTML = 'Elige un Avatar';
            }
            parpadear = false;
        }else{
            if(getE('span-cerrar').style.display === 'none') {
                getE('avatar-elige').classList.toggle('hidden');
            }
        }
    });

    initAvatar(localStorage.getItem('carrera'), localStorage.getItem('usuario'));
}

function initAvatar(carrera, usuario) {
    for(let i=1; i<=10; i++) {
        let img = document.getElementById('avt'+i);
        img.addEventListener('click',()=>{
            //animar
            img.classList.toggle('click');
            //cambio en la base de datos y en la imagen
            dataBase.child('z-usuarios').child(carrera).child(usuario).update(
                {
                    'avatarPath' : corregirLinkAvatar(img.src)
                }
            );
            document.getElementById('avatar-user').src = img.src;
            if(window.screen.availWidth > 367) { 
                if(!img.src.includes('user-default')) {
                    document.getElementById('avatar-user').style.width = '80px';
                    document.getElementById('avatar-user').style.height = '80px';
                }else{
                    document.getElementById('avatar-user').style.width = '50px';
                    document.getElementById('avatar-user').style.height = '50px';
                }
            }else{
                if(!img.src.includes('user-default')) {
                    document.getElementById('avatar-user').style.width = '60px';
                    document.getElementById('avatar-user').style.height = '60px';
                }else{
                    document.getElementById('avatar-user').style.width = '37px';
                    document.getElementById('avatar-user').style.height = '37px';
                }
            }
            getE('popup-avatar').classList.remove('show');
            getE('button-avatar').classList.remove('cerrar');
            getE('button-avatar').innerHTML = 'Elige un Avatar';
            setTimeout(()=>{
                img.classList.toggle('click');
            }, 1000);
        });
        img.addEventListener('mouseenter',()=>{
            dataBase.child('z-usuarios').child(localStorage.getItem('carrera')).child(localStorage.getItem('usuario')).once('value')
            .then(
                (s)=>{
                    let u = s.val();
                    let ruta = u.avatarPath;
                    //if(ruta.includes('default')) {
                        document.getElementById('avatar-user').src = img.src;
                        if(!img.src.includes('user-default')) {
                            getE('avatar-user').style.width = '80px';
                            getE('avatar-user').style.height = '80px';      
                        }else{
                            getE('avatar-user').style.width = '50px';
                            getE('avatar-user').style.height = '50px';
                        }
                    //}
                }
            );
        });
    }
}

function getE(id) {
    return document.getElementById(id);
}

function corregirLinkAvatar(src) {
    let s = Array.from(src);
    s = './'+s.splice(29)
    s = s.replace(/,/g, "");
    return s;
}

window.addEventListener("load", init);




