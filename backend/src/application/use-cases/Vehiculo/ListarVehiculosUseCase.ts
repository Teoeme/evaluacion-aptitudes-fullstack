import { IVehiculoRepositorio } from "../../../domain/repositories/IVehiculoRepositorio";
import { Vehiculo } from "../../../domain/entities/Vehiculo";

export class ListarVehiculosUseCase {
  private readonly vehiculoRepositorio: IVehiculoRepositorio;

  constructor(deps: { vehiculoRepositorio: IVehiculoRepositorio }) {
    this.vehiculoRepositorio = deps.vehiculoRepositorio;
  }

  async execute(): Promise<Vehiculo[]> {
    return this.vehiculoRepositorio.listarTodos();
  }
}