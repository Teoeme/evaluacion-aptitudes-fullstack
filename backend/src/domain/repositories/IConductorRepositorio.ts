import { Conductor } from "../entities/Conductor";

export interface IConductorRepositorio {
    buscarPorId(id: string): Promise<Conductor | null>;
    buscarPorUsuarioId(usuarioId: string): Promise<Conductor | null>;
    listarTodos(): Promise<Conductor[]>;

    guardar(conductor: Conductor): Promise<void>;
    actualizar(conductor: Conductor): Promise<void>;
    desactivar(id: string): Promise<void>;
}