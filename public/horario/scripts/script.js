var pilaEdicion = [];
var HORARIO = [];

var minInit, botonMinInitS, botonMinInitB, containerMinInit;
var minInit2, botonMinInitS2, botonMinInitB2, containerMinInit2;

var minFin, botonMinFinS, botonMinFinB, containerMinFin;
var minFin2, botonMinFinS2, botonMinFinB2, containerMinFin2;

var botonMaterias, menuSemestres, containersMaterias;

var boton_editar, boton_guardar, boton_generar, boton_back, boton_agregar;

var containerEdicion;

var materiaElegida;

var materias;
var colorMateria;

var popup, horario, dia;

var mobile;

var mapCellsDeletes = new Map();

function addPila(id_element) {
    if (pilaEdicion.length < 3) {
        pilaEdicion.push(id_element);
    }else{
        pilaEdicion.shift();
        pilaEdicion.push(id_element);
    }
}

function volverPaso() {
    if (pilaEdicion.length > 0) {
        let object = pilaEdicion.pop()
        let id_remove = object.id;
        let child_remove = document.getElementById(id_remove);
        let parent_remove = child_remove.parentElement;
        parent_remove.removeChild(child_remove);
        if (parent_remove.childNodes.length == 1) {
            parent_remove.style.border = '2px solid black';
            parent_remove.style.color = 'white';
            parent_remove.style.backgroundColor = parent_remove.childNodes[parent_remove.childNodes.length - 1].getAttribute('className');
        } else if (parent_remove.childNodes.length == 0) {
            parent_remove.style.backgroundColor = 'transparent';
            parent_remove.style.border = '2px solid black';
            parent_remove.style.color = 'white';
            parent_remove.rowSpan = 1;
            habilitarCeldasBorradas(object.cellsDelete);
        }

        /* if (pilaEdicion.length == 0) {
            boton_back.disabled = true;
        } */
    }
}

function habilitarCeldasBorradas(cellsHabilitar) {
    for (let i of cellsHabilitar) {
        i.classList.remove('hidden');
    }
}

function actualizar(value, d, limiteA, limiteB, step) {
    let valor = value.innerHTML;
    let valorAnt;
    /* if (valor == '00') {
        valor = 0;
    } else {
        valor = parseInt(valor);
    } */

    valor = parseInt(valor);

    valorAnt = valor;

    if (d == 1) {
        valor = (valor != limiteA) ? valor += step : valor;
    } else {
        valor = (valor != limiteB) ? valor -= step : limiteB;
    }

    if (valorAnt == valor) {
        value.classList.add('tope');
    } else {
        value.classList.remove('tope');
    }

    if (valor < 10) valor = '0' + valor;

    value.innerHTML = '' + valor;
}

function addEvent(nodo, value, d, limitA, limitB, step) {
    nodo.addEventListener('click', () => {
        actualizar(value, d, limitA, limitB, step);
        activarGenerador();
        nodo.classList.add('click');
        nodo.childNodes[1].classList.add('click');
        setTimeout(() => {
            nodo.classList.remove('click');
            nodo.childNodes[1].classList.remove('click');
        }, 100);
    });
}

function initNodos() {
    minInit = document.getElementById('value-min-init');
    botonMinInitS = document.getElementById('subirButton');
    botonMinInitB = document.getElementById('bajarButton');
    containerMinInit = document.getElementById('containerMinInit');

    minInit2 = document.getElementById('value-min-init-2');
    botonMinInitS2 = document.getElementById('subirButton2');
    botonMinInitB2 = document.getElementById('bajarButton2');
    containerMinInit2 = document.getElementById('containerMinInit2');

    minFin = document.getElementById('value-min-fin');
    botonMinFinS = document.getElementById('subirButtonFin');
    botonMinFinB = document.getElementById('bajarButtonFin');
    containerMinFin = document.getElementById('containerMinFin');

    minFin2 = document.getElementById('value-min-fin-2');
    botonMinFinS2 = document.getElementById('subirButtonFin2');
    botonMinFinB2 = document.getElementById('bajarButtonFin2');
    containerMinFin2 = document.getElementById('containerMinFin2');

    botonMaterias = document.getElementById('btn-materia');
    menuSemestres = document.getElementById('menu-semestres');
    containersMaterias = document.getElementById('materia');

    boton_editar = document.getElementById('btn-editar');
    boton_guardar = document.getElementById('btn-guardar');
    boton_generar = document.getElementById('generar');

    containerEdicion = document.getElementById('container-opciones');

    materiaElegida = document.getElementById('materia-elegida');
    materiaElegida.style.fontWeight = 'bold';

    materias = document.getElementsByClassName('list-sem');

    colorMateria = document.getElementById('color');

    newMateria = document.getElementById('new_materia');

    popup = document.getElementById('popup');
    horario = document.getElementById('horario');
    dia = document.getElementById('dia-select');

    boton_back = document.getElementById('btn-back');

    boton_agregar = document.getElementById('btn-agregar');
}

