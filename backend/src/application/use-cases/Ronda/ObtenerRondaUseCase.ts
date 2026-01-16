import { IRondaRepositorio } from "../../../domain/repositories/IRondaRepositorio";
import { ResourceNotFoundError } from "../../../domain/errors/BaseErrors";

export class ObtenerRondaUseCase {
  private readonly rondaRepositorio: IRondaRepositorio;
  constructor(dependencias: { rondaRepositorio: IRondaRepositorio }) {
    this.rondaRepositorio = dependencias.rondaRepositorio;
  }

  async execute(dto: { id: string }) {
    const ronda = await this.rondaRepositorio.buscarPorId(dto.id);
    if (!ronda) throw new ResourceNotFoundError("Ronda", dto.id);
    return ronda;
  }
}

