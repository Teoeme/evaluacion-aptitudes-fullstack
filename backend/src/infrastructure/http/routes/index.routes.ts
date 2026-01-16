import { Router } from "express";
import UsuarioRoutes from "./Usuario.routes";
import AuthRoutes from "./Auth.routes";
import VehiculoRoutes from "./Vehiculo.routes";
import ConductorRoutes from "./Conductor.routes";
import ValidacionRoutes from "./Validacion.routes";
import RondaRoutes from "./Ronda.routes";

const router = Router();

router.use('/usuario', UsuarioRoutes);
router.use('/auth', AuthRoutes);
router.use('/vehiculo', VehiculoRoutes);
router.use('/conductor', ConductorRoutes);
router.use('/validacion', ValidacionRoutes);
router.use('/ronda', RondaRoutes);
export default router;