class PensumSistemasFactory extends PensumFactory{
    constructor() {
        super('sistemas');
    }

    createPensum(usuario) {
        //PRIMER SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Ingles I', 'Ingles1', 'semestre1');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Fisica General', 'FisicaGeneral', 'semestre1');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Álgebra 1', 'Algebra1', 'semestre1');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Cálculo 1', 'Calculo1', 'semestre1');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Introducción a la Programación', 'IntroProgramacion', 'semestre1');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Metodología de la Investigación', 'MetodoliaInv', 'semestre1');

        //SEGUNDO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Álgebra II', 'Algebra2', 'semestre2');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Cálculo II', 'Calculo2', 'semestre2');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Arquitectura de Computadoras I', 'ArquiComputadoras1', 'semestre2');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Matemática Discreta', 'MatDiscreta', 'semestre2');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Elementos de Programación y Estructuras de Datos', 'Elementos', 'semestre2');

        //TERCER SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Estadística I', 'Estadistica1', 'semestre3');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Ecuaciones Diferenciales', 'Ecuas', 'semestre3');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Cálculo Numérico', 'CalculoNumerico', 'semestre3');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Métodos, Técnicas y Taller de Programación', 'MedTecnProgramacion', 'semestre3');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Base de Datos I', 'BaseDatos1', 'semestre3');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Circuitos Electrónicos', 'Circuitos', 'semestre3');

        //CUARTO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Estadística II', 'Estadistica2', 'semestre4');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Investigación Operativa I', 'IO1', 'semestre4');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Contabilidad Básica', 'Contabilidad', 'semestre4');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Sistemas de Información I', 'SisInformacion1', 'semestre4');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Base de Datos II', 'BaseDatos2', 'semestre4');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Taller de Sistemas Operativos', 'TallerSisOperativos', 'semestre4');

        //QUINTO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Sistemas de Información II', 'SisInformacion2', 'semestre5');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Ingles II', 'Ingles2', 'semestre5');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Aplicación de Sistemas Operativos', 'Aso', 'semestre5');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Taller de Base de Datos', 'TallerBaseDatos', 'semestre5');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Sistemas I', 'Sistemas1', 'semestre5');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Investigación Operativa II', 'IO2', 'semestre5');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Mercadotecnia', 'Mercadotecnia', 'semestre5');

        //SEXTO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Simulación de Sistemas', 'SimulacionS', 'semestre6');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Ingeniería de Software', 'IngSoftware', 'semestre6');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Redes de Computadoras', 'Redes', 'semestre6');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Inteligencia Artificial I', 'IA1', 'semestre6');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Base de Datos Distribuidas', 'BaseDatosDist', 'semestre6');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Sistemas II', 'Sistemas2', 'semestre6');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Sistemas Económicos', 'SistemasEco', 'semestre6');

        //SEPTIMO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Planifiación y Evalución de Proyectos', 'PlaEvaPro', 'semestre7');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Dinámica de Sistemas', 'DinamicaSistemas', 'semestre7');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Tópicos Selectos I', 'TopicSelec1', 'semestre7');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Taller de Ingeniería de Software', 'TallerIngSoftware', 'semestre7');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Gestión de Calidad de Software', 'GestCalSof', 'semestre7');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Redes Avanzadas de Computadoras', 'RedesAvanCompu', 'semestre7');

        //OCTAVO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Gestión Estratégica de Empresas', 'GestEstrEmp', 'semestre8');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Taller de Simulación de Sistemas', 'TallSimuSis', 'semestre8');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Tópicos Selectos I', 'TopicSelec1', 'semestre7');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Metodología y Planificación de Proyecto de Grado', 'MetPlaProGra', 'semestre8');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Evalución y Auditoría de Sistemas', 'EvalAudiSistemas', 'semestre8');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Seguridad de Sistemas', 'SegSis', 'semestre8');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Ingles III', 'Ingles3', 'semestre8');

        //NOVENO SEMESTRE
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Tópicos Selectos III', 'TopicSelec3', 'semestre9');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Tópicos Selectos IV', 'TopicSelec4', 'semestre9');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Práctica Empresarial', 'PracEmp', 'semestre9');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Proyecto Final', 'ProFinal', 'semestre9');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Tópicos Selectos V', 'TopicSelec5', 'semestre9');
        write(usuario, this.name, NO_TOMADA, NO_TOMADA, 'Tópicos Selectos VI', 'TopicSelec6', 'semestre9');

    }
}