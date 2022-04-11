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
        public contraseña?: string,
        public estado?: string
    ) { 
        this.estado = "0";
    }
} 
