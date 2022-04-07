export class Subcriterio {
    constructor(
        public id?: number,
        public subcriterio?: string,
        public estado?: string,
        public criterioid?: number,
        public criterio?: string,
    ) { 
        this.estado = '0';
    }
} 