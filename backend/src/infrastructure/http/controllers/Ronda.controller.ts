import { Request, Response, NextFunction } from "express";
import { ServiceContainer } from "../../ServiceContainer";
import { HttpResponse } from "../utils/HttpResponse";
import { CrearRondaSchema } from "../../../application/dtos/Ronda/CrearRondaDto";
import { IdRequeridoSchema } from "../../../application/dtos/IdRequeridoDto";
import { ListarRondasQuerySchema } from "../../../application/dtos/Ronda/ListarRondasDto";

export class RondaController {
  async crear(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = CrearRondaSchema.parse(req.body);
      const actor = req.user!;
      const ronda = await ServiceContainer.ronda.crear.execute(dto, actor);
      return HttpResponse.created(res, ronda, "Ronda creada");
    } catch (error) {
      next(error);
    }
  }

  async obtener(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = IdRequeridoSchema.parse({ id: req.params.id });
      const ronda = await ServiceContainer.ronda.obtener.execute(dto);
      return HttpResponse.ok(res, ronda);
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = ListarRondasQuerySchema.parse(req.query);
      const rondas = await ServiceContainer.ronda.listar.execute(dto);
      return HttpResponse.ok(res, rondas);
    } catch (error) {
      next(error);
    }
  }

  async validacionesVehiculo(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = IdRequeridoSchema.parse({ id: req.params.id });
      const validaciones = await ServiceContainer.ronda.obtenerValidacionesPorVehiculo.execute(dto);
      return HttpResponse.ok(res, validaciones);
    } catch (error) {
      next(error);
    }
  }
}