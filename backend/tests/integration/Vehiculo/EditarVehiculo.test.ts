import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";
import { createApp } from "../../../src/infrastructure/http/app";
import { Roles } from "../../../src/domain/value-objects/RolUsuario";
import { TiposVehiculo } from "../../../src/domain/value-objects/TipoVehiculo";
import { TiposResponsable } from "../../../src/domain/value-objects/TipoResponsable";
import type { Express } from "express";
import { loginAsRole } from "../../utils/helper";
import { ErrorCode } from "../../../src/infrastructure/http/middlewares/errorHandler";

let app: Express;
let agent:request.Agent;

const admin = {
  nombreCompleto: "Admin Test",
  dni: "99999999",
  rol: Roles.ADMIN,
  area: "Sistemas",
  email: "admin@test.com",
  password: "Password123!",
  confirmPassword: "Password123!",
};

async function loginAgent() {
  const agent = request.agent(app);
  await agent.post("/api/usuario").send(admin);
  await agent.post("/api/auth/login").send({
    email: admin.email,
    password: admin.password,
  });
  return agent;
}

describe("Editar Vehiculo - Integration Test", () => {
  beforeAll(async () => {
    app = createApp();
    agent = await loginAsRole(app,Roles.ADMIN);
  });

  it("PUT /api/vehiculo/:id - debería editar parcialmente", async () => {

    const createRes = await agent.post("/api/vehiculo").send({
      dominio: "JKL321",
      marca: "Nissan",
      modelo: "Frontier",
      tipo: TiposVehiculo.CAMION,
      anoFabricacion: 2019,
      kilometraje: 4000,
      responsable: { id: "admin-id", tipo: TiposResponsable.USUARIO },
      activo: true,
    });

    const id = createRes.body.data.id;

    const updateRes = await agent.put(`/api/vehiculo/${id}`).send({
      modelo: "Frontier PRO",
      kilometraje: 4500,
    });


    expect(updateRes.status).toBe(200);
    expect(updateRes.body.success).toBe(true);
    expect(updateRes.body.data.modelo).toBe("Frontier PRO");
    expect(updateRes.body.data.kilometraje).toBe(4500);
  });

  it("PUT /api/vehiculo/:id - debería fallar si no se envían cambios", async () => {
    const createRes = await agent.post("/api/vehiculo").send({
      dominio: "MNO654",
      marca: "Iveco",
      modelo: "Daily",
      tipo: TiposVehiculo.CAMION,
      anoFabricacion: 2018,
      kilometraje: 5000,
      responsable: { id: "admin-id", tipo: TiposResponsable.USUARIO },
      activo: true,
    });

    const id = createRes.body.data.id;

    const updateRes = await agent.put(`/api/vehiculo/${id}`).send({});

    expect(updateRes.status).toBe(400);
    expect(updateRes.body.code).toBe(ErrorCode.BAD_REQUEST);
    expect(updateRes.body.success).toBe(false);
  });
});