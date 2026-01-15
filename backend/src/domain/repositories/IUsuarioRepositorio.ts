import { Usuario } from "../entities/Usuario";
import { Email } from "../value-objects/Email";

export interface IUsuarioRepositorio {
    buscarPorId(id: string): Promise<Usuario | null>;
    buscarPorEmail(email: Email): Promise<Usuario | null>;
    buscarPorDni(dni: string): Promise<Usuario | null>;
    listarTodos(): Promise<Usuario[]>;

    guardar(usuario: Usuario): Promise<void>;
    actualizar(usuario: Usuario): Promise<void>;
}