function addEventNameMaterias() {
    for (let i = 0; i < 9; i++) {
        let childs = materias[i].childNodes;
        for (let j = 1; j < childs.length; j += 2) {
            childs[j].addEventListener('click', () => {
                materiaElegida.innerHTML = childs[j].getAttribute('id');
                activarGenerador();
            });
        }
    }
}

function addEven1() {
    containerMinInit.addEventListener('mouseenter', () => {
        if(!mobile) {
            containerMinInit.childNodes[3].classList.add('focus');
        }
    });

    containerMinInit.addEventListener('mouseleave', () => {
        if (minInit.classList.contains('tope')) {
            minInit.classList.remove('tope');
        }
        if(!mobile) {
            containerMinInit.childNodes[3].classList.remove('focus');
        }
    });

    containerMinInit2.addEventListener('mouseenter', () => {
        if(!mobile) {
            containerMinInit2.childNodes[3].classList.add('focus');
        }
    });

    containerMinInit2.addEventListener('mouseleave', () => {
        if (minInit2.classList.contains('tope')) {
            minInit2.classList.remove('tope');
        }
        if(!mobile) {
            containerMinInit2.childNodes[3].classList.remove('focus');
        }
    });

    addEvent(botonMinInitS, minInit, 1, 21, 6, 1);
    addEvent(botonMinInitB, minInit, -1, 21, 6, 1);

    addEvent(botonMinInitS2, minInit2, 1, 45, 0, 15);
    addEvent(botonMinInitB2, minInit2, -1, 45, 0, 15);
}

function addEventHora() {
    /***************************************************/
    containerMinFin.addEventListener('mouseenter', () => {
        if(!mobile) {
            containerMinFin.childNodes[3].classList.add('focus');
        }
    });

    containerMinFin.addEventListener('mouseleave', () => {
        if (minFin.classList.contains('tope')) {
            minFin.classList.remove('tope');
        }
        if(!mobile) {
            containerMinFin.childNodes[3].classList.remove('focus');
        }
    });

    containerMinFin2.addEventListener('mouseenter', () => {
        if(!mobile) {
            containerMinFin2.childNodes[3].classList.add('focus');
        }
    });

    containerMinFin2.addEventListener('mouseleave', () => {
        if (minFin2.classList.contains('tope')) {
            minFin2.classList.remove('tope');
        }
        if(!mobile) {
            containerMinFin2.childNodes[3].classList.remove('focus');
        }
    });

    addEvent(botonMinFinS, minFin, 1, 21, 6, 1);
    addEvent(botonMinFinB, minFin, -1, 21, 6, 1);

    addEvent(botonMinFinS2, minFin2, 1, 45, 0, 15);
    addEvent(botonMinFinB2, minFin2, -1, 45, 0, 15);
    /*****************************************************/
}

