import { IValidacionRepositorio } from "../../../domain/repositories/IValidacionRepositorio";

export class ListarValidacionesUseCase {
  private readonly validacionRepositorio: IValidacionRepositorio
  constructor(dependencias: { validacionRepositorio: IValidacionRepositorio }) {
    this.validacionRepositorio = dependencias.validacionRepositorio;
  }
  async execute() {
    return this.validacionRepositorio.listarTodos();
  }
}