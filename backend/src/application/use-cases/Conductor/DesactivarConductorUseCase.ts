import { IConductorRepositorio } from "../../../domain/repositories/IConductorRepositorio";
import { ResourceNotFoundError } from "../../../domain/errors/BaseErrors";

export class DesactivarConductorUseCase {
  private readonly conductorRepositorio: IConductorRepositorio
  constructor(dependencias:{ conductorRepositorio: IConductorRepositorio }) {
    this.conductorRepositorio = dependencias.conductorRepositorio;
  }

  async execute(dto: { id: string }) {
    const actual = await this.conductorRepositorio.buscarPorId(dto.id);
    if (!actual) throw new ResourceNotFoundError("Conductor", dto.id);
    await this.conductorRepositorio.desactivar(dto.id);
  }
}