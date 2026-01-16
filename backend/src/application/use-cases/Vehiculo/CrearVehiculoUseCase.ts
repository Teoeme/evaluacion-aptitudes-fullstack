import { Vehiculo } from "../../../domain/entities/Vehiculo";
import { IVehiculoRepositorio } from "../../../domain/repositories/IVehiculoRepositorio";
import { IIdGenerator } from "../../../domain/services/IIdGenerator";
import { ResponsableVehiculo } from "../../../domain/value-objects/ResponsableVehiculo";
import { TipoResponsable } from "../../../domain/value-objects/TipoResponsable";
import { TipoVehiculo } from "../../../domain/value-objects/TipoVehiculo";
import { CrearVehiculoDto } from "../../dtos/Vehiculo/CrearVehiculoDto";

export class CrearVehiculoUseCase {
    private readonly vehiculoRepositorio: IVehiculoRepositorio
    private readonly idGenerator: IIdGenerator
    
    constructor(dependencias:{
        vehiculoRepositorio: IVehiculoRepositorio
        idGenerator: IIdGenerator
    }){
        this.vehiculoRepositorio = dependencias.vehiculoRepositorio
        this.idGenerator = dependencias.idGenerator
    }

    async execute(dto: CrearVehiculoDto) {
        const vehiculo = new Vehiculo({
            id: this.idGenerator.generate(),
            dominio: dto.dominio,
            marca: dto.marca,
            modelo: dto.modelo,
            tipo: new TipoVehiculo(dto.tipo as string),
            anoFabricacion: dto.anoFabricacion,
            kilometraje: dto.kilometraje,
            responsable: new ResponsableVehiculo(
                dto.responsable.id,
                new TipoResponsable(dto.responsable.tipo)),
            activo: dto.activo,
        });

        await this.vehiculoRepositorio.crear(vehiculo);

        return vehiculo;
    }
}