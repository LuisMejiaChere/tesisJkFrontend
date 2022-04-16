export class Usuario {
    constructor(
        public id?: string,
        public idpersona?: string,
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
        public rol?: string,
        
        // public idpersona: number,
        // public cedula: string,
        // public apellidopaterno: string,
        // public apellidomaterno: string,
        // public idusuario: number,
        // public idrol: number,
        // public rol: string,
        // public correo_personal: string

    ) { }
}