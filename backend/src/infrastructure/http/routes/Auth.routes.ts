import { Router } from "express";
import { UsuarioController } from "../controllers/Usuario.controller";
import schemaValidator from "../middlewares/schemaValidator";
import { LoginUsuarioSchema } from "../../../application/dtos/Auth/LoginUsuarioDto";
import { AuthController } from "../controllers/Auth.controller";

const router = Router();
const authController = new AuthController();

router.post('/login',schemaValidator(LoginUsuarioSchema), authController.login);

export default router;