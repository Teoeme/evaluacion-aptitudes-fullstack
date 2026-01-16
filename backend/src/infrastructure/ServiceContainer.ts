import { RegistrarUsuarioUseCase } from "../application/use-cases/Usuario/RegistrarUsuarioUseCase";
import { MongoUsuarioRepository } from "./database/mongodb/repositories/MongoUsuarioRepository";
import { BcryptPasswordHasher } from "./auth/BcryptPasswordHasher";
import { MongooseIdGenerator } from "./services/MongooseIdGenerator";
import { LoginUsuarioUseCase } from "../application/use-cases/Auth/LoginUsuarioUseCase";
import { JwtAuthTokenService } from "./auth/JwtAuthTokenService";

const idGenerator = new MongooseIdGenerator();
const passwordHasher = new BcryptPasswordHasher();
const authTokenService = new JwtAuthTokenService();

const usuarioRepositorio = new MongoUsuarioRepository()

export const ServiceContainer = {
    usuario: {
        registrar: new RegistrarUsuarioUseCase({
            usuarioRepositorio,
            idGenerator,
            passwordHasher
        })
    },
    auth: {
        login: new LoginUsuarioUseCase({
            usuarioRepositorio,
            passwordHasher,
            authTokenService  
        })
    }
}