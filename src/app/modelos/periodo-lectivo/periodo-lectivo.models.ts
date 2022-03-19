export class PeriodoLectivo{
    constructor(
        public id?: number,
        public periodo?: string,
        public estado?: any
    ) { 
        this.estado = 'false';
    }
} 