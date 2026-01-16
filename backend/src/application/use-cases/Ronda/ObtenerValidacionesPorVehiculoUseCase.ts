import { IVehiculoRepositorio } from "../../../domain/repositories/IVehiculoRepositorio";
import { IValidacionRepositorio } from "../../../domain/repositories/IValidacionRepositorio";
import { ResourceNotFoundError } from "../../../domain/errors/BaseErrors";
import { IdRequeridoDto } from "../../dtos/IdRequeridoDto";

export class ObtenerValidacionesPorVehiculoUseCase {
  private readonly vehiculoRepositorio: IVehiculoRepositorio;
  private readonly validacionRepositorio: IValidacionRepositorio;
  constructor(
    dependencias: {
      vehiculoRepositorio: IVehiculoRepositorio,
      validacionRepositorio: IValidacionRepositorio
    }
  ) {
    this.vehiculoRepositorio = dependencias.vehiculoRepositorio;
    this.validacionRepositorio = dependencias.validacionRepositorio;
  }

  async execute(dto: IdRequeridoDto) {
    const vehiculo = await this.vehiculoRepositorio.buscarPorId(dto.id);
    if (!vehiculo) throw new ResourceNotFoundError("Vehiculo", dto.id);

    const validaciones = await this.validacionRepositorio.listarActivasPorVehiculo(vehiculo.id);
    return validaciones;
  }
}