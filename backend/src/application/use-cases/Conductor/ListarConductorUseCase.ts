import { IConductorRepositorio } from "../../../domain/repositories/IConductorRepositorio";

export class ListarConductoresUseCase {
    private readonly conductorRepositorio: IConductorRepositorio
  constructor(dependencias:{ conductorRepositorio: IConductorRepositorio }) {
    this.conductorRepositorio = dependencias.conductorRepositorio;
  }

  async execute() {
    return this.conductorRepositorio.listarTodos();
  }
}