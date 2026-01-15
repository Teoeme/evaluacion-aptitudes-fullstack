import { Router } from "express";
import { UsuarioController } from "../controllers/Usuario.controller";
import schemaValidator from "../middlewares/schemaValidator";
import { RegistrarUsuarioSchema } from "../../../application/dtos/Usuario/RegistrarUsuarioDto";

const router = Router();
const usuarioController = new UsuarioController();

router.post('/', schemaValidator(RegistrarUsuarioSchema), usuarioController.registrarUsuario);

export default router;