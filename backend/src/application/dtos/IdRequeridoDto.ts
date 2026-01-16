import z from "zod";

export const IdRequeridoSchema = z.object({
  id: z.string().min(1),
});

export type IdRequeridoDto = z.infer<typeof IdRequeridoSchema>;