import { IRondaRepositorio } from "../../../domain/repositories/IRondaRepositorio";
import { ListarRondasQueryDto } from "../../../application/dtos/Ronda/ListarRondasDto";

export class ListarRondasUseCase {
  private readonly rondaRepositorio: IRondaRepositorio
    constructor(dependencias: { rondaRepositorio: IRondaRepositorio }) {
      this.rondaRepositorio = dependencias.rondaRepositorio;
    }
  
    async execute(filtros: ListarRondasQueryDto) {
      if (filtros.conductorId) return this.rondaRepositorio.listarPorConductor(filtros.conductorId);
      if (filtros.vehiculoId) return this.rondaRepositorio.listarPorVehiculo(filtros.vehiculoId);
      if (filtros.fecha) return this.rondaRepositorio.listarPorFecha(new Date(filtros.fecha));
      return this.rondaRepositorio.listarTodos();
    }
  }