import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";
import { createApp } from "../../../src/infrastructure/http/app";
import { Roles } from "../../../src/domain/value-objects/RolUsuario";
import { TiposVehiculo } from "../../../src/domain/value-objects/TipoVehiculo";
import { TiposResponsable } from "../../../src/domain/value-objects/TipoResponsable";
import type { Express } from "express";
import { loginAsRole } from "../../utils/helper";

let app: Express;
let agent:request.Agent;


describe("Desactivar Vehiculo - Integration Test", () => {
  beforeAll(async () => {
    app = createApp();
    agent = await loginAsRole(app,Roles.ADMIN);
  });

  it("PATCH /api/vehiculo/:id/desactivar - debería desactivar vehículo", async () => {

    const createRes = await agent.post("/api/vehiculo").send({
      dominio: "QWE987",
      marca: "Scania",
      modelo: "R500",
      tipo: TiposVehiculo.CAMION,
      anoFabricacion: 2017,
      kilometraje: 6000,
      responsable: { id: "admin-id", tipo: TiposResponsable.USUARIO },
      activo: true,
    });

    const id = createRes.body.data.id;

    const res = await agent.patch(`/api/vehiculo/${id}/desactivar`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const getRes = await agent.get(`/api/vehiculo/${id}`);
    expect(getRes.body.data.activo).toBe(false);
  });
});