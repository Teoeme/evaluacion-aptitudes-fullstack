import { Router } from "express";
import UsuarioRoutes from "./Usuario.routes";

const router = Router();

router.use('/usuario', UsuarioRoutes);

export default router;