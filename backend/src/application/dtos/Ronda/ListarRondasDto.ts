import z from "zod";

export const ListarRondasQuerySchema = z.object({
  conductorId: z.string().min(1).optional(),
  vehiculoId: z.string().min(1).optional(),
  fecha: z.string().optional(), // ISO string
}).refine((data) => {
  return data.conductorId || data.vehiculoId || data.fecha;
}, {
  message: "Debe enviar al menos un filtro",
});

export type ListarRondasQueryDto = z.infer<typeof ListarRondasQuerySchema>;