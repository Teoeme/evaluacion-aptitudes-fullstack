import { Usuario } from "../../../domain/entities/Usuario";

export interface UsuarioResponseDto {
    id: string;
    nombreCompleto: string;
    email: string;
    rol: string;
    area?: string | undefined;
    createdAt: Date;
}

export class UsuarioMapper {
    static toDto(usuario: Usuario): UsuarioResponseDto {
        return {
            id: usuario.id,
            nombreCompleto: usuario.nombreCompleto,
            email: usuario.email.getValue(),
            rol: usuario.rol.getValue(),
            area: usuario.area,
            createdAt: usuario.createdAt || new Date()
        };
    }
}