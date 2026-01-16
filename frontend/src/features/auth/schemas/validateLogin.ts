import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Debe ser un email válido").min(1, "Debe ingresar un email"),
  password: z.string().min(1, "Debe ingresar una contraseña"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
