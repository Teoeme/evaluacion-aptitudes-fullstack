import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidator";
import { ValidacionController } from "../controllers/Validacion.controller";
import { ServiceContainer } from "../../ServiceContainer";
import { Roles } from "../../../domain/value-objects/RolUsuario";
import { CrearValidacionSchema } from "../../../application/dtos/Validacion/CrearValidacionDto";
import { EditarValidacionSchema } from "../../../application/dtos/Validacion/EditarValidacionDto";
import { IdRequeridoSchema } from "../../../application/dtos/IdRequeridoDto";

const router = Router();
const controller = new ValidacionController();
const { withRoles } = ServiceContainer.authMiddleware;

router.post("/", schemaValidator(CrearValidacionSchema), withRoles([Roles.ADMIN]), controller.crear);
router.get("/", withRoles([Roles.ADMIN]), controller.listar);
router.get("/:id", schemaValidator(IdRequeridoSchema), withRoles([Roles.ADMIN]), controller.obtener);
router.put("/:id", schemaValidator(EditarValidacionSchema), withRoles([Roles.ADMIN]), controller.editar);

export default router;