import { InferSchemaType, Schema, model } from "mongoose";
import { TiposVehiculo } from "../../../../domain/value-objects/TipoVehiculo";

const ValidacionSchema = new Schema({
  _id: { type: String, required: true },
  nombre: { type: String, required: true },
  activa: { type: Boolean, required: true },
  relevancia: { type: Number, required: true },
  obligatoria: { type: Boolean, required: true },
  tiposVehiculos: { type: [String], enum: TiposVehiculo, required: true },
}, { timestamps: true });

export type IValidacionMongo = InferSchemaType<typeof ValidacionSchema>;

export default model("Validacion", ValidacionSchema);