import { Router } from "express";
import { UsuarioController } from "../controllers/Usuario.controller";
import schemaValidator from "../middlewares/schemaValidator";
import { LoginUsuarioSchema } from "../../../application/dtos/Auth/LoginUsuarioDto";
import { AuthController } from "../controllers/Auth.controller";
import { ServiceContainer } from "../../ServiceContainer";

const router = Router();
const authController = new AuthController();
const {authMiddleware} = ServiceContainer.authMiddleware;

router.post('/login',schemaValidator(LoginUsuarioSchema), authController.login);
router.post('/logout', authController.logout);
router.post('/verify-token',authMiddleware(), authController.verificarToken);
router.get('/who-am-i', authMiddleware(),authController.whoAmI);

export default router;