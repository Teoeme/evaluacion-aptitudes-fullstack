import { ResourceAlreadyExistsError } from "../../../domain/errors/BaseErrors";
import { IUsuarioRepositorio } from "../../../domain/repositories/IUsuarioRepositorio";
import { Email } from "../../../domain/value-objects/Email";
import { RegistrarUsuarioDto } from "../../dtos/Usuario/RegistrarUsuarioDto";
import { IPasswordHasher } from "../../../domain/services/IPasswordHasher";
import { Usuario } from "../../../domain/entities/Usuario";
import { RolUsuario } from "../../../domain/value-objects/RolUsuario";
import { IIdGenerator } from "../../../domain/services/IIdGenerator";
import { UsuarioMapper } from "../../dtos/Usuario/UsuarioMapper";

interface RegistrarUsuarioUseCaseDependencias {
    usuarioRepositorio: IUsuarioRepositorio;
    passwordHasher: IPasswordHasher;
    idGenerator: IIdGenerator;
}

export class RegistrarUsuarioUseCase {
    private readonly usuarioRepositorio;
    private readonly passwordHasher;
    private readonly idGenerator;

    constructor(
        {
            usuarioRepositorio,
            passwordHasher,
            idGenerator
        }: RegistrarUsuarioUseCaseDependencias
    ) {
        this.usuarioRepositorio = usuarioRepositorio
        this.passwordHasher = passwordHasher
        this.idGenerator = idGenerator
    }

    async execute(dto: RegistrarUsuarioDto) {
        const existeDni = await this.usuarioRepositorio.buscarPorDni(dto.dni);
        if (existeDni) {
            throw new ResourceAlreadyExistsError("Usuario", 'DNI', dto.dni);
        }
        const existeEmail = await this.usuarioRepositorio.buscarPorEmail(new Email(dto.email));
        if (existeEmail) {
            throw new ResourceAlreadyExistsError("Usuario", 'Email', dto.email);
        }

        const passwordHash = await this.passwordHasher.hash(dto.password);

        const nuevoUsuario = new Usuario({
            id: this.idGenerator.generate(),
            nombreCompleto: dto.nombreCompleto,
            dni: dto.dni,
            rol: new RolUsuario(dto.rol),
            area: dto.area,
            email: new Email(dto.email),
            password: passwordHash,
        });


        await this.usuarioRepositorio.guardar(nuevoUsuario);

        return UsuarioMapper.toDto(nuevoUsuario);
    }

}