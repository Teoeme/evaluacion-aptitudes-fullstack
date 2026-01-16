import { IValidacionRepositorio } from "../../../domain/repositories/IValidacionRepositorio";
import { ResourceNotFoundError } from "../../../domain/errors/BaseErrors";
import { Validacion } from "../../../domain/entities/Validacion";
import { TipoVehiculo } from "../../../domain/value-objects/TipoVehiculo";
import { EditarValidacionDto } from "../../dtos/Validacion/EditarValidacionDto";

export class EditarValidacionUseCase {
  private readonly validacionRepositorio: IValidacionRepositorio
  constructor(dependencias: { validacionRepositorio: IValidacionRepositorio }) {
    this.validacionRepositorio = dependencias.validacionRepositorio;
  }

  async execute(dto: EditarValidacionDto) {
    const actual = await this.validacionRepositorio.buscarPorId(dto.id);
    if (!actual) throw new ResourceNotFoundError("Validacion", dto.id);

    const actualizada = new Validacion({
      id: actual.id,
      nombre: dto.nombre ?? actual.nombre,
      activa: dto.activa ?? actual.activa,
      relevancia: dto.relevancia ?? actual.relevancia,
      obligatoria: dto.obligatoria ?? actual.obligatoria,
      tiposVehiculos: dto.tiposVehiculos
        ? dto.tiposVehiculos.map(t => new TipoVehiculo(t))
        : actual.tiposVehiculos,
      createdAt: actual.createdAt,
    });

    await this.validacionRepositorio.actualizar(actualizada);
    return actualizada;
  }
}