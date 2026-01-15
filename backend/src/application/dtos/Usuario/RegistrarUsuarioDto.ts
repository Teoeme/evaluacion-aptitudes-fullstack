import z from "zod";
import { Roles } from "../../../domain/value-objects/RolUsuario";

export const RegistrarUsuarioSchema = z.object({
    nombreCompleto: z.string("El nombre completo debe ser un string").min(1, { message: "Debe especificar un nombre completo" }),
    dni: z.string("El DNI debe ser un string").min(7, { message: "El DNI debe tener al menos 7 caracteres" }).max(8, { message: "El DNI debe tener como maximo 8 caracteres" }),
    rol: z.enum(Roles, { message: "El rol no es válido" }),
    area: z.string("El area debe ser un string").min(1, { message: "Debe especificar un area" }),
    email: z.email('El email no cumple con el formato').min(1, { message: "El email es requerido" }),
    password: z.string("La contraseña debe ser un string").min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z.string("Confirmar contraseña debe ser un string").min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
})

export type RegistrarUsuarioDto = z.infer<typeof RegistrarUsuarioSchema>