import z from "zod";

const ItemValidacionSchema = z.object({
  validacionId: z.string().min(1, { message: "validacionId requerido" }),
  cumplida: z.boolean(),
  observaciones: z.string().optional(),
});

export const CrearRondaSchema = z.object({
  vehiculoId: z.string().min(1),
  conductorId: z.string().min(1),
  kilometraje: z.number().min(0),
  observaciones: z.string().optional(),
  firmaDigital: z.string().min(1, { message: "Firma digital requerida" }),
  validaciones: z.array(ItemValidacionSchema).min(1, { message: "Debe enviar validaciones" }),
});

export type CrearRondaDto = z.infer<typeof CrearRondaSchema>;