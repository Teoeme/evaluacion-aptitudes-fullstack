import { Router } from "express";
import { UsuarioController } from "../controllers/Usuario.controller";
import schemaValidator from "../middlewares/schemaValidator";
import { RegistrarUsuarioSchema } from "../../../application/dtos/Usuario/RegistrarUsuarioDto";
import { ServiceContainer } from "../../ServiceContainer";
import { Roles } from "../../../domain/value-objects/RolUsuario";

const router = Router();
const usuarioController = new UsuarioController();
const {withRoles} = ServiceContainer.authMiddleware;

router.post('/', schemaValidator(RegistrarUsuarioSchema), withRoles([Roles.ADMIN]), usuarioController.registrarUsuario);

export default router;