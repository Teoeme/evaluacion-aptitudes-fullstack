import { RegistrarUsuarioUseCase } from "../application/use-cases/Usuario/RegistrarUsuarioUseCase";
import { MongoUsuarioRepository } from "./database/mongodb/repositories/MongoUsuarioRepository";
import { BcryptPasswordHasher } from "./auth/BcryptPasswordHasher";
import { MongooseIdGenerator } from "./services/MongooseIdGenerator";
import { LoginUsuarioUseCase } from "../application/use-cases/Auth/LoginUsuarioUseCase";
import { JwtAuthTokenService } from "./auth/JwtAuthTokenService";
import { LogoutUsuarioUseCase } from "../application/use-cases/Auth/LogoutUsuarioUseCase";
import { AuthMiddleware } from "./auth/authMiddleware";
import { CrearVehiculoUseCase } from "../application/use-cases/Vehiculo/CrearVehiculoUseCase";
import { MongoVehiculoRepository } from "./database/mongodb/repositories/MongoVehiculioRepository";

const idGenerator = new MongooseIdGenerator();
const passwordHasher = new BcryptPasswordHasher();
const authTokenService = new JwtAuthTokenService();

const usuarioRepositorio = new MongoUsuarioRepository()
const vehiculoRepositorio = new MongoVehiculoRepository()

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
        }),
        logout: new LogoutUsuarioUseCase()
    },
    vehiculo: {
        crear: new CrearVehiculoUseCase({
            vehiculoRepositorio,
            idGenerator
        })
    },
    authMiddleware: new AuthMiddleware({
        authTokenService,
        usuarioRepositorio
    })
}