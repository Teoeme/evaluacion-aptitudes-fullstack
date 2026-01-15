import { InternalValidationError } from "../errors/BaseErrors";

export enum AreasEmpresa {
    LOGISTICA = 'Logística',
    MECANICA = 'Mecánica',
    RRHH = 'Recursos Humanos',
    INVENTARIO = 'Inventario'
}

export class Area {
    private readonly value: AreasEmpresa;

    constructor(value: string | AreasEmpresa) {
        if (!this.isValid(value)) {
            throw new InternalValidationError(
                `Área inválida: '${value}'. Valores permitidos: ${Object.values(AreasEmpresa).join(', ')}`
            );
        }
        this.value = value as AreasEmpresa;
    }

    private isValid(value: string | AreasEmpresa): boolean {
        return Object.values(AreasEmpresa).includes(value as AreasEmpresa);
    }

    getValue(): string {
        return this.value;
    }

    static create(value: string): Area {
        return new Area(value);
    }

    esLogistica(): boolean {
        return this.value === AreasEmpresa.LOGISTICA;
    }
}