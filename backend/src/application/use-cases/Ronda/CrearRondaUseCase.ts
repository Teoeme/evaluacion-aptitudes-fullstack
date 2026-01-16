import { IRondaRepositorio } from "../../../domain/repositories/IRondaRepositorio";
import { IVehiculoRepositorio } from "../../../domain/repositories/IVehiculoRepositorio";
import { IConductorRepositorio } from "../../../domain/repositories/IConductorRepositorio";
import { IValidacionRepositorio } from "../../../domain/repositories/IValidacionRepositorio";
import { IIdGenerator } from "../../../domain/services/IIdGenerator";
import { CrearRondaDto } from "../../dtos/Ronda/CrearRondaDto";
import { ResourceNotFoundError, InvalidStateError, UnauthorizedOperationError } from "../../../domain/errors/BaseErrors";
import { ItemValidacionRonda } from "../../../domain/value-objects/ItemValidacionRonda";
import { Ronda } from "../../../domain/entities/Ronda";
import { FirmaDigital } from "../../../domain/value-objects/FirmaDigital";
import { UsuarioAutenticado } from "../../../types/express";
import { ConductorCreaRondaParaOtroConductorError } from "../../../domain/errors/RondaErrors";

export class CrearRondaUseCase {
    private readonly rondaRepositorio: IRondaRepositorio
    private readonly vehiculoRepositorio: IVehiculoRepositorio
    private readonly conductorRepositorio: IConductorRepositorio;
    private readonly validacionRepositorio: IValidacionRepositorio;
    private readonly idGenerator: IIdGenerator;
  constructor(
    dependencias: {
      rondaRepositorio: IRondaRepositorio,
      vehiculoRepositorio: IVehiculoRepositorio,
      conductorRepositorio: IConductorRepositorio,
      validacionRepositorio: IValidacionRepositorio,
      idGenerator: IIdGenerator
    }
  ) {
    this.rondaRepositorio = dependencias.rondaRepositorio;
    this.vehiculoRepositorio = dependencias.vehiculoRepositorio;
    this.conductorRepositorio = dependencias.conductorRepositorio;
    this.validacionRepositorio = dependencias.validacionRepositorio;
    this.idGenerator = dependencias.idGenerator;
  }

  async execute(dto: CrearRondaDto, actor: UsuarioAutenticado) {
    const vehiculo = await this.vehiculoRepositorio.buscarPorId(dto.vehiculoId);
    if (!vehiculo) throw new ResourceNotFoundError("Vehiculo", dto.vehiculoId);

    const conductor = await this.conductorRepositorio.buscarPorId(dto.conductorId);
    if (!conductor) throw new ResourceNotFoundError("Conductor", dto.conductorId);

    if (!vehiculo.activo) throw new InvalidStateError("Vehiculo", "INACTIVO", "crear ronda");
    if (!conductor.estado.isActive()) throw new InvalidStateError("Conductor", "INACTIVO", "crear ronda");

    // El CONDUCTOR solo puede crear rondas para su usuario
    if (actor.rol.esConductor() && conductor.usuarioId !== actor.id) {
      throw new ConductorCreaRondaParaOtroConductorError();
    }

    // Validaciones activas del vehículo
    const validacionesActivas = await this.validacionRepositorio.listarActivasPorVehiculo(vehiculo.id);

    // Mapear las respuestas del conductor
    const respuestas = new Map(dto.validaciones.map(v => [v.validacionId, v]));

    const items: ItemValidacionRonda[] = validacionesActivas.map(v => {
      const respuesta = respuestas.get(v.id);
      return new ItemValidacionRonda({
        validacionId: v.id,
        nombre: v.nombre,
        relevancia: v.relevancia,
        obligatoria: v.obligatoria,
        cumplida: respuesta?.cumplida ?? false,
        observaciones: respuesta?.observaciones,
      });
    });

    const ronda = Ronda.create({
      id: this.idGenerator.generate(),
      fechaHora: new Date(),
      kilometraje: dto.kilometraje,
      vehiculoId: vehiculo.id,
      conductorId: conductor.id,
      observaciones: dto.observaciones,
      validaciones: items,
      firmaDigital: new FirmaDigital(dto.firmaDigital),
    });

    await this.rondaRepositorio.guardar(ronda);

    await this.vehiculoRepositorio.actualizar(
      new (vehiculo.constructor as any)({
        ...vehiculo,
        kilometraje: dto.kilometraje,
      })
    );

    return ronda;
  }
}