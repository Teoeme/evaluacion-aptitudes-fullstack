import { IValidacionRepositorio } from "../../../domain/repositories/IValidacionRepositorio";
import { IIdGenerator } from "../../../domain/services/IIdGenerator";
import { Validacion } from "../../../domain/entities/Validacion";
import { TipoVehiculo } from "../../../domain/value-objects/TipoVehiculo";
import { CrearValidacionDto } from "../../dtos/Validacion/CrearValidacionDto";

export class CrearValidacionUseCase {
    private readonly idGenerator: IIdGenerator
    private readonly validacionRepositorio: IValidacionRepositorio
    constructor(
    dependencias: {
      validacionRepositorio: IValidacionRepositorio,
      idGenerator: IIdGenerator
    }
  ) {
    this.idGenerator = dependencias.idGenerator;
    this.validacionRepositorio = dependencias.validacionRepositorio;
  }

  async execute(dto: CrearValidacionDto) {
    const validacion = new Validacion({
      id: this.idGenerator.generate(),
      nombre: dto.nombre,
      activa: dto.activa ?? true,
      relevancia: dto.relevancia,
      obligatoria: dto.obligatoria,
      tiposVehiculos: dto.tiposVehiculos.map(t => new TipoVehiculo(t)),
    });

    await this.validacionRepositorio.guardar(validacion);
    return validacion;
  }
}