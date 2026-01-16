import { Request, Response, NextFunction } from "express";
import { RegistrarUsuarioSchema } from "../../../application/dtos/Usuario/RegistrarUsuarioDto";
import { ServiceContainer } from "../../ServiceContainer";
import { HttpResponse } from "../utils/HttpResponse";
import { LoginUsuarioSchema } from "../../../application/dtos/Auth/LoginUsuarioDto";

export class UsuarioController {

    async registrarUsuario(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = RegistrarUsuarioSchema.parse(req.body);
            const usuario = await ServiceContainer.usuario.registrar.execute(dto);
            return HttpResponse.created(res,usuario,'Usuario registrado exitosamente')
        } catch (error) {
            next(error);
        }
    };
    

    
}