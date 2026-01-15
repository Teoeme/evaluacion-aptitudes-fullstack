import { Ronda } from "../entities/Ronda";

export interface IRondaRepositorio {
    buscarPorId(id: string): Promise<Ronda | null>;
    listarPorConductor(conductorId: string): Promise<Ronda[]>;
    listarPorVehiculo(vehiculoId: string): Promise<Ronda[]>;
    listarPorFecha(fecha: Date): Promise<Ronda[]>;
    listarTodos(): Promise<Ronda[]>;

    guardar(ronda: Ronda): Promise<void>;
    actualizar(ronda: Ronda): Promise<void>;
}