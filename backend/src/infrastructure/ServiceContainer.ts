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
import { ListarVehiculosUseCase } from "../application/use-cases/Vehiculo/ListarVehiculosUseCase";
import { ObtenerVehiculoUseCase } from "../application/use-cases/Vehiculo/ObtenerVehiculoUseCase";
import { EditarVehiculoUseCase } from "../application/use-cases/Vehiculo/EditarVehiculoUseCase";
import { DesactivarVehiculoUseCase } from "../application/use-cases/Vehiculo/DesactivarVehiculoUseCase";
import { ListarConductoresUseCase } from "../application/use-cases/Conductor/ListarConductorUseCase";
import { ObtenerConductorUseCase } from "../application/use-cases/Conductor/ObtenerConductorUseCase";
import { EditarConductorUseCase } from "../application/use-cases/Conductor/EditarConductorUseCase";
import { DesactivarConductorUseCase } from "../application/use-cases/Conductor/DesactivarConductorUseCase";
import { CrearConductorUseCase } from "../application/use-cases/Conductor/CrearConductorUseCase";
import { MongoConductorRepository } from "./database/mongodb/repositories/MongoConductorRepository";
import { CrearValidacionUseCase } from "../application/use-cases/Validacion/CrearValidacionUseCase";
import { ListarValidacionesUseCase } from "../application/use-cases/Validacion/ListarValidacionesUseCase";
import { ObtenerValidacionUseCase } from "../application/use-cases/Validacion/ObtenerValidacionUseCase";
import { EditarValidacionUseCase } from "../application/use-cases/Validacion/EditarValidacionUseCase";
import { MongoValidacionRepository } from "./database/mongodb/repositories/MongoValidacionRepository";
import { CrearRondaUseCase } from "../application/use-cases/Ronda/CrearRondaUseCase";
import { ListarRondasUseCase } from "../application/use-cases/Ronda/ListarRondasUseCase";
import { ObtenerRondaUseCase } from "../application/use-cases/Ronda/ObtenerRondaUseCase";
import { MongoRondaRepository } from "./database/mongodb/repositories/MongoRondaRepository";
import { ObtenerValidacionesPorVehiculoUseCase } from "../application/use-cases/Ronda/ObtenerValidacionesPorVehiculoUseCase";
import { VerificarTokenUseCase } from "../application/use-cases/Auth/VerificarTokenUseCase";
import { WhoAmIUseCase } from "../application/use-cases/Auth/WhoAmIUseCase";

const idGenerator = new MongooseIdGenerator();
const passwordHasher = new BcryptPasswordHasher();
const authTokenService = new JwtAuthTokenService();

const usuarioRepositorio = new MongoUsuarioRepository()
const vehiculoRepositorio = new MongoVehiculoRepository()
const conductorRepositorio = new MongoConductorRepository()
const validacionRepositorio = new MongoValidacionRepository()
const rondaRepositorio = new MongoRondaRepository()

export const ServiceContainer = {
    usuario: {
        registrar: new RegistrarUsuarioUseCase({usuarioRepositorio,idGenerator,passwordHasher})
    },
    auth: {
        login: new LoginUsuarioUseCase({usuarioRepositorio,passwordHasher,authTokenService}),
        logout: new LogoutUsuarioUseCase(),
        verificarToken: new VerificarTokenUseCase({authTokenService}),
        whoAmI: new WhoAmIUseCase({usuarioRepositorio}),
    },
    vehiculo: {
        crear: new CrearVehiculoUseCase({ vehiculoRepositorio, idGenerator }),
        listar: new ListarVehiculosUseCase({ vehiculoRepositorio }),
        obtener: new ObtenerVehiculoUseCase({ vehiculoRepositorio }),
        editar: new EditarVehiculoUseCase({ vehiculoRepositorio }),
        desactivar: new DesactivarVehiculoUseCase({ vehiculoRepositorio }),
      },
      conductor: {
          crear: new CrearConductorUseCase({ conductorRepositorio, usuarioRepositorio, idGenerator }),
          listar: new ListarConductoresUseCase({ conductorRepositorio }),
          obtener: new ObtenerConductorUseCase({ conductorRepositorio }),
          editar: new EditarConductorUseCase({ conductorRepositorio }),
          desactivar: new DesactivarConductorUseCase({ conductorRepositorio }),
        },
    validacion: {
        crear: new CrearValidacionUseCase({ validacionRepositorio, idGenerator }),
        listar: new ListarValidacionesUseCase({ validacionRepositorio }),
        obtener: new ObtenerValidacionUseCase({ validacionRepositorio }),
        editar: new EditarValidacionUseCase({ validacionRepositorio }),
    },
    ronda:{
        crear: new CrearRondaUseCase({ rondaRepositorio, vehiculoRepositorio, conductorRepositorio, validacionRepositorio, idGenerator }),
        listar: new ListarRondasUseCase({ rondaRepositorio, }),
        obtener: new ObtenerRondaUseCase({ rondaRepositorio }),
        obtenerValidacionesPorVehiculo: new ObtenerValidacionesPorVehiculoUseCase({ vehiculoRepositorio, validacionRepositorio }),
    },
    authMiddleware: new AuthMiddleware({authTokenService,usuarioRepositorio}),
}