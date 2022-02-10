class PensumSistemasFactory extends PensumFactory{
    constructor() {
        super('sistemas');
    }

    createPensum(usuario) {
        //PRIMER SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Álgebra 1', 'Algebra1', 'semestre1');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Cálculo 1', 'Calculo1', 'semestre1');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Fisica General', 'FisicaGeneral', 'semestre1');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Ingles I', 'Ingles1', 'semestre1');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Introducción a la Programación', 'IntroProgramacion', 'semestre1');
        //write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Metodología de la Investigación', 'MetodoliaInv', 'semestre1');

        //SEGUNDO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Álgebra II', 'Algebra2', 'semestre2');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Cálculo II', 'Calculo2', 'semestre2');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Arquitectura de Computadoras I', 'ArquiComputadoras1', 'semestre2');
        //write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Matemática Discreta', 'MatDiscreta', 'semestre2');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Elementos de Programación y Estructuras de Datos', 'Elementos', 'semestre2');

        //TERCER SEMESTRE+
        //write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Estadística I', 'Estadistica1', 'semestre3');
        //write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Ecuaciones Diferenciales', 'Ecuas', 'semestre3');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Cálculo Numérico', 'CalculoNumerico', 'semestre3');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Métodos, Técnicas y Taller de Programación', 'MedTecnProgramacion', 'semestre3');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Base de Datos I', 'BaseDatos1', 'semestre3');
        //write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Circuitos Electrónicos', 'Circuitos', 'semestre3');

        //CUARTO SEMESTRE
        //write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Estadística II', 'Estadistica2', 'semestre4');
        //write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Investigación Operativa I', 'IO1', 'semestre4');
        //write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Contabilidad Básica', 'Contabilidad', 'semestre4');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Sistemas de Información I', 'SisInformacion1', 'semestre4');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Base de Datos II', 'BaseDatos2', 'semestre4');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Taller de Sistemas Operativos', 'TallerSisOperativos', 'semestre4');

        /*//QUINTO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Inteligencia Artificial I', 'IA1', 'semestre5');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Sistemas de Información II', 'SisInformacion2', 'semestre5');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Ingles II', 'Ingles2', 'semestre5');

        //SEXTO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Inteligencia Artificial II', 'IA2', 'semestre6');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Redes de Computadoras', 'Redes', 'semestre6');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Estructura y Semántica de Lenguajes de Programción', 'LenguajesProgramacion', 'semestre6');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Taller de Base de Datos', 'TallerBaseDatos', 'semestre6');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Ingeniería de Software', 'IngSoftware', 'semestre6');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Programción Web', 'PrograWeb', 'semestre6');

        //SEPTIMO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Interacción Humano Computadora', 'IntrHumanoCompu', 'semestre7');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Tecnología de Redes Avanzadas', 'RedesAvanzadas', 'semestre7');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Electiva I', 'Electiva1', 'semestre7');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Electiva II', 'Electiva2', 'semestre7');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Taller de Ingeniería de Software', 'TallerIngSoftware', 'semestre7');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Arquitectura de Software', 'ArquiSoftware', 'semestre7');

        //OCTAVO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Electiva III', 'Electiva3', 'semestre8');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Electiva IV', 'Electiva4', 'semestre8');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Electiva V', 'Electiva5', 'semestre8');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Electiva VI', 'Electiva6', 'semestre8');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Taller de Grado I', 'TallerGrado1', 'semestre8');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Evalución y Auditoria de Sistemas', 'EvalAudiSistemas', 'semestre8');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Taller de Grado II', 'TallerGrado2', 'semestre8');

        //NOVENO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Modalidad de Titulación', 'ModTitulacion', 'semestre9');*/
    }
}