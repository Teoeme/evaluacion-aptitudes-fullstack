import { Ronda } from "../../../../domain/entities/Ronda";
import { ItemValidacionRonda } from "../../../../domain/value-objects/ItemValidacionRonda";
import { EstadoRonda } from "../../../../domain/value-objects/EstadoRonda";
import { IRondaMongo } from "../models/Ronda";

type RondaPersistence = Omit<IRondaMongo, "validaciones" | "updatedAt" | "createdAt"> & {
    validaciones: Array<{
      validacionId: string;
      nombre: string;
      relevancia: number;
      obligatoria: boolean;
      cumplida: boolean;
      observaciones?: string | undefined;
    }>;
  };
  

export class MongoRondaMapper {
  static toPersistence(ronda: Ronda): RondaPersistence {
    return {
      _id: ronda.id,
      fechaHora: ronda.fechaHora,
      kilometraje: ronda.kilometraje,
      vehiculoId: ronda.vehiculoId,
      conductorId: ronda.conductorId,
      observaciones: ronda.observaciones ?? null,
      validaciones: ronda.validaciones?.map(v => ({
        validacionId: v.validacionId,
        nombre: v.nombre,
        relevancia: v.relevancia,
        obligatoria: v.obligatoria,
        cumplida: v.cumplida,
        observaciones: v.observaciones 
      })),
      cumplimiento: ronda.cumplimiento,
      estado: ronda.estado.getValue(),
      firmaDigital: ronda.firmaDigital.getValue()
  }}

  static toDomain(raw: IRondaMongo & { createdAt: Date }): Ronda {
    return new Ronda({
      id: raw._id,
      fechaHora: raw.fechaHora,
      kilometraje: raw.kilometraje,
      vehiculoId: raw.vehiculoId,
      conductorId: raw.conductorId,
      observaciones: raw.observaciones ?? undefined,
      validaciones: raw.validaciones.map(v => new ItemValidacionRonda({
        validacionId: v.validacionId,
        nombre: v.nombre,
        relevancia: v.relevancia,
        obligatoria: v.obligatoria,
        cumplida: v.cumplida,
        observaciones: v.observaciones ?? undefined
      })),
      cumplimiento: raw.cumplimiento,
      estado: new EstadoRonda(raw.estado),
      firmaDigital: raw.firmaDigital as any,
      createdAt: raw.createdAt,
    });
  }
}