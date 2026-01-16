import { IConductorRepositorio } from "../../../../domain/repositories/IConductorRepositorio";
import { Conductor } from "../../../../domain/entities/Conductor";
import ConductorModel from "../models/Conductor";
import { MongoConductorMapper } from "../mappers/MongoConductorMapper";

export class MongoConductorRepository implements IConductorRepositorio {
  async guardar(conductor: Conductor): Promise<void> {
    await ConductorModel.create(MongoConductorMapper.toPersistence(conductor));
  }

  async buscarPorId(id: string): Promise<Conductor | null> {
    const doc = await ConductorModel.findById(id);
    return doc ? MongoConductorMapper.toDomain(doc) : null;
  }

  async buscarPorUsuarioId(usuarioId: string): Promise<Conductor | null> {
    const doc = await ConductorModel.findOne({ usuarioId });
    return doc ? MongoConductorMapper.toDomain(doc) : null;
  }

  async listarTodos(): Promise<Conductor[]> {
    const docs = await ConductorModel.find();
    return docs.map(d => MongoConductorMapper.toDomain(d));
  }

  async actualizar(conductor: Conductor): Promise<void> {
    const data = MongoConductorMapper.toPersistence(conductor) as any;
    const { _id, ...update } = data;
    await ConductorModel.updateOne({ _id: conductor.id }, { $set: update });
  }

  async desactivar(id: string): Promise<void> {
    await ConductorModel.updateOne({ _id: id }, { $set: { estado: "Inactivo" } });
  }
}