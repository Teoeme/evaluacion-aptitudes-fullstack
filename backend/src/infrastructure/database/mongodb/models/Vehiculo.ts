import { InferSchemaType, Schema } from "mongoose";
import { TiposVehiculo } from "../../../../domain/value-objects/TipoVehiculo";
import { TiposResponsable } from "../../../../domain/value-objects/TipoResponsable";

const ResponsableSchema = new Schema({
    id: { type: String, required: true },
    tipo: { type: String, enum: TiposResponsable, required: true },
});

const VehiculoSchema = new Schema({
    _id: { type: String, required: true },
    dominio: { type: String, required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    tipo: { type: String, enum: TiposVehiculo, required: true },
    anoFabricacion: { type: Number, required: true },
    kilometraje: { type: Number, required: true },
    responsable: { type: ResponsableSchema, required: true },
    activo: { type: Boolean, required: true },
}, { timestamps: true });

export type IVehiculoMongo = InferSchemaType<typeof VehiculoSchema>;