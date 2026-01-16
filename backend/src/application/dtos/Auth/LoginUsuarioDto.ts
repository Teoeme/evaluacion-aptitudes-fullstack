import z from "zod";

export const LoginUsuarioSchema = z.object({
    email: z.email('El email no cumple con el formato').min(1, { message: "El email es requerido" }),
    password: z.string("La contraseña debe ser un string").min(1, { message: "La contraseña es requerida" })
})

export type LoginUsuarioDto = z.infer<typeof LoginUsuarioSchema>