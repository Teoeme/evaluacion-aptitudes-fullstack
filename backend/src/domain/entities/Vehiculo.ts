import { TipoVehiculo } from "../value-objects/TipoVehiculo";
import { RequiredFieldsMissingError } from "../errors/BaseErrors";
import { ResponsableVehiculo } from "../value-objects/ResponsableVehiculo";
import { validateRequiredFields } from "../utils/ValidationUtils";

export interface VehiculoProps {
    id: string;
    dominio: string;
    marca: string;
    modelo: string;
    tipo: TipoVehiculo;
    anoFabricacion: number;
    kilometraje: number;
    responsable: ResponsableVehiculo;
    activo: boolean;
}

export class Vehiculo {
    public readonly id: string;
    public readonly dominio: string;
    public readonly marca: string;
    public readonly modelo: string;
    public readonly tipo: TipoVehiculo;
    public readonly anoFabricacion: number;
    public readonly kilometraje: number;
    public readonly responsable: ResponsableVehiculo;
    public readonly activo: boolean;

    constructor(props: VehiculoProps) {
        this.id = props.id;
        this.dominio = props.dominio;
        this.marca = props.marca;
        this.modelo = props.modelo;
        this.tipo = props.tipo;
        this.anoFabricacion = props.anoFabricacion;
        this.kilometraje = props.kilometraje;
        this.responsable = props.responsable;
        this.activo = props.activo;

        this.validate();
    }

    private validate() {
        validateRequiredFields(this, [
            "id",
            "dominio",
            "marca",
            "modelo",
            "tipo",
            "anoFabricacion",
            "kilometraje",
            "responsable",
            "activo"
        ], "Vehiculo");
    }
}