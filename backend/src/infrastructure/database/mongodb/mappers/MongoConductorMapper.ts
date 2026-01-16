import { Conductor } from "../../../../domain/entities/Conductor";
import { EstadoConductor } from "../../../../domain/value-objects/EstadoConductor";
import { Email } from "../../../../domain/value-objects/Email";
import { IConductorMongo } from "../models/Conductor";

export class MongoConductorMapper {
  static toPersistence(conductor: Conductor): Omit<IConductorMongo, "updatedAt"> {
    return {
      _id: conductor.id,
      nombreCompleto: conductor.nombreCompleto,
      dni: conductor.dni,
      licenciaConducir: conductor.licenciaConducir,
      contacto: conductor.contacto
        ? {
            telefono: conductor.contacto.telefono ?? null,
            email: conductor.contacto.email?.getValue() ?? null,
          }
        : null,
      empresa: conductor.empresa,
      estado: conductor.estado.getValue() ,
      usuarioId: conductor.usuarioId,
      createdAt: conductor.createdAt,
    };
  }

  static toDomain(raw: IConductorMongo & { createdAt: Date }): Conductor {
    return new Conductor({
      id: raw._id,
      nombreCompleto: raw.nombreCompleto,
      dni: raw.dni,
      licenciaConducir: raw.licenciaConducir,
      contacto: raw.contacto
        ? {
            telefono: raw.contacto.telefono ?? undefined,
            email: raw.contacto.email ? new Email(raw.contacto.email) : undefined,
          }
        : undefined,
      empresa: raw.empresa,
      estado: new EstadoConductor(raw.estado),
      usuarioId: raw.usuarioId,
      createdAt: raw.createdAt,
    });
  }
}