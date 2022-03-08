export class Subcriterio {
    constructor(
        public id_subcriterio?: number,
        public subcriterio?: string,
        public estado?: string,
        public id_criterio?: number,
    ) { 
        this.estado = '1';
    }
} 