import { Vehiculo } from "../entities/Vehiculo";

export interface IVehiculoRepositorio {
    buscarPorId(id: string): Promise<Vehiculo | null>;
    buscarPorDominio(dominio: string): Promise<Vehiculo | null>;
    listarTodos(): Promise<Vehiculo[]>;

    guardar(vehiculo: Vehiculo): Promise<void>;
    actualizar(vehiculo: Vehiculo): Promise<void>;
    desactivar(id: string): Promise<void>;
}