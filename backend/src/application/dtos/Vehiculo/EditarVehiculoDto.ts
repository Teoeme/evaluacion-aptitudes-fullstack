import z from "zod";
import { TiposVehiculo } from "../../../domain/value-objects/TipoVehiculo";
import { TiposResponsable } from "../../../domain/value-objects/TipoResponsable";

const ResponsableSchema = z.object({
  id: z.string().min(1, { message: "El id del responsable es requerido" }),
  tipo: z.enum(TiposResponsable, { message: "El tipo de responsable es requerido" }),
});

export const EditarVehiculoSchema = z.object({
  id: z.string().min(1, { message: "El id es requerido" }),
  dominio: z.string().min(1).optional(),
  marca: z.string().min(1).optional(),
  modelo: z.string().min(1).optional(),
  tipo: z.enum(TiposVehiculo).optional(),
  anoFabricacion: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  kilometraje: z.number().min(0).optional(),
  responsable: ResponsableSchema.optional(),
}).refine((data) => {
  const { id, ...rest } = data;
  return Object.values(rest).some(v => v !== undefined);
}, {
  message: "Debe enviar al menos un campo a modificar",
});

export type EditarVehiculoDto = z.infer<typeof EditarVehiculoSchema>;