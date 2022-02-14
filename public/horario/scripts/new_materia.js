var materiasCreadas = new Map();
var materiasLeidas = new Map();

function crearMateria() {
    if(mobile) {
        let obMinC = document.getElementById('hora-init-celu');
        let aux = parseInt(obMinC.value);
        if(aux < 10) aux = '0' + aux;
        let minI = aux+''+(obMinC.value[obMinC.value.length-2]+obMinC.value[obMinC.value.length-1]);
        newMateria.setAttribute('id', minI + '-' + dia.value);
    }else{
        newMateria.setAttribute('id', minInit.innerHTML + minInit2.innerHTML + '-' + dia.value);
    }
    
    newMateria.style.backgroundColor = colorMateria.value;
    newMateria.innerHTML = materiaElegida.innerHTML;
    newMateria.classList.add('show');
    if(!mobile) {
        popup.classList.add('show');
    }
    if(mobile) {
        boton_agregar.classList.add('show');
    }
}

function agregarMateria() {
    let id = newMateria.getAttribute('id');
    newMateria.setAttribute('id', '');
    let box = document.getElementById(id);
    if (box.innerHTML != '') {
        /* box.style.backgroundColor = 'transparent';
        box.style.border = '2px solid red';
        box.style.color = 'red';   */  
        alert('Horario Ocupado');
    } else if(box.classList.contains('hidden')){
        alert('Horario Ocupado');
    }else {
        let cellsDelete = [];
        /* box.style.opacity = 0.7; */
        box.style.backgroundColor = newMateria.style.backgroundColor;
        box.style.border = '2px solid black';
        box.rowSpan = tamañoSpan();
        if (box.rowSpan > 1) {
            for (let i = 1; i < box.rowSpan; i++) {
                let parent = box.parentElement;
                let cellDelete = parent.parentElement.rows[parent.rowIndex + i].cells[box.cellIndex];
                cellsDelete.push(cellDelete.id);
                cellDelete.classList.add('hidden');
            }
        }

        let new_p = document.createElement('p');
        new_p.innerHTML = newMateria.textContent;
        let id_p = parseInt(Math.random() * 500)+salt(5);//agregar un salt!!!
        /* addPila({
            'id' : id_p,
            'cellsDelete' : cellsDelete
        }); */
        materiasCreadas.set(id, cellsDelete);
        /* mapCellsDeletes.set(id_p, cellsDelete); */
        /* box.setAttribute('cellsDeletes', cellsDelete); */
        new_p.setAttribute('className', newMateria.style.backgroundColor);
        new_p.setAttribute('id', id_p);
        box.appendChild(new_p);
        box.style.position = 'relative';
        newMateria.classList.remove('show');
        createPopup(box);
    }
}

function controlCreacionMateria() {
    let minI, minF;
    if(mobile) {
        let obMinC = document.getElementById('hora-init-celu');
        let obMinCF = document.getElementById('hora-fin-celu');
        let aux = parseInt(obMinC.value);
        if(aux < 10) aux = '0' + aux;
        minI = aux+''+(obMinC.value[obMinC.value.length-2]+obMinC.value[obMinC.value.length-1]);
        aux = parseInt(obMinCF.value);
        if(aux < 10) aux = '0' + aux;
        minF = aux+''+(obMinCF.value[obMinCF.value.length-2]+obMinCF.value[obMinCF.value.length-1]);
    }else{
        minI = minInit.innerHTML + minInit2.innerHTML;
        minF = minFin.innerHTML + minFin2.innerHTML;
    }
    
    return (materiaElegida.innerHTML != '') && (parseInt(minF) > parseInt(minI)) &&
        (document.getElementById(minI + '-' + dia.value) != null && document.getElementById(minF + '-' + dia.value) != null);
}

function activarGenerador() {
    if (controlCreacionMateria()) {
        boton_generar.disabled = false;
    } else boton_generar.disabled = true;
}

function tamañoSpan() {
    let cantSpan, minI, minF, dif;
    if(mobile){
        let obMinC = document.getElementById('hora-init-celu');
        let obMinCF = document.getElementById('hora-fin-celu');
        let aux = parseInt(obMinC.value);
        if(aux < 10) aux = '0' + aux;
        minI = aux+''+(obMinC.value[obMinC.value.length-2]+obMinC.value[obMinC.value.length-1]);
        aux = parseInt(obMinCF.value);
        if(aux < 10) aux = '0' + aux;
        minF = aux+''+(obMinCF.value[obMinCF.value.length-2]+obMinCF.value[obMinCF.value.length-1]);
    }else {
        minI = parseInt(minInit.innerHTML + minInit2.innerHTML);
        minF = parseInt(minFin.innerHTML + minFin2.innerHTML);
    }
    dif = ((parseInt(minF / 100)) * 60 + (minF % 100)) - ((parseInt(minI / 100)) * 60 + (minI % 100));
    cantSpan = dif / 45;
    return cantSpan; // cantSpan + 1;
}