var celda, celda2;

function crearBotonCerrar() {
	let botonCerrar;
	botonCerrar = document.createElement("span");
	botonCerrar.innerHTML = 'X';
	botonCerrar.style.position = 'absolute';
	botonCerrar.style.top = '1px';
	botonCerrar.style.right = '2px';
	botonCerrar.style.color = 'rgba(0, 0, 0, 0.3)';
	botonCerrar.style.alignSelf = 'flex-end';
	botonCerrar.addEventListener('mouseenter', () => {
		botonCerrar.style.color = 'rgba(0, 0, 0, 1)';
		botonCerrar.style.cursor = 'pointer';
	});
	botonCerrar.addEventListener('mouseleave', () => {
		botonCerrar.style.color = 'rgba(0, 0, 0, 0.3)';
	});
	botonCerrar.addEventListener('click', () => {
		botonCerrar.parentNode.classList.remove('show');
		controlPopup(botonCerrar.parentNode);
	});
	return botonCerrar;
}

function crearBotonDelete(parent) {
	let botonDelete;
	botonDelete = document.createElement("input");
	botonDelete.setAttribute("type", 'button');
	botonDelete.setAttribute("value", 'DELETE');
	botonDelete.style.marginTop = '2px';
	botonDelete.style.cursor = 'pointer';

	botonDelete.addEventListener('click', () => {
		let celda = parent.parentNode;
		if (materiasCreadas.get(celda.id) != undefined) {
			let objts = materiasCreadas.get(celda.id);
			for (let i of objts) {
				document.getElementById(i).classList.remove('hidden');
			}
			materiasCreadas.delete(celda.id);
		} else if (materiasLeidas.get(celda.id) != undefined) {
			let objts = materiasCreadas.get(celda.id);
			for (let i of objts) {
				document.getElementById(i).classList.remove('hidden');
			}
			materiasLeidas.delete(celda.id);
		}
		celda.innerHTML = "";
		celda.rowSpan = 1;
		celda.style.backgroundColor = 'transparent';
	});
	return botonDelete;
}

function crearInputColor(parent, color) {
	let colorH = convertHexadecimal(obtenerValoresRGB(color));
	let changeColor, label, botonCambiar;
	changeColor = document.createElement('input');
	changeColor.setAttribute('type', 'color');
	changeColor.setAttribute('id', 'changeColor');
	changeColor.style.height = '20px';
	changeColor.style.width = '20px';
	changeColor.style.border = 0;
	changeColor.value = colorH;

	botonCambiar = document.createElement('input');
	botonCambiar.setAttribute('type', 'button');
	botonCambiar.setAttribute('value', 'cambiar');
	botonCambiar.style.cursor = 'pointer';

	botonCambiar.addEventListener('click', ()=>{
		parent.parentNode.style.backgroundColor = changeColor.value;
	});

	label = document.createElement('label');
	label.innerHTML = 'Color: ';
	label.style.color = 'black';
	label.style.marginTop = '10px';
	label.setAttribute('from', 'changeColor');
	label.appendChild(changeColor);
	label.appendChild(document.createElement('br'));
	label.appendChild(botonCambiar);
	return label;
}

function crearPopup(celda) {
	let popup = document.createElement("div");
	popup.setAttribute("id", 'popup-' + celda.id);
	popup.style.position = 'absolute';
	popup.style.zIndex = 100;
	popup.style.borderRadius = '5px';
	popup.style.left = '10px';
	popup.style.top = '20px';
	popup.style.padding = '10px';
	popup.style.backgroundColor = 'rgb(123, 123, 123)';
	popup.style.display = 'none';

	celda.appendChild(popup);

	let botonDelete, botonCerrar, inputColor;

	botonDelete = crearBotonDelete(popup);
	botonCerrar = crearBotonCerrar();
	inputColor = crearInputColor(popup, celda.style.backgroundColor);

	popup.addEventListener('mouseleave', () => {
		popup.classList.remove('show');
		controlPopup(popup);
	});

	popup.appendChild(botonCerrar);
	popup.appendChild(inputColor);
	popup.appendChild(botonDelete);

	controlPopup(popup);
}

function controlPopup(popup) {
	if (popup.classList.contains('show')) {
		popup.style.display = 'flex';
		popup.style.flexDirection = 'column';
	} else {
		popup.style.display = 'none';
	}
}

function createPopup(celda) {
	crearPopup(celda);
	celda.addEventListener('click', (e) => {
		try {
			if (e.target.style.position != 'absolute') {
				celda.childNodes[1].classList.add('show');
				controlPopup(celda.childNodes[1]);
			}
		} catch (e) {

		}
	});
}

function createPopupReadHorario(celda) {
	celda.addEventListener('click', (e) => {
		try {
			if (e.target.style.position != 'absolute') {
				celda.childNodes[1].classList.add('show');
				controlPopup(celda.childNodes[1]);
			}
		} catch (e) { }
	});

	celda.childNodes[1].addEventListener('mouseleave', () => {
		celda.childNodes[1].classList.remove('show');
		controlPopup(celda.childNodes[1]);
	});

	celda.childNodes[1].childNodes[0].addEventListener('click', () => {
		celda.childNodes[1].classList.remove('show');
		controlPopup(celda.childNodes[1]);
	});



	celda.childNodes[1].childNodes[0].addEventListener('mouseenter', () => {
		celda.childNodes[1].childNodes[0].style.color = 'rgba(0, 0, 0, 1)';
		celda.childNodes[1].childNodes[0].style.cursor = 'pointer';
	});
	celda.childNodes[1].childNodes[0].addEventListener('mouseleave', () => {
		celda.childNodes[1].childNodes[0].style.color = 'rgba(0, 0, 0, 0.3)';
	});

	celda.childNodes[1].childNodes[2].addEventListener('click', () => {
		if (materiasCreadas.get(celda.id) != undefined) {
			let objts = materiasCreadas.get(celda.id);
			for (let i of objts) {
				document.getElementById(i).classList.remove('hidden');
			}
			materiasCreadas.delete(celda.id);
		} else if (materiasLeidas.get(celda.id) != undefined) {
			let objts = materiasLeidas.get(celda.id);
			for (let i of objts) {
				document.getElementById(i).classList.remove('hidden');
			}
			materiasLeidas.delete(celda.id);
		}
		celda.innerHTML = "";
		celda.rowSpan = 1;
		celda.style.backgroundColor = 'transparent';
	});

	celda.childNodes[1].childNodes[1].childNodes[3].addEventListener('click', ()=>{
		celda.style.backgroundColor = changeColor.value;
	});
}

function convertHexadecimal(colores) {
	let red = colores[0];
	let green = colores[1];
	let blue = colores[2];
	return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}

function obtenerValoresRGB(color) {
	let valores = [];
	let value = '';
	for (let i = 0; i < color.length; i++) {
		if (color[i] >= '0' && color[i] <= '9') {
			value += color[i];
		} else if (color[i] == ',' || i == color.length - 1) {
			valores.push(parseInt(value));
			value = '';
		}
	}
	return valores;
}

function ColorToHex(color) {
	var hexadecimal = color.toString(16);
	return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}