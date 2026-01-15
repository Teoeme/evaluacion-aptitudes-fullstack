import { Validacion } from "../entities/Validacion";

export interface IValidacionRepositorio {
    buscarPorId(id: string): Promise<Validacion | null>;
    listarTodos(): Promise<Validacion[]>;

    guardar(validacion: Validacion): Promise<void>;
    actualizar(validacion: Validacion): Promise<void>;
    desactivar(id: string): Promise<void>;
}