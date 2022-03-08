export class Usuario {
    constructor(
        public idpersona: number,
        public cedula: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public idusuario: number,
        public idrol: number,
        public rol: string,
        public correo_personal: string

    ) { }
}