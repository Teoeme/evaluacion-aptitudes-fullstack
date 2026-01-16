import { IConductorRepositorio } from "../../../domain/repositories/IConductorRepositorio";
import { IIdGenerator } from "../../../domain/services/IIdGenerator";
import { Conductor } from "../../../domain/entities/Conductor";
import { EstadoConductor, EstadosConductor } from "../../../domain/value-objects/EstadoConductor";
import { Email } from "../../../domain/value-objects/Email";
import { ResourceAlreadyExistsError, ResourceNotFoundError } from "../../../domain/errors/BaseErrors";
import { CrearConductorDto } from "../../dtos/Conductor/CrearConductorDto";
import { IUsuarioRepositorio } from "../../../domain/repositories/IUsuarioRepositorio";

export class CrearConductorUseCase {
  private readonly conductorRepositorio: IConductorRepositorio;
  private readonly usuarioRepositorio: IUsuarioRepositorio;
  private readonly idGenerator: IIdGenerator;

  constructor(dependencias: { conductorRepositorio: IConductorRepositorio; usuarioRepositorio: IUsuarioRepositorio; idGenerator: IIdGenerator }) {
    this.conductorRepositorio = dependencias.conductorRepositorio;
    this.usuarioRepositorio = dependencias.usuarioRepositorio;
    this.idGenerator = dependencias.idGenerator;
  }

  async execute(dto: CrearConductorDto) {
    const existente = await this.conductorRepositorio.buscarPorUsuarioId(dto.usuarioId);
    if (existente) {
      throw new ResourceAlreadyExistsError("Conductor", "usuarioId", dto.usuarioId);
    }

    //verificar que el usuario a vincular con el conductor exista
    const usuario = await this.usuarioRepositorio.buscarPorId(dto.usuarioId);
    if (!usuario) {
      throw new ResourceNotFoundError("Usuario a vincular con el conductor", dto.usuarioId);
    }


    const conductor = new Conductor({
      id: this.idGenerator.generate(),
      nombreCompleto: dto.nombreCompleto,
      dni: dto.dni,
      licenciaConducir: {
        categoria: dto.licenciaConducir.categoria,
        fechaVencimiento: dto.licenciaConducir.fechaVencimiento,
      },
      contacto: dto.contacto
        ? {
            telefono: dto.contacto.telefono,
            email: dto.contacto.email ? new Email(dto.contacto.email) : undefined,
          }
        : undefined,
      empresa: dto.empresa,
      estado: new EstadoConductor(EstadosConductor.ACTIVO),
      usuarioId: dto.usuarioId,
    });

    await this.conductorRepositorio.guardar(conductor);
    return conductor;
  }
}