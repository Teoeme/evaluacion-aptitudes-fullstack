import { IUsuarioRepositorio } from "../../../../domain/repositories/IUsuarioRepositorio";
import { Usuario } from "../../../../domain/entities/Usuario";
import { Email } from "../../../../domain/value-objects/Email";
import { MongoUsuarioMapper } from "../mappers/MongoUsuarioMapper";
import UsuarioModel from '../models/Usuario'

export class MongoUsuarioRepository implements IUsuarioRepositorio {
    async guardar(usuario: Usuario): Promise<void> {
        const usuarioData=MongoUsuarioMapper.toPersistence(usuario)
        await UsuarioModel.create(usuarioData)
    }

    async buscarPorId(id: string): Promise<Usuario | null> {
        const usuarioPorId=await UsuarioModel.findById(id)
        return usuarioPorId ? MongoUsuarioMapper.toDomain(usuarioPorId) : null
    }

    async listarTodos(): Promise<Usuario[]> {
        throw new Error("Method not implemented.");
    }

    async buscarPorDni(dni: string): Promise<Usuario | null> {
        try {
            const usuarioPorDni=await UsuarioModel.findOne({dni})
            return usuarioPorDni ? MongoUsuarioMapper.toDomain(usuarioPorDni) : null
            
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async buscarPorEmail(email: Email): Promise<Usuario | null> {
        const usuarioPorEmail=await UsuarioModel.findOne({email:email.getValue()})
        return usuarioPorEmail ? MongoUsuarioMapper.toDomain(usuarioPorEmail) : null
    }
    
    async actualizar(usuario: Usuario): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async eliminar(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async obtenerPorId(id: string): Promise<Usuario | null> {
        throw new Error("Method not implemented.");
    }
    async obtenerTodos(): Promise<Usuario[]> {
        throw new Error("Method not implemented.");
    }
}