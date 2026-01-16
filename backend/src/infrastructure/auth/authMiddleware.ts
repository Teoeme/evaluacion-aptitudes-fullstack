import { NextFunction, Request, Response } from "express"
import { ForbiddenError, InvalidFormatError, UnauthorizedOperationError } from "../../domain/errors/BaseErrors"
import { RolUsuario } from "../../domain/value-objects/RolUsuario"
import { IUsuarioRepositorio } from "../../domain/repositories/IUsuarioRepositorio"
import { UsuarioAutenticado } from "../../types/express"
import { AuthUsuarioMapper } from "./AuthUsuarioMapper"
import { IAuthTokenService } from "../../domain/services/IAuthTokenService"
import { JwtAuthTokenService } from "./JwtAuthTokenService"


export class AuthMiddleware {
    private readonly usuarioRepositorio: IUsuarioRepositorio
    private readonly authTokenService: IAuthTokenService 

    constructor(dependencies: {
        userRepository: IUsuarioRepositorio
        authTokenService: IAuthTokenService
    }) {
        this.usuarioRepositorio = dependencies.userRepository
        this.authTokenService = dependencies.authTokenService
    }


    authMiddleware = () => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = this.obtenerTokenDesdeRequest(req)
                this.validarFormatoToken(token)
                const {id}=await this.authTokenService.verificarToken(token)
                const userData = await this.obtenerDataUsuario(id)
                req.user = userData
                next()

            } catch (error) {
                next(error)
            }
        }
    }

    withRoles = (roles:RolUsuario[])=>{
      return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await new Promise((resolve,reject)=>{
                this.authMiddleware()(req,res,(error?:any)=>{
                    if(error){
                        reject(error)
                    }
                    resolve(true)
                    })
                })
            
                this.validarRolUsuario(req.user!,roles)
                next()
        } catch (error) {
            next(error)
        }
      }
    }

    private validarRolUsuario = (usuario: UsuarioAutenticado, roles: RolUsuario[]) => {
        if(!usuario.rol) throw new ForbiddenError('Forbidden', 'Usuario no tiene un rol asignado')

        const rolUsuario=usuario.rol
        const rolSuficiente=roles.some(r=>rolUsuario.esAlMenos(r))

        if(!rolSuficiente){
            throw new ForbiddenError('Forbidden', `Usuario no tiene un rol suficiente, roles requeridos: ${roles.map(r=>r.getValue()).join(', ')}`)
        }
    }

    private obtenerTokenDesdeRequest = (req: Request) => {
        const token = req.cookies.token
        if (!token) {
            throw new UnauthorizedOperationError('Autenticación', 'Token no proporcionado')
        }
        return token
    }

    private validarFormatoToken = (token: string) => {
        if (!token || typeof token !== 'string') {
            throw new UnauthorizedOperationError('Autenticación', 'Token no válido')
        }
    }

    private obtenerDataUsuario = async (id: string) => {
        const usuario = await this.usuarioRepositorio.buscarPorId(id)
        if (!usuario) {
            throw new UnauthorizedOperationError('Autenticación', 'Usuario no encontrado')
        }
        return AuthUsuarioMapper.toUsuarioAutenticado(usuario)
    }
}