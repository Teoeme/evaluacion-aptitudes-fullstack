import { RequiredFieldsMissingError } from "../errors/BaseErrors";
import { validateRequiredFields } from "../utils/ValidationUtils";
import { Email } from "../value-objects/Email";
import { RolUsuario } from "../value-objects/RolUsuario";

export interface UsuarioProps {
    id: string;
    nombreCompleto: string;
    dni: string;
    rol: RolUsuario;
    area?: string | undefined;
    createdAt?: Date;
    email: Email;
    password: string;
}

export class Usuario {
    public readonly id: string;
    public readonly nombreCompleto: string;
    public readonly dni: string;
    public readonly rol: RolUsuario;
    public readonly area?: string | undefined;
    public readonly createdAt: Date;
    public readonly email: Email;
    public readonly password: string;

    constructor({ id, nombreCompleto, dni, rol, area, createdAt, email, password }: UsuarioProps) {
        this.id = id;
        this.nombreCompleto = nombreCompleto;
        this.dni = dni;
        this.rol = rol;
        this.area = area;
        this.createdAt = createdAt || new Date();
        this.email = email;
        this.password = password;

        this.validate();
    }

    private validate() {
        validateRequiredFields(this, [
            "id",
            "nombreCompleto",
            "dni",
            "rol",
            "email",
            "password"
        ], "Usuario");
    }
}