function init() {
    readHorario();
    if(isMobile()) {
        mobile = true;
    }else {
        mobile = false;
    }

    initNodos();

    addEven1();

    addEventHora();

    addEventNameMaterias();

    /* boton_back.addEventListener('click', volverPaso); */

    botonMaterias.addEventListener('click', () => {
        botonMaterias.classList.add('click');
        setTimeout(() => {
            botonMaterias.classList.remove('click');
            if (!menuSemestres.classList.contains('show')) {
                botonMaterias.classList.add('borders');
                menuSemestres.classList.add('show');
            } else {
                menuSemestres.classList.remove('show');
                botonMaterias.classList.remove('borders');
            }
        }, 100);
    });

    containersMaterias.addEventListener('mouseleave', () => {
        if (menuSemestres.classList.contains('show')) {
            menuSemestres.classList.remove('show');
            botonMaterias.classList.remove('borders');
        }
    });

    for (let i = 1; i <= 9; i++) {
        let obj = document.getElementById('span' + i);
        let parentObj = obj.parentNode;
        obj.addEventListener('click', () => {
            if (parentObj.childNodes[3].classList.contains('show')) {
                parentObj.childNodes[3].classList.remove('show')
            } else {
                parentObj.childNodes[3].classList.add('show');
            }
        });
    }

    boton_editar.addEventListener('click', () => {
        /* boton_editar.classList.add('hidden'); */
        if(boton_editar.childNodes[0].classList.contains('hidden')) {
            boton_editar.childNodes[0].classList.remove('hidden');
            boton_editar.childNodes[2].classList.remove('show');
            containerEdicion.classList.remove('show');
            boton_guardar.classList.remove('show');
        }else{
            boton_editar.childNodes[0].classList.add('hidden');
            boton_editar.childNodes[2].classList.add('show');
            containerEdicion.classList.add('show');
            boton_guardar.classList.add('show');
        }
    });

    boton_guardar.addEventListener('click', () => {
        boton_editar.classList.remove('hidden');
        containerEdicion.classList.remove('show');
        boton_guardar.classList.remove('show');
        guardarEstadoHorario();
        boton_editar.childNodes[0].classList.remove('hidden');
        boton_editar.childNodes[2].classList.remove('show');
    });

    boton_generar.addEventListener('click', crearMateria);

    newMateria.addEventListener('dragstart', (e) => {
        /* if (e.cancelable) {
            e.preventDefault();
        } */
        /*  popup.classList.add('show'); */
    });

    newMateria.addEventListener('dragend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        popup.classList.remove('show');
    });

    newMateria.addEventListener('dragend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        popup.classList.remove('show');
    });

    popup.addEventListener('dragover', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
    }, false);

    popup.addEventListener('drop', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        
        /* if(pilaEdicion.length == 0) {
            boton_back.disabled = false;
        } */

        agregarMateria();
    });

    colorMateria.addEventListener('input', activarGenerador);

    boton_agregar.addEventListener('click', ()=>{
        /* if(pilaEdicion.length == 0) {
            boton_back.disabled = false;
        } */
        agregarMateria();
        boton_agregar.classList.remove('show');
    });

    if(mobile) {
        containerMinInit.childNodes[3].classList.add('focus');
        containerMinInit2.childNodes[3].classList.add('focus');
        containerMinFin.childNodes[3].classList.add('focus');
        containerMinFin2.childNodes[3].classList.add('focus');
        document.getElementById('hora-init-celu').classList.add('show');
        document.getElementById('hora-init-celu').addEventListener('change', activarGenerador);
        document.getElementById('hora-fin-celu').classList.add('show');
        document.getElementById('hora-fin-celu').addEventListener('change', activarGenerador);
        document.getElementById('hora-de').classList.add('hidden');
        document.getElementById('hora-hasta').classList.add('hidden');
    }
}

function isMobile() {
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i))   ||
        (navigator.userAgent.match(/iPhone/i))  ||
        (navigator.userAgent.match(/iPod/i))    ||
        (navigator.userAgent.match(/iPad/i))    ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
}

function guardarEstadoHorario() {
    console.log(materiasCreadas);
    HORARIO = []
    let USUARIO = localStorage.getItem('usuario');
    let CARRERA =   localStorage.getItem('carrera');
    console.log(USUARIO);
    console.log(CARRERA);
    let filas = Array.from(horario.children[1].children);
    filas.shift();
    for(let f of filas) {
        let celdas = Array.from(f.cells);
        celdas.shift();
        for(let c of celdas) {
            if(c.innerText != "" || c.classList.contains('hidden')){
                let celdas_borradas = '';
                if(materiasCreadas.get(c.getAttribute('id')) != undefined) {
                    celdas_borradas = materiasCreadas.get(c.getAttribute('id'));
                }
                let clase = '';
                if(c.classList.contains('hidden')){
                    clase = 'hidden';
                }
                let obH = {
                    'id' : c.id,
                    'innerHTML' : c.innerHTML,
                    'rowSpan' : c.rowSpan,
                    'class' : clase,
                    'color' : c.style.backgroundColor,
                    'cellsDeletes' : celdas_borradas
                };
                HORARIO.push(obH);
            }
        }
    }
    
    dataBase.child('z-usuarios').child(CARRERA).child(USUARIO).update({
        'Horario' : HORARIO
    });
}

function readHorario() {
    let USUARIO = localStorage.getItem('usuario');
    let CARRERA =   localStorage.getItem('carrera');
    dataBase.child('z-usuarios').child(CARRERA).child(USUARIO).on('value', 
        function(s){
            try{
                var hor = s.val().Horario;
                for(let i of hor) {
                    let cel = document.getElementById(i.id);
                    cel.innerHTML = i.innerHTML;
                    cel.style.backgroundColor = i.color;
                    if(i.class != '') {
                        cel.classList.add(i.class);
                    }else{
                        createPopupReadHorario(cel);
                        materiasLeidas.set(i.id, i.cellsDeletes);
                    }
                    cel.rowSpan = i.rowSpan;
                    cel.style.position = 'relative';
                }
            }catch(e){
                console.log('not found');
            }
        }
    )
}

var newMateria;



window.addEventListener('load', init);