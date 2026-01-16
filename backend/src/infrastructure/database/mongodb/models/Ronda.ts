import { InferSchemaType, Schema, model } from "mongoose";

const ItemValidacionSchema = new Schema({
  validacionId: { type: String, required: true, ref: "Validacion" },
  nombre: { type: String, required: true },
  relevancia: { type: Number, required: true },
  obligatoria: { type: Boolean, required: true },
  cumplida: { type: Boolean, required: true },
  observaciones: { type: String, required: false },
});

const RondaSchema = new Schema({
  _id: { type: String, required: true },
  fechaHora: { type: Date, required: true },
  kilometraje: { type: Number, required: true },
  vehiculoId: { type: String, required: true, ref: "Vehiculo" },
  conductorId: { type: String, required: true, ref: "Conductor" },
  observaciones: { type: String, required: false },
  validaciones: { type: [ItemValidacionSchema], required: true },
  cumplimiento: { type: Number, required: true },
  estado: { type: String, required: true },
  firmaDigital: { type: String, required: true },
}, { timestamps: true });

export type IRondaMongo = InferSchemaType<typeof RondaSchema>;

export default model("Ronda", RondaSchema);