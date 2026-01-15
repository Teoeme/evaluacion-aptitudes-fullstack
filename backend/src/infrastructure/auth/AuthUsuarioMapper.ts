import { UsuarioAutenticado } from "../../types/express";
import { Usuario } from "../../domain/entities/Usuario";

export class AuthUsuarioMapper {

    static toUsuarioAutenticado(usuario: Usuario): UsuarioAutenticado {
        return {
            id: usuario.id,
            email: usuario.email.getValue(),
            rol: usuario.rol,
        }
    }

}