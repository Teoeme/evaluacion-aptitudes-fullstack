import { Request, Response, NextFunction } from "express";
import { CrearVehiculoSchema } from "../../../application/dtos/Vehiculo/CrearVehiculoDto";
import { ServiceContainer } from "../../ServiceContainer";
import { HttpResponse } from "../utils/HttpResponse";
import { EditarVehiculoSchema } from "../../../application/dtos/Vehiculo/EditarVehiculoDto";
import { IdRequeridoSchema } from "../../../application/dtos/IdRequeridoDto";

export class VehiculoController {
  async crearVehiculo(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = CrearVehiculoSchema.parse(req.body);
      const vehiculo = await ServiceContainer.vehiculo.crear.execute(dto);
      return HttpResponse.created(res, vehiculo, "Vehículo creado exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async listarVehiculos(req: Request, res: Response, next: NextFunction) {
    try {
      const vehiculos = await ServiceContainer.vehiculo.listar.execute();
      return HttpResponse.ok(res, vehiculos, "Vehículos obtenidos");
    } catch (error) {
      next(error);
    }
  }

  async obtenerVehiculo(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = IdRequeridoSchema.parse({ id: req.params.id });
      const vehiculo = await ServiceContainer.vehiculo.obtener.execute(dto);
      return HttpResponse.ok(res, vehiculo, "Vehículo obtenido");
    } catch (error) {
      next(error);
    }
  }

  async actualizarVehiculo(req: Request, res: Response, next: NextFunction) {
    try {
    const dto = EditarVehiculoSchema.parse({...req.body, id: req.params.id});
      const vehiculo = await ServiceContainer.vehiculo.editar.execute(dto);
      return HttpResponse.ok(res, vehiculo, "Vehículo actualizado");
    } catch (error) {
      next(error);
    }
  }

  async desactivarVehiculo(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = IdRequeridoSchema.parse({ id: req.params.id });
      await ServiceContainer.vehiculo.desactivar.execute(dto);
      return HttpResponse.ok(res, { id: req.params.id }, "Vehículo desactivado");
    } catch (error) {
      next(error);
    }
  }
}