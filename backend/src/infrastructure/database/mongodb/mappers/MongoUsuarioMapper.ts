import { Usuario } from "../../../../domain/entities/Usuario";
import { Email } from "../../../../domain/value-objects/Email";
import { RolUsuario } from "../../../../domain/value-objects/RolUsuario";
import { IUsuarioMongo } from "../models/Usuario";

export class MongoUsuarioMapper {
   
    static toPersistence(usuario: Usuario): Omit<IUsuarioMongo,'updatedAt'> {
        return {
            _id: usuario.id,
            nombreCompleto: usuario.nombreCompleto,
            dni: usuario.dni,
            rol: usuario.rol.getValue(),
            area: usuario.area || null,
            email: usuario.email.getValue(),
            password: usuario.password,
            createdAt:usuario.createdAt
        };
    }

    
    static toDomain(raw: IUsuarioMongo & { createdAt: Date }): Usuario {
        return new Usuario({
            id: raw._id,
            nombreCompleto: raw.nombreCompleto,
            dni: raw.dni,
            rol: new RolUsuario(raw.rol),
            area: raw.area || undefined,
            email: new Email(raw.email),
            password: raw.password,
            createdAt: raw.createdAt
        });
    }
}