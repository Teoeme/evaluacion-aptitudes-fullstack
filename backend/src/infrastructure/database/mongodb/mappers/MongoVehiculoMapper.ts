import { Vehiculo } from "../../../../domain/entities/Vehiculo";
import { ResponsableVehiculo } from "../../../../domain/value-objects/ResponsableVehiculo";
import { TipoResponsable, TiposResponsable } from "../../../../domain/value-objects/TipoResponsable";
import { TipoVehiculo } from "../../../../domain/value-objects/TipoVehiculo";
import { IVehiculoMongo } from "../models/Vehiculo";

export class MongoVehiculoMapper {

    static toPersistence(vehiculo:Vehiculo):Omit<IVehiculoMongo,'updatedAt'> {
        return {
            ...vehiculo,
            _id: vehiculo.id,
            responsable:{
                id: vehiculo.responsable.idOrNombre,
                tipo:vehiculo.responsable.tipo.getValue()
            },
            tipo:vehiculo.tipo.getValue()
        }
    }

    static toDomain(raw: IVehiculoMongo & { createdAt: Date }): Vehiculo {
        return new Vehiculo({
            id: raw._id,
            dominio: raw.dominio,
            marca: raw.marca,
            modelo: raw.modelo,
            tipo: new TipoVehiculo(raw.tipo),
            anoFabricacion: raw.anoFabricacion,
            kilometraje: raw.kilometraje,
            responsable: new ResponsableVehiculo(
                raw.responsable.id, 
                new TipoResponsable(raw.responsable.tipo)),
            activo:raw.activo
        });
    }
}