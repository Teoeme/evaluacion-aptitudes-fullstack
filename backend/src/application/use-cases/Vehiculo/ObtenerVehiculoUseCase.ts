import { IVehiculoRepositorio } from "../../../domain/repositories/IVehiculoRepositorio";
import { ResourceNotFoundError } from "../../../domain/errors/BaseErrors";
import { Vehiculo } from "../../../domain/entities/Vehiculo";
import { IdRequeridoDto } from "../../dtos/IdRequeridoDto";

export class ObtenerVehiculoUseCase {
  private readonly vehiculoRepositorio: IVehiculoRepositorio;

  constructor(deps: { vehiculoRepositorio: IVehiculoRepositorio }) {
    this.vehiculoRepositorio = deps.vehiculoRepositorio;
  }

  async execute(dto: IdRequeridoDto): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepositorio.buscarPorId(dto.id);
    if (!vehiculo) {
      throw new ResourceNotFoundError("Vehiculo", dto.id);
    }
    return vehiculo;
  }
}