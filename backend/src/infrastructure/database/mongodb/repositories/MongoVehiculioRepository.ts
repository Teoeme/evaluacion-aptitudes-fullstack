import { Vehiculo } from "../../../../domain/entities/Vehiculo";
import { IVehiculoRepositorio } from "../../../../domain/repositories/IVehiculoRepositorio";
import { MongoVehiculoMapper } from "../mappers/MongoVehiculoMapper";
import VehiculoModel from "../models/Vehiculo";

export class MongoVehiculoRepository implements IVehiculoRepositorio {
  async crear(vehiculo: Vehiculo): Promise<void> {
    const data = MongoVehiculoMapper.toPersistence(vehiculo);
    await VehiculoModel.create(data);
  }

  async buscarPorId(id: string): Promise<Vehiculo | null> {
    const doc = await VehiculoModel.findById(id);
    return doc ? MongoVehiculoMapper.toDomain(doc) : null;
  }

  async buscarPorDominio(dominio: string): Promise<Vehiculo | null> {
    const doc = await VehiculoModel.findOne({ dominio });
    return doc ? MongoVehiculoMapper.toDomain(doc) : null;
  }

  async listarTodos(): Promise<Vehiculo[]> {
    const docs = await VehiculoModel.find();
    return docs.map(doc => MongoVehiculoMapper.toDomain(doc));
  }

  async actualizar(vehiculo: Vehiculo): Promise<void> {
    const data = MongoVehiculoMapper.toPersistence(vehiculo) as any;
    const { _id, ...updateData } = data;
    await VehiculoModel.updateOne({ _id: vehiculo.id }, { $set: updateData });
  }

  async desactivar(id: string): Promise<void> {
    await VehiculoModel.updateOne({ _id: id }, { $set: { activo: false } });
  }
}