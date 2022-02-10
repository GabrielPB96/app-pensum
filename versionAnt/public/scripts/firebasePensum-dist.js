const firebaseConfig={apiKey:"AIzaSyD5WQba1pAYZz5Y4bPD5tu-63NvoQ87qtc",authDomain:"pensum-376eb.firebaseapp.com",databaseURL:"https://pensum-376eb-default-rtdb.firebaseio.com",projectId:"pensum-376eb",storageBucket:"pensum-376eb.appspot.com",messagingSenderId:"341853128640",appId:"1:341853128640:web:866a23a6275e2370deaa25",measurementId:"G-81DLD5QYCX"};firebase.initializeApp(firebaseConfig);const APROBADA="aprobada",CURSANDO="cursando",NO_TOMADA="no_tomada";var dataPensum,USER_CURRENT,pensumFactory,dataBase=firebase.database().ref(),LIST_USERS=new Map,SEMESTRES_USER=[];function leerUsers(){dataBase.child("z-usuarios").on("child_added",(e=>{var a=e.val(),r=[];for(let t in a)dataBase.child("z-usuarios").child(e.key).on("child_added",(e=>{r.push(e.val())}));LIST_USERS.set(e.key,r)}))}function write(e,a,r,t,A,s,O){var i={name:A,estadoActual:r,estadoAnterior:t,id:s};firebase.database().ref(a+"/"+e+"/"+O+"/"+s).set(i)}leerUsers();var stAct="no";function stateUpdate(e,a,r){var t;dataPensum.child(e).child(a).once("value").then((A=>{t=A.val().estadoActual;var s={estadoActual:r,estadoAnterior:t};dataPensum.child(e).child(a).update(s)}))}function crearPensumSistemas(e,a){}function crearPensumInformatica(e,a){write(e,a,NO_TOMADA,NO_TOMADA,"Álgebra 1","Algebra1","semestre1"),write(e,a,NO_TOMADA,NO_TOMADA,"Cálculo 1","Calculo1","semestre1"),write(e,a,NO_TOMADA,NO_TOMADA,"Fisica General","FisicaGeneral","semestre1"),write(e,a,NO_TOMADA,NO_TOMADA,"Ingles I","Ingles1","semestre1"),write(e,a,NO_TOMADA,NO_TOMADA,"Introducción a la Programación","IntroProgramacion","semestre1"),write(e,a,NO_TOMADA,NO_TOMADA,"Álgebra II","Algebra2","semestre2"),write(e,a,NO_TOMADA,NO_TOMADA,"Cálculo II","Calculo2","semestre2"),write(e,a,NO_TOMADA,NO_TOMADA,"Arquitectura de Computadoras I","ArquiComputadoras1","semestre2"),write(e,a,NO_TOMADA,NO_TOMADA,"Ingles II","Ingles2","semestre2"),write(e,a,NO_TOMADA,NO_TOMADA,"Elementos de Programación y Estructuras de Datos","Elementos","semestre2"),write(e,a,NO_TOMADA,NO_TOMADA,"Programación","Programacion","semestre2"),write(e,a,NO_TOMADA,NO_TOMADA,"Lógica","Logica","semestre3"),write(e,a,NO_TOMADA,NO_TOMADA,"Cálculo Numérico","CalculoNumerico","semestre3"),write(e,a,NO_TOMADA,NO_TOMADA,"Arquitectura de Computadoras II","ArquiComputadoras2","semestre3"),write(e,a,NO_TOMADA,NO_TOMADA,"Organización y Métodos","OrganizacionMetodos","semestre3"),write(e,a,NO_TOMADA,NO_TOMADA,"Métodos y Técnicas de Programación","MedTecnProgramacion","semestre3"),write(e,a,NO_TOMADA,NO_TOMADA,"Teoría de Grafos","Grafos","semestre3"),write(e,a,NO_TOMADA,NO_TOMADA,"Programación Funcional","PrograFuncional","semestre4"),write(e,a,NO_TOMADA,NO_TOMADA,"Probabilidad y Estadística","ProbEstadistica","semestre4"),write(e,a,NO_TOMADA,NO_TOMADA,"Taller de Programación en Bajo Nivel","TallerPrograBajoNivel","semestre4"),write(e,a,NO_TOMADA,NO_TOMADA,"Base de Datos I","BaseDatos1","semestre4"),write(e,a,NO_TOMADA,NO_TOMADA,"Sistemas de Información I","SisInformacion1","semestre4"),write(e,a,NO_TOMADA,NO_TOMADA,"Algoritmos Avanzados","Algoritmos","semestre4"),write(e,a,NO_TOMADA,NO_TOMADA,"Inteligencia Artificial I","IA1","semestre5"),write(e,a,NO_TOMADA,NO_TOMADA,"Taller de Sistemas Operativos","TallerSisOperativos","semestre5"),write(e,a,NO_TOMADA,NO_TOMADA,"Teoria de Autómatas y Lenguajes Formales","Automatas","semestre5"),write(e,a,NO_TOMADA,NO_TOMADA,"Base de Datos II","BaseDatos2","semestre5"),write(e,a,NO_TOMADA,NO_TOMADA,"Sistemas de Información II","SisInformacion2","semestre5"),write(e,a,NO_TOMADA,NO_TOMADA,"Graficación por Computadora","GrafComputadora","semestre5"),write(e,a,NO_TOMADA,NO_TOMADA,"Inteligencia Artificial II","IA2","semestre6"),write(e,a,NO_TOMADA,NO_TOMADA,"Redes de Computadoras","Redes","semestre6"),write(e,a,NO_TOMADA,NO_TOMADA,"Estructura y Semántica de Lenguajes de Programción","LenguajesProgramacion","semestre6"),write(e,a,NO_TOMADA,NO_TOMADA,"Taller de Base de Datos","TallerBaseDatos","semestre6"),write(e,a,NO_TOMADA,NO_TOMADA,"Ingeniería de Software","IngSoftware","semestre6"),write(e,a,NO_TOMADA,NO_TOMADA,"Programción Web","PrograWeb","semestre6"),write(e,a,NO_TOMADA,NO_TOMADA,"Interacción Humano Computadora","IntrHumanoCompu","semestre7"),write(e,a,NO_TOMADA,NO_TOMADA,"Tecnología de Redes Avanzadas","RedesAvanzadas","semestre7"),write(e,a,NO_TOMADA,NO_TOMADA,"Electiva I","Electiva1","semestre7"),write(e,a,NO_TOMADA,NO_TOMADA,"Electiva II","Electiva2","semestre7"),write(e,a,NO_TOMADA,NO_TOMADA,"Taller de Ingeniería de Software","TallerIngSoftware","semestre7"),write(e,a,NO_TOMADA,NO_TOMADA,"Arquitectura de Software","ArquiSoftware","semestre7"),write(e,a,NO_TOMADA,NO_TOMADA,"Electiva III","Electiva3","semestre8"),write(e,a,NO_TOMADA,NO_TOMADA,"Electiva IV","Electiva4","semestre8"),write(e,a,NO_TOMADA,NO_TOMADA,"Electiva V","Electiva5","semestre8"),write(e,a,NO_TOMADA,NO_TOMADA,"Electiva VI","Electiva6","semestre8"),write(e,a,NO_TOMADA,NO_TOMADA,"Taller de Grado I","TallerGrado1","semestre8"),write(e,a,NO_TOMADA,NO_TOMADA,"Evalución y Auditoria de Sistemas","EvalAudiSistemas","semestre8"),write(e,a,NO_TOMADA,NO_TOMADA,"Taller de Grado II","TallerGrado2","semestre8"),write(e,a,NO_TOMADA,NO_TOMADA,"Modalidad de Titulación","ModTitulacion","semestre9")}function crearFactory(e){"informatica"==e?pensumFactory=new PensumInformaticaFactory:"sistemas"==e&&(pensumFactory=new PensumSistemasFactory)}function crearMalla(e,a){crearFactory(a),pensumFactory.createPensum(e)}