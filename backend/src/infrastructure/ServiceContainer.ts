import { RegistrarUsuarioUseCase } from "../application/use-cases/Usuario/RegistrarUsuarioUseCase";
import { MongoUsuarioRepository } from "./database/mongodb/repositories/MongoUsuarioRepository";
import { BcryptPasswordHasher } from "./services/BcryptPasswordHasher";
import { MongooseIdGenerator } from "./services/MongooseIdGenerator";

const idGenerator = new MongooseIdGenerator();
const passwordHasher = new BcryptPasswordHasher();

const usuarioRepositorio = new MongoUsuarioRepository()

export const ServiceContainer = {
    usuario: {
        registrar: new RegistrarUsuarioUseCase({
            usuarioRepositorio,
            idGenerator,
            passwordHasher
        })
    }
}