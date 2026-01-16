import { IVehiculoRepositorio } from "../../../domain/repositories/IVehiculoRepositorio";
import { ResourceNotFoundError } from "../../../domain/errors/BaseErrors";
import { IdRequeridoDto } from "../../dtos/IdRequeridoDto";

export class DesactivarVehiculoUseCase {
  private readonly vehiculoRepositorio: IVehiculoRepositorio;

  constructor(deps: { vehiculoRepositorio: IVehiculoRepositorio }) {
    this.vehiculoRepositorio = deps.vehiculoRepositorio;
  }

  async execute(dto: IdRequeridoDto): Promise<void> {
    const existente = await this.vehiculoRepositorio.buscarPorId(dto.id);
    if (!existente) {
      throw new ResourceNotFoundError("Vehiculo", dto.id);
    }
    await this.vehiculoRepositorio.desactivar(dto.id);
  }
}