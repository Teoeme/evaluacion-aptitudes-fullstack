import { RegistrarUsuarioDto } from "../../../application/dtos/Usuario/RegistrarUsuarioDto";
import { CrearValidacionDto } from "../../../application/dtos/Validacion/CrearValidacionDto";
import { Roles } from "../../../domain/value-objects/RolUsuario";
import { TiposVehiculo } from "../../../domain/value-objects/TipoVehiculo";

export interface SeedData {
    usuarios: RegistrarUsuarioDto[];
    validaciones: CrearValidacionDto[];
}

export const seedData: SeedData = {
    usuarios: [
        {
            nombreCompleto: "Administrador Sistema",
            dni: "12345678",
            email: "admin@sistema.com",
            password: "Admin123",
            rol: Roles.ADMIN,
            area: "Administración",
            confirmPassword: "Admin123!",
        },
        {
            nombreCompleto: "Conductor Prueba",
            dni: "87654321",
            email: "conductor@sistema.com",
            password: "Conductor123",
            rol: Roles.CONDUCTOR,
            area: "Operaciones",
            confirmPassword: "Conductor123!",
        },
    ],
    validaciones: [
        {
            nombre: "Corroborar carnet del conductor y validar identidad",
            activa: true,
            relevancia: 40,
            obligatoria: true,
            tiposVehiculos: [TiposVehiculo.CAMION, TiposVehiculo.AUTO, TiposVehiculo.MOTO],
        },
        {
            nombre: "Matafuego vigente y accesible",
            activa: true,
            relevancia: 5,
            obligatoria: false,
            tiposVehiculos: [TiposVehiculo.CAMION, TiposVehiculo.AUTO],
        },
        {
            nombre: "Seguro vigente con comprobante",
            activa: true,
            relevancia: 10,
            obligatoria: true,
            tiposVehiculos: [TiposVehiculo.CAMION, TiposVehiculo.AUTO, TiposVehiculo.MOTO],
        },
        {
            nombre: "Balizas triangulares (cantidad: 2)",
            activa: true,
            relevancia: 5,
            obligatoria: false,
            tiposVehiculos: [TiposVehiculo.CAMION, TiposVehiculo.AUTO],
        },
        {
            nombre: "Chaleco reflectivo",
            activa: true,
            relevancia: 2.5,
            obligatoria: false,
            tiposVehiculos: [TiposVehiculo.CAMION, TiposVehiculo.AUTO, TiposVehiculo.MOTO],
        },
        {
            nombre: "Botiquín",
            activa: true,
            relevancia: 2.5,
            obligatoria: false,
            tiposVehiculos: [TiposVehiculo.CAMION, TiposVehiculo.AUTO],
        },
        {
            nombre: "Rueda de auxilio + llave + crique",
            activa: true,
            relevancia: 20,
            obligatoria: false,
            tiposVehiculos: [TiposVehiculo.CAMION, TiposVehiculo.AUTO],
        },
        {
            nombre: "Eslinga / grilletes (si aplica según tipo de vehículo)",
            activa: true,
            relevancia: 2.5,
            obligatoria: false,
            tiposVehiculos: [TiposVehiculo.CAMION],
        },
        {
            nombre: "Cédula verde/azul o autorización según tenencia",
            activa: true,
            relevancia: 7.5,
            obligatoria: false,
            tiposVehiculos: [TiposVehiculo.CAMION, TiposVehiculo.AUTO, TiposVehiculo.MOTO],
        },
        {
            nombre: "VTV/RTO vigente (si aplica por jurisdicción/uso)",
            activa: true,
            relevancia: 5,
            obligatoria: false,
            tiposVehiculos: [TiposVehiculo.CAMION, TiposVehiculo.AUTO],
        },
    ],
};