import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidator";
import { ConductorController } from "../controllers/Conductor.controller";
import { ServiceContainer } from "../../ServiceContainer";
import { Roles } from "../../../domain/value-objects/RolUsuario";
import { CrearConductorSchema } from "../../../application/dtos/Conductor/CrearConductorDto";
import { EditarConductorSchema } from "../../../application/dtos/Conductor/EditarConductorDto";
import { IdRequeridoSchema } from "../../../application/dtos/IdRequeridoDto";

const router = Router();
const controller = new ConductorController();
const { withRoles } = ServiceContainer.authMiddleware;

router.post("/", schemaValidator(CrearConductorSchema), withRoles([Roles.ADMIN]), controller.crear);
router.get("/", withRoles([Roles.ADMIN]), controller.listar);
router.get("/:id", schemaValidator(IdRequeridoSchema), withRoles([Roles.ADMIN]), controller.obtener);
router.put("/:id", schemaValidator(EditarConductorSchema), withRoles([Roles.ADMIN]), controller.editar);
router.patch("/:id/desactivar", schemaValidator(IdRequeridoSchema), withRoles([Roles.ADMIN]), controller.desactivar);

export default router;