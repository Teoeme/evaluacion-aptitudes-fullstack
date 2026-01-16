import z from "zod";

const LicenciaSchema = z.object({
  categoria: z.string().min(1),
  fechaVencimiento: z.coerce.date(),
});

const ContactoSchema = z.object({
  telefono: z.string().min(1).optional(),
  email: z.email().optional(),
});

export const EditarConductorSchema = z.object({
  id: z.string().min(1),
  nombreCompleto: z.string().min(1).optional(),
  dni: z.string().min(7).max(8).optional(),
  licenciaConducir: LicenciaSchema.optional(),
  contacto: ContactoSchema.optional(),
  empresa: z.string().min(1).optional(),
}).refine((data) => {
  const { id, ...rest } = data;
  return Object.values(rest).some(v => v !== undefined);
}, {
  message: "Debe enviar al menos un campo a modificar",
});

export type EditarConductorDto = z.infer<typeof EditarConductorSchema>;