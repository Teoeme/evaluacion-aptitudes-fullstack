import { InferSchemaType, model, Schema } from "mongoose";

const UsuarioSchema = new Schema({
    _id: { type: String, required: true },
    nombreCompleto: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    rol: { type: String, required: true },
    area: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true});

export type IUsuarioMongo=InferSchemaType<typeof UsuarioSchema>

export default model('Usuario', UsuarioSchema);

