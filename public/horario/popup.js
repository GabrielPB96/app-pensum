var celda, celda2;

function crearPopup(celda) {
	console.log('crear popup');
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


	let botonDelete, botonCerrar;
	botonDelete = document.createElement("input");
	botonDelete.setAttribute("type", 'button');
	botonDelete.setAttribute("value", 'DELETE');

	/* botonCerrar = document.createElement("span");
	botonCerrar.innerHTML = 'X';
	botonCerrar.style.color = 'rgba(0, 0, 0, 0.3)';
	botonCerrar.style.alignSelf = 'flex-end';
	botonCerrar.addEventListener('mouseenter', () => {
		botonCerrar.style.color = 'rgba(0, 0, 0, 1)';
		botonCerrar.style.cursor = 'pointer';
	});
	botonCerrar.addEventListener('mouseleave', () => {
		botonCerrar.style.color = 'rgba(0, 0, 0, 0.3)';
	}); */
	/* botonCerrar.addEventListener('click', () => {
		botonCerrar.parentNode.classList.remove('show');
		controlPopup(botonCerrar.parentNode);
	}); */
	popup.addEventListener('mouseleave', ()=>{
		console.log('jijija');
		popup.classList.remove('show');
		controlPopup(popup);
	});

	/* popup.appendChild(botonCerrar); */
	popup.appendChild(botonDelete);

	controlPopup(popup);

	celda.appendChild(popup);
	console.log('fin creacion popup');
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
		//if (e.target.getAttribute('id') == celda.getAttribute('id')) {
			celda.childNodes[1].classList.add('show');
			controlPopup(celda.childNodes[1]);
		//}
	});
}

function createPopupReadHorario(celda) {
	celda.addEventListener('click', (e) => {
		//if (e.target.getAttribute('id') == celda.getAttribute('id')) {
			celda.childNodes[1].classList.add('show');
			controlPopup(celda.childNodes[1]);
		//}
		celda.childNodes[1].addEventListener('mouseleave', ()=>{
			console.log('jijija');
			celda.childNodes[1].classList.remove('show');
			controlPopup(celda.childNodes[1]);
		});
	});
}