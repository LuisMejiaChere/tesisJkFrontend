export class PeriodoLectivo{
    constructor(
        public id_periodo?: number,
        public periodo?: string,
        public estado?: string
    ) { 
        this.estado = '1';
    }
} 