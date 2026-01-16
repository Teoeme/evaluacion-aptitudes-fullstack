import request from "supertest";
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { createApp } from "../../../src/infrastructure/http/app";
import { Roles } from "../../../src/domain/value-objects/RolUsuario";
import { usuarioFactory, conductorFactory } from "../../utils/factories";
import { loginAsRole } from "../../utils/helper";

let app: any;
let agent: request.Agent;

describe("Conductor CRUD - Integration Test", () => {
  beforeAll(async () => {
    app = createApp();
    agent = await loginAsRole(app, Roles.ADMIN);
});


  it("POST /api/conductor - debería crear un conductor", async () => {
    const userRes = await agent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR }));
    const usuarioId = userRes.body.data.id;

    const res = await agent.post("/api/conductor").send(conductorFactory({ usuarioId }));

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.usuarioId).toBe(usuarioId);
  });

  it("GET /api/conductor - debería listar conductores", async () => {
    const userRes = await agent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR }));
    const usuarioId = userRes.body.data.id;

    await agent.post("/api/conductor").send(conductorFactory({ usuarioId }));

    const res = await agent.get("/api/conductor");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("GET /api/conductor/:id - debería obtener un conductor", async () => {
    const userRes = await agent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR }));
    const usuarioId = userRes.body.data.id;

    const createRes = await agent.post("/api/conductor").send(conductorFactory({ usuarioId }));
    const conductorId = createRes.body.data.id;

    const res = await agent.get(`/api/conductor/${conductorId}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(conductorId);
  });

  it("PUT /api/conductor/:id - debería editar parcialmente", async () => {
    const userRes = await agent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR }));
    const usuarioId = userRes.body.data.id;

    const createRes = await agent.post("/api/conductor").send(conductorFactory({ usuarioId }));
    const conductorId = createRes.body.data.id;

    const res = await agent.put(`/api/conductor/${conductorId}`).send({
      empresa: "Nueva Empresa SA",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.empresa).toBe("Nueva Empresa SA");
  });

  it("PATCH /api/conductor/:id/desactivar - debería desactivar conductor", async () => {
    const userRes = await agent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR }));
    const usuarioId = userRes.body.data.id;

    const createRes = await agent.post("/api/conductor").send(conductorFactory({ usuarioId }));
    const conductorId = createRes.body.data.id;

    const res = await agent.patch(`/api/conductor/${conductorId}/desactivar`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const getRes = await agent.get(`/api/conductor/${conductorId}`);
    expect(getRes.body.data.estado.value).toBe("Inactivo");
  });
});