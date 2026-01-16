import { Request, Response, NextFunction } from "express";
import { HttpResponse } from "../utils/HttpResponse";
import { ServiceContainer } from "../../ServiceContainer";
import { CrearValidacionSchema } from "../../../application/dtos/Validacion/CrearValidacionDto";
import { IdRequeridoSchema } from "../../../application/dtos/IdRequeridoDto";
import { EditarValidacionSchema } from "../../../application/dtos/Validacion/EditarValidacionDto";

export class ValidacionController {
  async crear(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = CrearValidacionSchema.parse(req.body);
      const validacion = await ServiceContainer.validacion.crear.execute(dto);
      return HttpResponse.created(res, validacion, "Validación creada");
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const validaciones = await ServiceContainer.validacion.listar.execute();
      return HttpResponse.ok(res, validaciones);
    } catch (error) {
      next(error);
    }
  }

  async obtener(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = IdRequeridoSchema.parse(req.params);
      const validacion = await ServiceContainer.validacion.obtener.execute(dto);
      return HttpResponse.ok(res, validacion);
    } catch (error) {
      next(error);
    }
  }

  async editar(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = EditarValidacionSchema.parse({...req.body,...req.params});
      const validacion = await ServiceContainer.validacion.editar.execute(dto);
      return HttpResponse.ok(res, validacion, "Validación actualizada");
    } catch (error) {
      next(error);
    }
  }

}