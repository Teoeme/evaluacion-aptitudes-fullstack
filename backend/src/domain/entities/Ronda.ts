//Una ronda es una salida del vehiculo a la carretera.
// Se registra fecha y hora, kilometraje, vehiculo, conductor y una serie de validaciones.

import { validateRequiredFields } from "../utils/ValidationUtils";
import { BusinessRules } from "../constants/ReglasNegocio";
import { EstadoRonda, EstadosRonda } from "../value-objects/EstadoRonda";
import { FirmaDigital } from "../value-objects/FirmaDigital";
import { ItemValidacionRonda } from "../value-objects/ItemValidacionRonda";

export interface RondaProps {
    id: string;
    fechaHora: Date;
    kilometraje: number;
    vehiculoId: string;
    conductorId: string;
    observaciones?: string | undefined;
    validaciones: ItemValidacionRonda[];
    cumplimiento: number; //es la suma de las validaciones cumplidas
    estado: EstadoRonda; // es el estado final de la ronda, es decir si su cumplimiento es suficiente para habilitarla
    firmaDigital: FirmaDigital; //es un base64 de la firma digital del conductor capturada en FE con un canvas
    createdAt?: Date | undefined;
}


export class Ronda {

    public readonly id: string;
    public readonly fechaHora: Date;
    public readonly kilometraje: number;
    public readonly vehiculoId: string;
    public readonly conductorId: string;
    public readonly observaciones?: string | undefined;
    public readonly validaciones: ItemValidacionRonda[];
    public readonly cumplimiento: number;
    public readonly estado: EstadoRonda;
    public readonly firmaDigital: FirmaDigital;
    public readonly createdAt: Date;

    constructor({
        id,
        fechaHora,
        kilometraje,
        vehiculoId,
        conductorId,
        observaciones,
        validaciones,
        cumplimiento,
        estado,
        firmaDigital,
        createdAt
    }: RondaProps) {
        this.id = id;
        this.fechaHora = fechaHora;
        this.kilometraje = kilometraje;
        this.vehiculoId = vehiculoId;
        this.conductorId = conductorId;
        this.observaciones = observaciones;
        this.validaciones = validaciones;
        this.cumplimiento = cumplimiento;
        this.estado = estado;
        this.firmaDigital = firmaDigital;
        this.createdAt = createdAt ?? new Date();

        this.validate();
    }

    private validate(): void {
        validateRequiredFields(this, [
            "id",
            "fechaHora",
            "kilometraje",
            "vehiculoId",
            "conductorId",
            "validaciones",
            "cumplimiento",
            "estado",
            "firmaDigital"
        ], "Ronda");
    }

    static create(props: Omit<RondaProps, 'cumplimiento' | 'estado' | 'createdAt'>): Ronda {
        const { validaciones } = props;

        const cumplimiento = validaciones.reduce((acc, item) => {
            return item.cumplida ? acc + item.relevancia : acc;
        }, 0);

        const cumplioObligatorias = validaciones
            .filter(v => v.obligatoria)
            .every(v => v.cumplida);

        const esApta = cumplimiento >= BusinessRules.RONDA.MIN_PORCENTAJE_APTO && cumplioObligatorias;

        return new Ronda({
            ...props,
            cumplimiento,
            estado: new EstadoRonda(esApta ? EstadosRonda.APTA : EstadosRonda.NO_APTA),
        });

    }
}