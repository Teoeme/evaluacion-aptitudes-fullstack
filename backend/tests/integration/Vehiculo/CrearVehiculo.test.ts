
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

describe("Crear Vehiculo - Integration Test", () => {
  beforeAll(async () => {
    app = createApp();
    agent = await loginAsRole(app,Roles.ADMIN);
  });

  it.only("POST /api/vehiculo - debería crear un vehículo", async () => {

    const payload = {
      dominio: "ABC123",
      marca: "Ford",
      modelo: "Ranger",
      tipo: TiposVehiculo.CAMION,
      anoFabricacion: 2022,
      kilometraje: 1000,
      responsable: {
        id: "admin-id",
        tipo: TiposResponsable.USUARIO,
      },
      activo: true,
    };

    const res = await agent.post("/api/vehiculo").send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.dominio).toBe(payload.dominio);
  });

  it("POST /api/vehiculo - debería fallar con body inválido", async () => {

    const res = await agent.post("/api/vehiculo").send({
      dominio: "",
      marca: "",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});