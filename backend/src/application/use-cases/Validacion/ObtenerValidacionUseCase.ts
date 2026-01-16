import { IValidacionRepositorio } from "../../../domain/repositories/IValidacionRepositorio";
import { ResourceNotFoundError } from "../../../domain/errors/BaseErrors";

export class ObtenerValidacionUseCase {
  private readonly validacionRepositorio: IValidacionRepositorio
  constructor(dependencias: { validacionRepositorio: IValidacionRepositorio }) {
    this.validacionRepositorio = dependencias.validacionRepositorio;
  }

  async execute(dto: { id: string }) {
    const validacion = await this.validacionRepositorio.buscarPorId(dto.id);
    if (!validacion) throw new ResourceNotFoundError("Validacion", dto.id);
    return validacion;
  }
}