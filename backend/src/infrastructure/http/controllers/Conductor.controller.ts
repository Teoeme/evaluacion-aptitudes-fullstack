import { Request, Response, NextFunction } from "express";
import { HttpResponse } from "../utils/HttpResponse";
import { ServiceContainer } from "../../ServiceContainer";
import { IdRequeridoSchema } from "../../../application/dtos/IdRequeridoDto";

export class ConductorController {
  async crear(req: Request, res: Response, next: NextFunction) {
    try {
      const conductor = await ServiceContainer.conductor.crear.execute(req.body);
      return HttpResponse.created(res, conductor, "Conductor creado");
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const conductores = await ServiceContainer.conductor.listar.execute();
      return HttpResponse.ok(res, conductores);
    } catch (error) {
      next(error);
    }
  }

  async obtener(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = IdRequeridoSchema.parse({id:req.params.id});
      const conductor = await ServiceContainer.conductor.obtener.execute(dto);
      return HttpResponse.ok(res, conductor);
    } catch (error) {
      next(error);
    }
  }

  async editar(req: Request, res: Response, next: NextFunction) {
    try {
      const conductor = await ServiceContainer.conductor.editar.execute({ id: req.params.id, ...req.body });
      return HttpResponse.ok(res, conductor, "Conductor actualizado");
    } catch (error) {
      next(error);
    }
  }

  async desactivar(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = IdRequeridoSchema.parse({id:req.params.id});
      await ServiceContainer.conductor.desactivar.execute(dto);
      return HttpResponse.ok(res, { id: req.params.id }, "Conductor desactivado");
    } catch (error) {
      next(error);
    }
  }
}