export class Evaluador {
    constructor(
        public id?: string,
        public nombres?: string,
        public apellidopaterno?: string,
        public apellidomaterno?: string,
        public cedula?: string,
        public celular?: string,
        public correo?: string,
        public direccion?: string,
        public password?: string,
        public estado?: string,
        public rolid?:string,
        
    ) { 
        this.estado = "0";
    }
} 
