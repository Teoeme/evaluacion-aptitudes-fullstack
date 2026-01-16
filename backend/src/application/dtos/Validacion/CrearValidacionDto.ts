import z from "zod";
import { TiposVehiculo } from "../../../domain/value-objects/TipoVehiculo";

export const CrearValidacionSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  activa: z.boolean().default(true),
  relevancia: z.number().min(0).max(100),
  obligatoria: z.boolean(),
  tiposVehiculos: z.array(z.enum(TiposVehiculo)).min(1, { message: "Debe asignar al menos un tipo de vehículo" }),
});

export type CrearValidacionDto = z.infer<typeof CrearValidacionSchema>;