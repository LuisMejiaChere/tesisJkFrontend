export class Evidencia {
    constructor(
        public id?: string,
        public modeloid?: string,
        public documento?: any,
        public estado?: string
    ) { 
        this.estado = "0";
    }
} 