import { IRondaRepositorio } from "../../../../domain/repositories/IRondaRepositorio";
import { Ronda } from "../../../../domain/entities/Ronda";
import RondaModel from "../models/Ronda";
import { MongoRondaMapper } from "../mappers/MongoRondaMapper";

export class MongoRondaRepository implements IRondaRepositorio {
  async guardar(ronda: Ronda): Promise<void> {
    await RondaModel.create(MongoRondaMapper.toPersistence(ronda));
  }

  async buscarPorId(id: string): Promise<Ronda | null> {
    const doc = await RondaModel.findById(id);
    return doc ? MongoRondaMapper.toDomain(doc) : null;
  }

  async listarPorConductor(conductorId: string): Promise<Ronda[]> {
    const docs = await RondaModel.find({ conductorId });
    return docs.map(d => MongoRondaMapper.toDomain(d));
  }

  async listarPorVehiculo(vehiculoId: string): Promise<Ronda[]> {
    const docs = await RondaModel.find({ vehiculoId });
    return docs.map(d => MongoRondaMapper.toDomain(d));
  }

  async listarPorFecha(fecha: Date): Promise<Ronda[]> {
    const start = new Date(fecha); start.setHours(0,0,0,0);
    const end = new Date(fecha); end.setHours(23,59,59,999);
    const docs = await RondaModel.find({ fechaHora: { $gte: start, $lte: end } });
    return docs.map(d => MongoRondaMapper.toDomain(d));
  }

  async listarTodos(): Promise<Ronda[]> {
    const docs = await RondaModel.find();
    return docs.map(d => MongoRondaMapper.toDomain(d));
  }

  async actualizar(ronda: Ronda): Promise<void> {
    const data = MongoRondaMapper.toPersistence(ronda) as any;
    const { _id, ...update } = data;
    await RondaModel.updateOne({ _id: ronda.id }, { $set: update });
  }
}