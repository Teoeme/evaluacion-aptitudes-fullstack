import z from "zod";

const LicenciaSchema = z.object({
  categoria: z.string().min(1, { message: "La categoría es requerida" }),
  fechaVencimiento: z.coerce.date(),
});

const ContactoSchema = z.object({
  telefono: z.string().min(1).optional(),
  email: z.email().optional(),
});

export const CrearConductorSchema = z.object({
  nombreCompleto: z.string().min(1),
  dni: z.string().min(7).max(8),
  licenciaConducir: LicenciaSchema,
  contacto: ContactoSchema.optional(),
  empresa: z.string().min(1),
  usuarioId: z.string().min(1),
});

export type CrearConductorDto = z.infer<typeof CrearConductorSchema>;