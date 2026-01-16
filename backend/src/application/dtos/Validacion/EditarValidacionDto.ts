import z from "zod";
import { TiposVehiculo } from "../../../domain/value-objects/TipoVehiculo";

export const EditarValidacionSchema = z.object({
  id: z.string().min(1, { message: "El id es requerido" }),
  nombre: z.string().min(1).optional(),
  relevancia: z.number().min(0).max(100).optional(),
  obligatoria: z.boolean().optional(),
  tiposVehiculos: z.array(z.enum(TiposVehiculo)).min(1).optional(),
  activa: z.boolean().optional(),
}).refine((data) => {
  const { id, ...rest } = data;
  return Object.values(rest).some(v => v !== undefined);
}, { message: "Debe enviar al menos un campo a modificar" });

export type EditarValidacionDto = z.infer<typeof EditarValidacionSchema>;