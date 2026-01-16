import { Roles } from "../../src/domain/value-objects/RolUsuario";
import { TiposVehiculo } from "../../src/domain/value-objects/TipoVehiculo";
import { TiposResponsable } from "../../src/domain/value-objects/TipoResponsable";

import { RegistrarUsuarioDto } from "../../src/application/dtos/Usuario/RegistrarUsuarioDto";
import { CrearVehiculoDto } from "../../src/application/dtos/Vehiculo/CrearVehiculoDto";
import { CrearConductorDto } from "../../src/application/dtos/Conductor/CrearConductorDto";
import { CrearValidacionDto } from "../../src/application/dtos/Validacion/CrearValidacionDto";
import { FirmaDigital } from "../../src/domain/value-objects/FirmaDigital";

const random = () => Math.random().toString(36).slice(2, 8);

export const usuarioFactory = (overrides: Partial<RegistrarUsuarioDto> = {}): RegistrarUsuarioDto => ({
  nombreCompleto: `Usuario ${random()}`,
  dni: `${Math.floor(10000000 + Math.random() * 90000000)}`,
  rol: Roles.CONDUCTOR,
  area: "Logística",
  email: `user_${random()}@test.com`,
  password: "Password123!",
  confirmPassword: "Password123!",
  ...overrides,
});

export const vehiculoFactory = (overrides: Partial<CrearVehiculoDto> = {}): CrearVehiculoDto => ({
  dominio: `AA${random().toUpperCase()}`,
  marca: "Ford",
  modelo: "Ranger",
  tipo: TiposVehiculo.CAMION,
  anoFabricacion: 2022,
  kilometraje: 1000,
  responsable: { id: "dummy", tipo: TiposResponsable.USUARIO },
  activo: true,
  ...overrides,
});

export const conductorFactory = (overrides: Partial<CrearConductorDto> = {}): CrearConductorDto => ({
  nombreCompleto: `Conductor ${random()}`,
  dni: `${Math.floor(10000000 + Math.random() * 90000000)}`,
  licenciaConducir: { categoria: "B1", fechaVencimiento: new Date("2030-01-01") },
  contacto: { telefono: "12345678", email: `conductor_${random()}@test.com` },
  empresa: "Tercerizada SA",
  usuarioId: "dummy",
  ...overrides,
});

export const validacionFactory = (overrides: Partial<CrearValidacionDto> = {}): CrearValidacionDto => ({
  nombre: `Check ${random()}`,
  activa: true,
  relevancia: 10,
  obligatoria: false,
  tiposVehiculos: [TiposVehiculo.CAMION],
  ...overrides,
});

export const firmaDigitalFactory = () =>
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";