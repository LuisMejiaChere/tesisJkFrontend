export class Indicador {
  constructor(
    public id?: number,
    public indicador?: string,
    public tipoid?: number,
    public descripcion?: string,
    public estado?: string
  ) {
    this.estado = '0';
  }
}
