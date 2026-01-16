import { Validacion } from "../../../../domain/entities/Validacion";
import { TipoVehiculo } from "../../../../domain/value-objects/TipoVehiculo";
import { IValidacionMongo } from "../models/Validacion";

export class MongoValidacionMapper {
  static toPersistence(validacion: Validacion): Omit<IValidacionMongo, "updatedAt"> {
    return {
      _id: validacion.id,
      nombre: validacion.nombre,
      activa: validacion.activa,
      relevancia: validacion.relevancia,
      obligatoria: validacion.obligatoria,
      tiposVehiculos: validacion.tiposVehiculos.map(t => t.getValue()),
      createdAt: validacion.createdAt,
    };
  }

  static toDomain(raw: IValidacionMongo & { createdAt: Date }): Validacion {
    return new Validacion({
      id: raw._id,
      nombre: raw.nombre,
      activa: raw.activa,
      relevancia: raw.relevancia,
      obligatoria: raw.obligatoria,
      tiposVehiculos: raw.tiposVehiculos.map(t => new TipoVehiculo(t)),
      createdAt: raw.createdAt,
    });
  }
}