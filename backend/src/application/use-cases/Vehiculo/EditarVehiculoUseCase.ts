import { IVehiculoRepositorio } from "../../../domain/repositories/IVehiculoRepositorio";
import { ResourceAlreadyExistsError, ResourceNotFoundError } from "../../../domain/errors/BaseErrors";
import { Vehiculo } from "../../../domain/entities/Vehiculo";
import { TipoVehiculo } from "../../../domain/value-objects/TipoVehiculo";
import { ResponsableVehiculo } from "../../../domain/value-objects/ResponsableVehiculo";
import { TipoResponsable } from "../../../domain/value-objects/TipoResponsable";
import { EditarVehiculoDto } from "../../dtos/Vehiculo/EditarVehiculoDto";

export class EditarVehiculoUseCase {
  private readonly vehiculoRepositorio: IVehiculoRepositorio;

  constructor(deps: { vehiculoRepositorio: IVehiculoRepositorio }) {
    this.vehiculoRepositorio = deps.vehiculoRepositorio;
  }

  async execute(dto: EditarVehiculoDto): Promise<Vehiculo> {
    const actual = await this.vehiculoRepositorio.buscarPorId(dto.id);
    if (!actual) {
      throw new ResourceNotFoundError("Vehiculo", dto.id);
    }

    if (dto.dominio) {
      const dominioExistente = await this.vehiculoRepositorio.buscarPorDominio(dto.dominio);
      if (dominioExistente && dominioExistente.id !== dto.id) {
        throw new ResourceAlreadyExistsError("Vehiculo", "dominio", dto.dominio);
      }
    }

    const vehiculoActualizado = new Vehiculo({
        id: actual.id,
        dominio: dto.dominio ?? actual.dominio,
        marca: dto.marca ?? actual.marca,
        modelo: dto.modelo ?? actual.modelo,
        tipo: dto.tipo ? new TipoVehiculo(dto.tipo) : actual.tipo,
        anoFabricacion: dto.anoFabricacion ?? actual.anoFabricacion,
        kilometraje: dto.kilometraje ?? actual.kilometraje,
        responsable: dto.responsable
          ? new ResponsableVehiculo(dto.responsable.id, new TipoResponsable(dto.responsable.tipo))
          : actual.responsable,
        activo: actual.activo, // La activación o desactivación se realiza en otro caso de uso
        createdAt: actual.createdAt,
      });

    await this.vehiculoRepositorio.actualizar(vehiculoActualizado);

    return vehiculoActualizado;
  }
}