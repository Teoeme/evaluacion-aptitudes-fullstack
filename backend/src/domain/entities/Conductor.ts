import { RequiredFieldsMissingError } from "../errors/BaseErrors";
import { validateRequiredFields } from "../utils/ValidationUtils";
import { Email } from "../value-objects/Email";
import { EstadoConductor } from "../value-objects/EstadoConductor";

export interface LicenciaConducirProps {
    categoria: string;
    fechaVencimiento: Date;
}

export interface ContactoProps {
    telefono?: string;
    email?: Email;
}

export interface ConductorProps {
    id: string;
    nombreCompleto: string;
    dni: string;
    licenciaConducir: LicenciaConducirProps;
    contacto?: ContactoProps;
    empresa: string;
    estado: EstadoConductor;
    usuarioId: string;
    createdAt?: Date;
}


export class Conductor {

    public readonly id: string;
    public readonly nombreCompleto: string;
    public readonly dni: string;
    public readonly licenciaConducir: LicenciaConducirProps;
    public readonly contacto?: ContactoProps | undefined;
    public readonly empresa: string;
    public readonly estado: EstadoConductor;
    public readonly usuarioId: string;
    public readonly createdAt?: Date;

    constructor({
        id,
        nombreCompleto,
        dni,
        licenciaConducir,
        contacto,
        empresa,
        estado,
        usuarioId,
        createdAt
    }: ConductorProps) {
        this.id = id;
        this.nombreCompleto = nombreCompleto;
        this.dni = dni;
        this.licenciaConducir = licenciaConducir;
        this.contacto = contacto;
        this.empresa = empresa;
        this.estado = estado;
        this.usuarioId = usuarioId;
        this.createdAt = createdAt || new Date();

        this.validate();
    }

    private validate() {
        validateRequiredFields(this, [
            "id",
            "nombreCompleto",
            "dni",
            "licenciaConducir",
            "empresa",
            "estado",
            "usuarioId"
        ], "Conductor");
    }
}