export class ModeloCarrera{
    constructor(
        public id_modelo?: any,
        public id_criterio?: any,
        public id_periodo?: any,
        public id_subcriterio?: any,
        public id_indicador?: any,
       
        public elemento_fundamental?: string,
        public documento?: any,
        public estado?: string,
    ) { 
        this.estado = '1';
    }
} 