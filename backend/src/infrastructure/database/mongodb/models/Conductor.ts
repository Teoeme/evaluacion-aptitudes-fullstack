import { InferSchemaType, Schema, model } from "mongoose";
import { EstadosConductor } from "../../../../domain/value-objects/EstadoConductor";

const LicenciaSchema = new Schema({
  categoria: { type: String, required: true },
  fechaVencimiento: { type: Date, required: true },
});

const ContactoSchema = new Schema({
  telefono: { type: String, required: false},
  email: { type: String, required: false },
});

const ConductorSchema = new Schema({
  _id: { type: String, required: true },
  nombreCompleto: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  licenciaConducir: { type: LicenciaSchema, required: true },
  contacto: { type: ContactoSchema, required: false },
  empresa: { type: String, required: true },
  estado: { type: String, enum: EstadosConductor, required: true },
  usuarioId: { type: String, required: true, ref: "Usuario" },
}, { timestamps: true });

export type IConductorMongo = InferSchemaType<typeof ConductorSchema>;

export default model("Conductor", ConductorSchema);