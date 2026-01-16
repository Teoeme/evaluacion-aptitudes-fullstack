import { ForbiddenError, UnauthorizedError } from "../../../domain/errors/BaseErrors";
import { IUsuarioRepositorio } from "../../../domain/repositories/IUsuarioRepositorio";
import { IAuthTokenService } from "../../../domain/services/IAuthTokenService";
import { IPasswordHasher } from "../../../domain/services/IPasswordHasher";
import { Email } from "../../../domain/value-objects/Email";
import { LoginUsuarioDto } from "../../dtos/Auth/LoginUsuarioDto";
import { UsuarioMapper } from "../../dtos/Usuario/UsuarioMapper";

export class LoginUsuarioUseCase {
    private readonly usuarioRepositorio: IUsuarioRepositorio
    private readonly passwordHasher: IPasswordHasher
    private readonly authTokenService: IAuthTokenService
 
    constructor(
        dependencieas:{
            usuarioRepositorio: IUsuarioRepositorio,
            passwordHasher: IPasswordHasher,
            authTokenService: IAuthTokenService
        }
    ){
        this.usuarioRepositorio = dependencieas.usuarioRepositorio
        this.passwordHasher = dependencieas.passwordHasher
        this.authTokenService = dependencieas.authTokenService
    }

    async execute (dto:LoginUsuarioDto){
        const usuario = await this.usuarioRepositorio.buscarPorEmail(new Email(dto.email))
        if(!usuario){
            throw new ForbiddenError('Credenciales inválidas');
        }
        const passwordValido=await this.passwordHasher.comparar(dto.password,usuario.password)
        if(!passwordValido){
            throw new ForbiddenError('Credenciales inválidas');
        }

        const token=await this.authTokenService.generarToken({
            id:usuario.id,
            email:usuario.email.getValue(),
            rol:usuario.rol.getValue()
        })

        return {token,usuario:UsuarioMapper.toDto(usuario)}
    }
}