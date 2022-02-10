var pilaEdicion = [];

var minInit, botonMinInitS, botonMinInitB, containerMinInit;
var minInit2, botonMinInitS2, botonMinInitB2, containerMinInit2;

var minFin, botonMinFinS, botonMinFinB, containerMinFin;
var minFin2, botonMinFinS2, botonMinFinB2, containerMinFin2;

var botonMaterias, menuSemestres, containersMaterias;

var boton_editar, boton_guardar, boton_generar, boton_back;

var containerEdicion;

var materiaElegida;

var materias;
var colorMateria;

var popup, horario, dia;

function addPila(id_element) {
    if (pilaEdicion.length < 3) {
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
            parent_remove.style.color = 'black';
            parent_remove.style.backgroundColor = parent_remove.childNodes[parent_remove.childNodes.length - 1].getAttribute('className');
        } else if (parent_remove.childNodes.length == 0) {
            parent_remove.style.backgroundColor = 'transparent';
            parent_remove.style.border = '2px solid black';
            parent_remove.style.color = 'black';
            parent_remove.rowSpan = 1;
            habilitarCeldasBorradas(object.cellsDelete);
        }

        if (pilaEdicion.length == 0) {
            boton_back.disabled = true;
        }
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

    materias = document.getElementsByClassName('list-sem');

    colorMateria = document.getElementById('color');

    newMateria = document.getElementById('new_materia');

    popup = document.getElementById('popup');
    horario = document.getElementById('horario');
    dia = document.getElementById('dia-select');

    boton_back = document.getElementById('btn-back');
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
        containerMinInit.childNodes[3].classList.add('focus');
    });

    containerMinInit.addEventListener('mouseleave', () => {
        if (minInit.classList.contains('tope')) {
            minInit.classList.remove('tope');
        }
        containerMinInit.childNodes[3].classList.remove('focus');
    });

    containerMinInit2.addEventListener('mouseenter', () => {
        containerMinInit2.childNodes[3].classList.add('focus');
    });

    containerMinInit2.addEventListener('mouseleave', () => {
        if (minInit2.classList.contains('tope')) {
            minInit2.classList.remove('tope');
        }
        containerMinInit2.childNodes[3].classList.remove('focus');
    });

    addEvent(botonMinInitS, minInit, 1, 21, 6, 1);
    addEvent(botonMinInitB, minInit, -1, 21, 6, 1);

    addEvent(botonMinInitS2, minInit2, 1, 45, 0, 15);
    addEvent(botonMinInitB2, minInit2, -1, 45, 0, 15);
}

function addEventHora() {
    /***************************************************/
    containerMinFin.addEventListener('mouseenter', () => {
        containerMinFin.childNodes[3].classList.add('focus');
    });

    containerMinFin.addEventListener('mouseleave', () => {
        if (minFin.classList.contains('tope')) {
            minFin.classList.remove('tope');
        }
        containerMinFin.childNodes[3].classList.remove('focus');
    });

    containerMinFin2.addEventListener('mouseenter', () => {
        containerMinFin2.childNodes[3].classList.add('focus');
    });

    containerMinFin2.addEventListener('mouseleave', () => {
        if (minFin2.classList.contains('tope')) {
            minFin2.classList.remove('tope');
        }
        containerMinFin2.childNodes[3].classList.remove('focus');
    });

    addEvent(botonMinFinS, minFin, 1, 21, 6, 1);
    addEvent(botonMinFinB, minFin, -1, 21, 6, 1);

    addEvent(botonMinFinS2, minFin2, 1, 45, 0, 15);
    addEvent(botonMinFinB2, minFin2, -1, 45, 0, 15);
    /*****************************************************/
}

function init() {
    /* if (Modernizr.draganddrop) {
        soportaDragAndDrop = false;
    } */

    initNodos();

    addEven1();

    addEventHora();

    addEventNameMaterias();

    boton_back.addEventListener('click', volverPaso);

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
        boton_editar.classList.add('hidden');
        containerEdicion.classList.add('show');
        boton_guardar.classList.add('show');
    });

    boton_guardar.addEventListener('click', () => {
        boton_editar.classList.remove('hidden');
        containerEdicion.classList.remove('show');
        boton_guardar.classList.remove('show');
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
        
        if(pilaEdicion.length == 0) {
            boton_back.disabled = false;
        }

        agregarMateria();
    });

    colorMateria.addEventListener('input', activarGenerador);
}

function crearMateria() {
    newMateria.setAttribute('id', minInit.innerHTML + minInit2.innerHTML + '-' + dia.value);
    newMateria.style.backgroundColor = colorMateria.value;
    newMateria.innerHTML = materiaElegida.innerHTML;
    newMateria.classList.add('show');
    popup.classList.add('show');
}

function agregarMateria() {
    let id = newMateria.getAttribute('id');
    newMateria.setAttribute('id', '');
    let box = document.getElementById(id);
    if (box.innerHTML != '' || box.classList.contains('hidden')) {
        /*  box.style.backgroundColor = 'transparent';
         box.style.border = '2px solid red';
         box.style.color = 'red'; */
        alert('Horario Ocupado');
    } else {
        let cellsDelete = [];
        box.style.opacity = 0.7;
        box.style.backgroundColor = newMateria.style.backgroundColor;
        box.style.border = '2px solid black';
        box.rowSpan = tamañoSpan();
        if (box.rowSpan > 1) {
            for (let i = 1; i < box.rowSpan; i++) {
                let parent = box.parentElement;
                let cellDelete = parent.parentElement.rows[parent.rowIndex + i].cells[box.cellIndex];
                cellsDelete.push(cellDelete);
                cellDelete.classList.add('hidden');
            }
        }

        let new_p = document.createElement('p');
        new_p.innerHTML = newMateria.textContent;
        let id_p = parseInt(Math.random() * 500);//agregar un salt!!!
        addPila({
            'id' : id_p,
            'cellsDelete' : cellsDelete
        });
        new_p.setAttribute('className', newMateria.style.backgroundColor);
        new_p.setAttribute('id', id_p);
        box.appendChild(new_p);
        newMateria.classList.remove('show');
        //console.log(pilaEdicion);
    }
}

function controlCreacionMateria() {
    let minI = minInit.innerHTML + minInit2.innerHTML;
    let minF = minFin.innerHTML + minFin2.innerHTML;
    return (materiaElegida.innerHTML != '') && (parseInt(minF) > parseInt(minI)) &&
        (document.getElementById(minI + '-' + dia.value) != null && document.getElementById(minF + '-' + dia.value) != null);
}

function activarGenerador() {
    if (controlCreacionMateria()) {
        boton_generar.disabled = false;
    } else boton_generar.disabled = true;
}

function tamañoSpan() {
    let minI = parseInt(minInit.innerHTML + minInit2.innerHTML);
    let minF = parseInt(minFin.innerHTML + minFin2.innerHTML);
    let dif = ((parseInt(minF / 100)) * 60 + (minF % 100)) - ((parseInt(minI / 100)) * 60 + (minI % 100));
    let cantSpan = dif / 45;
    return cantSpan + 1;
}



var newMateria;

window.addEventListener('load', init);