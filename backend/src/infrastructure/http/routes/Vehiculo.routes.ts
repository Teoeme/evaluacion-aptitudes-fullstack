import { Router } from "express";
import { VehiculoController } from "../controllers/Vehiculo.controller";
import schemaValidator from "../middlewares/schemaValidator";
import { CrearVehiculoSchema } from "../../../application/dtos/Vehiculo/CrearVehiculoDto";
import { ServiceContainer } from "../../ServiceContainer";
import { Roles } from "../../../domain/value-objects/RolUsuario";
import { EditarVehiculoSchema } from "../../../application/dtos/Vehiculo/EditarVehiculoDto";
import { IdRequeridoSchema } from "../../../application/dtos/IdRequeridoDto";

const router = Router();
const vehiculoController = new VehiculoController();
const { withRoles } = ServiceContainer.authMiddleware;

router.post("/", schemaValidator(CrearVehiculoSchema), withRoles([Roles.ADMIN]), vehiculoController.crearVehiculo);
router.get("/", withRoles([Roles.ADMIN]), vehiculoController.listarVehiculos);
router.get("/:id",schemaValidator(IdRequeridoSchema), withRoles([Roles.ADMIN]), vehiculoController.obtenerVehiculo);
router.put("/:id", schemaValidator(EditarVehiculoSchema), withRoles([Roles.ADMIN]), vehiculoController.actualizarVehiculo);
router.patch("/:id/desactivar", schemaValidator(IdRequeridoSchema), withRoles([Roles.ADMIN]), vehiculoController.desactivarVehiculo);

export default router;