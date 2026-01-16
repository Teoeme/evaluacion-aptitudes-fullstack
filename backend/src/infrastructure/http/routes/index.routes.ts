import { Router } from "express";
import UsuarioRoutes from "./Usuario.routes";
import AuthRoutes from "./Auth.routes";

const router = Router();

router.use('/usuario', UsuarioRoutes);
router.use('/auth', AuthRoutes);

export default router;