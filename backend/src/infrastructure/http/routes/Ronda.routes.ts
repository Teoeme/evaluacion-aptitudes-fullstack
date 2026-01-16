import { Router } from "express";
import { RondaController } from "../controllers/Ronda.controller";
import schemaValidator from "../middlewares/schemaValidator";
import { CrearRondaSchema } from "../../../application/dtos/Ronda/CrearRondaDto";
import { ServiceContainer } from "../../ServiceContainer";
import { Roles } from "../../../domain/value-objects/RolUsuario";
import { IdRequeridoSchema } from "../../../application/dtos/IdRequeridoDto";

const router = Router();
const controller = new RondaController();
const { withRoles } = ServiceContainer.authMiddleware;

router.get("/validaciones/:id", withRoles([Roles.ADMIN, Roles.CONDUCTOR]), controller.validacionesVehiculo);
router.post("/", schemaValidator(CrearRondaSchema), withRoles([Roles.ADMIN, Roles.CONDUCTOR]), controller.crear);
router.get("/", withRoles([Roles.ADMIN]), controller.listar);
router.get("/:id", schemaValidator(IdRequeridoSchema), withRoles([Roles.ADMIN]), controller.obtener);

export default router;