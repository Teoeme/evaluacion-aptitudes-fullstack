//Una validacion es un punto de control que se realiza al comienzo de la ronda.
// Tiene una relevancia que es un valor numerico entre 0 y 100 que indica la importancia de la validacion.
// Puede o no ser obligatoria de cumplirse para habilitar la ronda.
// Puede afectar a todos o solo a algunos de los tipos de vehiculos.

import { InvalidFormatError, RequiredFieldsMissingError } from "../errors/BaseErrors";
import { TipoVehiculo } from "../value-objects/TipoVehiculo";


export interface ValidacionProps {
    id: string;
    nombre: string;
    activa: boolean;
    relevancia: number;
    obligatoria: boolean;
    tiposVehiculos: TipoVehiculo[];
    createdAt?: Date;
}

export class Validacion {

    public readonly id: string;
    public readonly nombre: string;
    public activa: boolean;
    public relevancia: number;
    public obligatoria: boolean;
    public tiposVehiculos: TipoVehiculo[];
    public readonly createdAt: Date;

    constructor({
        id,
        nombre,
        activa,
        relevancia,
        obligatoria,
        tiposVehiculos,
        createdAt
    }: ValidacionProps) {
        this.id = id;
        this.nombre = nombre;
        this.activa = activa;
        this.relevancia = relevancia;
        this.obligatoria = obligatoria;
        this.tiposVehiculos = tiposVehiculos;
        this.createdAt = createdAt ?? new Date();

        this.validate();
    }

    private validate(): void {
        if (!this.id) {
            throw new RequiredFieldsMissingError(["id"], "Validacion");
        }
        if (this.relevancia < 0 || this.relevancia > 100) {
            throw new InvalidFormatError("relevancia", "0-100", "Validacion");
        }

        if (this.tiposVehiculos.length === 0) {
            throw new InvalidFormatError("tiposVehiculos", "Debe haber al menos un tipo de vehiculo", "Validacion");
        }
    }

    public desactivar(): void {
        this.activa = false;
    }

    public activar(): void {
        this.activa = true;
    }

    public setRelevancia(relevancia: number): void {
        this.relevancia = relevancia;
    }

    public setObligatoria(obligatoria: boolean): void {
        this.obligatoria = obligatoria;
    }

    public setTiposVehiculos(tiposVehiculos: TipoVehiculo[]): void {
        this.tiposVehiculos = tiposVehiculos;
    }
}