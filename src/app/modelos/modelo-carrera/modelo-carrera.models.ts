export class ModeloCarrera{
    constructor(
        public id?: number,
        public criterioid?: number,
        public criterio?: string,
        public periodoid?: number,
        public subcriterioid?: number,
        public indicadorid?: number,
        public elementofundamental?: string,
        public estado?: string,
    ) { 
        this.estado = '0';
    }
} 

