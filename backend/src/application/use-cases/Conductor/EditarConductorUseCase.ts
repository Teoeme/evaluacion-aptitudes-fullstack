import { IConductorRepositorio } from "../../../domain/repositories/IConductorRepositorio";
import { ResourceNotFoundError } from "../../../domain/errors/BaseErrors";
import { Conductor } from "../../../domain/entities/Conductor";
import { Email } from "../../../domain/value-objects/Email";
import { EditarConductorDto } from "../../dtos/Conductor/EditarConductorDto";

export class EditarConductorUseCase {
private readonly conductorRepositorio: IConductorRepositorio

  constructor(dependencias:{ conductorRepositorio: IConductorRepositorio }) {
    this.conductorRepositorio = dependencias.conductorRepositorio;
  }

  async execute(dto: EditarConductorDto) {
    const actual = await this.conductorRepositorio.buscarPorId(dto.id);
    if (!actual) throw new ResourceNotFoundError("Conductor", dto.id);

    const actualizado = new Conductor({
      id: actual.id,
      nombreCompleto: dto.nombreCompleto ?? actual.nombreCompleto,
      dni: dto.dni ?? actual.dni,
      licenciaConducir: dto.licenciaConducir ?? actual.licenciaConducir,
      contacto: dto.contacto
        ? {
            telefono: dto.contacto.telefono,
            email: dto.contacto.email ? new Email(dto.contacto.email) : undefined,
          }
        : actual.contacto,
      empresa: dto.empresa ?? actual.empresa,
      estado: actual.estado,
      usuarioId: actual.usuarioId,
      createdAt: actual.createdAt,
    });

    await this.conductorRepositorio.actualizar(actualizado);
    return actualizado;
  }
}