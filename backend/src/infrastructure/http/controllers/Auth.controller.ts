import { Request, Response, NextFunction } from "express";
import { LoginUsuarioSchema } from "../../../application/dtos/Auth/LoginUsuarioDto";
import { ServiceContainer } from "../../ServiceContainer";
import { HttpResponse } from "../utils/HttpResponse";

export class AuthController {
    async login(req:Request,res:Response,next:NextFunction){
        try {
            const dto = LoginUsuarioSchema.parse(req.body);
            const {token,usuario}=await ServiceContainer.auth.login.execute(dto);

            res.cookie("token", token.value, {
                httpOnly:true,
                secure:process.env.NODE_ENV === 'production',
                sameSite:'lax',
                maxAge:token.expiresIn
            })

            return HttpResponse.ok(res,{usuario},'Login exitoso');
        } catch (error) {
            next(error);
        }
    }
}