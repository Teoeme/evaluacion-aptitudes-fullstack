import { IValidacionRepositorio } from "../../../../domain/repositories/IValidacionRepositorio";
import { Validacion } from "../../../../domain/entities/Validacion";
import ValidacionModel from "../models/Validacion";
import VehiculoModel from "../models/Vehiculo";
import { MongoValidacionMapper } from "../mappers/MongoValidacionMapper";
import { ResourceNotFoundError } from "../../../../domain/errors/BaseErrors";

export class MongoValidacionRepository implements IValidacionRepositorio {
  async guardar(validacion: Validacion): Promise<void> {
    await ValidacionModel.create(MongoValidacionMapper.toPersistence(validacion));
  }

  async buscarPorId(id: string): Promise<Validacion | null> {
    const doc = await ValidacionModel.findById(id);
    return doc ? MongoValidacionMapper.toDomain(doc) : null;
  }

  async listarTodos(): Promise<Validacion[]> {
    const docs = await ValidacionModel.find();
    return docs.map(d => MongoValidacionMapper.toDomain(d));
  }

  async actualizar(validacion: Validacion): Promise<void> {
    const data = MongoValidacionMapper.toPersistence(validacion) as any;
    const { _id, ...update } = data;
    await ValidacionModel.updateOne({ _id: validacion.id }, { $set: update });
  }

  async desactivar(id: string): Promise<void> {
    await ValidacionModel.updateOne({ _id: id }, { $set: { activa: false } });
  }

  async listarActivasPorVehiculo(vehiculoId: string): Promise<Validacion[]> {
    const vehiculo = await VehiculoModel.findById(vehiculoId);
    if (!vehiculo) throw new ResourceNotFoundError("Vehiculo", vehiculoId);

    const docs = await ValidacionModel.find({
      activa: true,
      tiposVehiculos: { $in: [vehiculo.tipo] }
    });
    return docs.map(d => MongoValidacionMapper.toDomain(d));
  }
}