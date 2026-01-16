import z from "zod";
import { TiposVehiculo } from "../../../domain/value-objects/TipoVehiculo";
import { TiposResponsable } from "../../../domain/value-objects/TipoResponsable";

const ResponsableSchema = z.object({
    id: z.string().min(1, { message: "El id del responsable es requerido" }),
    tipo: z.enum(TiposResponsable, { message: "El tipo de responsable es requerido" }),
})

export const CrearVehiculoSchema = z.object({
    dominio: z.string().min(1, { message: "El dominio es requerido" }),
    marca: z.string().min(1, { message: "La marca es requerida" }),
    modelo: z.string().min(1, { message: "El modelo es requerido" }),
    tipo: z.enum(TiposVehiculo, { message: "El tipo de vehiculo es requerido" }),
    anoFabricacion: z.number().min(1900, { message: "El año de fabricación es requerido" }).max(new Date().getFullYear() + 1, { message: "El año de fabricación no puede ser mayor al año actual" }),
    kilometraje: z.number().min(0, { message: "El kilometraje es requerido" }),
    responsable: ResponsableSchema,
    activo: z.boolean().default(true),
})

export type CrearVehiculoDto = z.infer<typeof CrearVehiculoSchema>