export class Indicador {
  constructor(
    public id_indicador?: number,
    public indicador?: string,
    public id_tipo?: number,
    public descripcion?: string,
    public estado?: string
  ) {
    this.estado = '1';
  }
}
