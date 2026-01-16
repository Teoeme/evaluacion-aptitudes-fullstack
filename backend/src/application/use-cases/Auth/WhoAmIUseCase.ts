import { UnauthorizedError } from "../../../domain/errors/BaseErrors";
import { IUsuarioRepositorio } from "../../../domain/repositories/IUsuarioRepositorio";
import { UsuarioMapper } from "../../dtos/Usuario/UsuarioMapper";

export class WhoAmIUseCase {
    private readonly usuarioRepositorio: IUsuarioRepositorio;

    constructor(dependencias: {
        usuarioRepositorio: IUsuarioRepositorio;
    }) {
        this.usuarioRepositorio = dependencias.usuarioRepositorio;
    }

    async execute(userId: string) {
        const usuario = await this.usuarioRepositorio.buscarPorId(userId);
        
        if (!usuario) {
            throw new UnauthorizedError('Usuario no encontrado');
        }

        return UsuarioMapper.toDto(usuario);
    }
}