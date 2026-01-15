import { Area } from "./Area";
import { TipoResponsable, TiposResponsable } from "./TipoResponsable";

export class ResponsableVehiculo {
    private constructor(
        private readonly idOrNombre: string,
        private readonly tipo: TipoResponsable
    ) { }

    static deUsuario(usuarioId: string): ResponsableVehiculo {
        return new ResponsableVehiculo(usuarioId, new TipoResponsable(TiposResponsable.USUARIO));
    }

    static deArea(areaNombre: string): ResponsableVehiculo {
        const area = new Area(areaNombre);
        return new ResponsableVehiculo(area.getValue(), new TipoResponsable(TiposResponsable.AREA));
    }

    getValor(): string { return this.idOrNombre; }

    getTipo(): TipoResponsable { return this.tipo; }

    esArea(): boolean {
        return this.tipo.getValue() === TiposResponsable.AREA;
    }

    esUsuario(): boolean {
        return this.tipo.getValue() === TiposResponsable.USUARIO;
    }
}