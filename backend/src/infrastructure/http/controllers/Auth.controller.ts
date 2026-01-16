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

    async logout(req:Request,res:Response,next:NextFunction){
        try {
            await ServiceContainer.auth.logout.execute();
            res.clearCookie('token');
            return HttpResponse.ok(res,'Logout exitoso');
        } catch (error) {
            next(error);
        }
    }

    async verificarToken(req:Request,res:Response,next:NextFunction){
        try {
            const token = req.cookies.token;
            const { valid, payload } = await ServiceContainer.auth.verificarToken.execute(token);
            return HttpResponse.ok(res,{valid,payload},'Token verificado exitosamente');
        } catch (error) {
            next(error);
        }
    }

    async whoAmI(req:Request,res:Response,next:NextFunction){
        try {
            const actor=req.user!
            const usuario=await ServiceContainer.auth.whoAmI.execute(actor.id)
            return HttpResponse.ok(res,usuario,'Usuario obtenido exitosamente');
        }catch(error){
            next(error);
        }
    }
}