import { IConductorRepositorio } from "../../../domain/repositories/IConductorRepositorio";
import { ResourceNotFoundError } from "../../../domain/errors/BaseErrors";

export class ObtenerConductorUseCase {
    private readonly conductorRepositorio: IConductorRepositorio
  constructor(dependencias:{ conductorRepositorio: IConductorRepositorio }) {
    this.conductorRepositorio = dependencias.conductorRepositorio;
  }

  async execute(dto: { id: string }) {
    const conductor = await this.conductorRepositorio.buscarPorId(dto.id);
    if (!conductor) throw new ResourceNotFoundError("Conductor", dto.id);
    return conductor;
  }
}