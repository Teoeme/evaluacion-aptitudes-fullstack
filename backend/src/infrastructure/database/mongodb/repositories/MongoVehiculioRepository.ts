import { Vehiculo } from "../../../../domain/entities/Vehiculo";
import { IVehiculoRepositorio } from "../../../../domain/repositories/IVehiculoRepositorio";

export class MongoVehiculoRepository implements IVehiculoRepositorio {
    buscarPorId(id: string): Promise<Vehiculo | null> {
        throw new Error("Method not implemented.");
    }
    buscarPorDominio(dominio: string): Promise<Vehiculo | null> {
        throw new Error("Method not implemented.");
    }
    listarTodos(): Promise<Vehiculo[]> {
        throw new Error("Method not implemented.");
    }
    crear(vehiculo: Vehiculo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    actualizar(vehiculo: Vehiculo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    desactivar(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}