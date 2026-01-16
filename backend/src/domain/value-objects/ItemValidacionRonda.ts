export interface ItemValidacionRondaProps {
    validacionId: string;
    nombre: string;
    relevancia: number;
    obligatoria: boolean;
    cumplida: boolean;
    observaciones?: string | undefined;
}

export class ItemValidacionRonda {
    public readonly validacionId: string;
    public readonly nombre: string;
    public readonly relevancia: number;
    public readonly obligatoria: boolean;
    public readonly cumplida: boolean;
    public readonly observaciones?: string | undefined;
    constructor({
        validacionId,
        nombre,
        relevancia,
        obligatoria,
        cumplida,
        observaciones
    }: ItemValidacionRondaProps) {
        this.validacionId = validacionId;
        this.nombre = nombre;
        this.relevancia = relevancia;
        this.obligatoria = obligatoria;
        this.cumplida = cumplida;
        this.observaciones = observaciones;
    }
}