import request from "supertest";
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { createApp } from "../../../src/infrastructure/http/app";
import { Roles } from "../../../src/domain/value-objects/RolUsuario";
import { usuarioFactory, vehiculoFactory, conductorFactory, validacionFactory, firmaDigitalFactory } from "../../utils/factories";
import { TiposResponsable } from "../../../src/domain/value-objects/TipoResponsable";
import { loginAsRole } from "../../utils/helper";

let app: any;
let agent: request.Agent;

describe("Listar Rondas - Integration Test", () => {
  beforeAll(async () => {
    app = createApp();
    agent = await loginAsRole(app, Roles.ADMIN);
  });


  it("Debe listar por conductorId", async () => {
    const userRes = await agent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR, dni: "12333333" }));
    const usuarioId = userRes.body.data.id;

    const conductorRes = await agent.post("/api/conductor").send(conductorFactory({ usuarioId }));
    const conductorId = conductorRes.body.data.id;

    const vehiculoRes = await agent.post("/api/vehiculo").send(
      vehiculoFactory({ responsable: { id: usuarioId, tipo: TiposResponsable.USUARIO } })
    );
    const vehiculoId = vehiculoRes.body.data.id;

    const v1 = await agent.post("/api/validacion").send(validacionFactory({ relevancia: 60, obligatoria: true }));

    await agent.post("/api/ronda").send({
      vehiculoId,
      conductorId,
      kilometraje: 1500,
      firmaDigital: firmaDigitalFactory(),
      validaciones: [{ validacionId: v1.body.data.id, cumplida: true }],
    });
 
    await agent.post("/api/ronda").send({
      vehiculoId,
      conductorId,
      kilometraje: 1600,
      firmaDigital: firmaDigitalFactory(),
      validaciones: [{ validacionId: v1.body.data.id, cumplida: true }],
    });

    const res = await agent.get(`/api/ronda?conductorId=${conductorId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(2);
    expect(res.body.data[0].conductorId).toBe(conductorId);
  });

  it("Debe listar por vehiculoId", async () => {
    const userRes = await agent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR, dni: "11222333" }));
    const usuarioId = userRes.body.data.id;

    const conductorRes = await agent.post("/api/conductor").send(conductorFactory({ usuarioId }));
    const conductorId = conductorRes.body.data.id;

    const vehiculoRes = await agent.post("/api/vehiculo").send(
      vehiculoFactory({ responsable: { id: usuarioId, tipo: TiposResponsable.USUARIO } })
    );
    const vehiculoId = vehiculoRes.body.data.id;

    const v1 = await agent.post("/api/validacion").send(validacionFactory({ relevancia: 60, obligatoria: true }));

    await agent.post("/api/ronda").send({
      vehiculoId,
      conductorId,
      kilometraje: 1500,
      firmaDigital: firmaDigitalFactory(),
      validaciones: [{ validacionId: v1.body.data.id, cumplida: true }],
    });

    await agent.post("/api/ronda").send({
      vehiculoId,
      conductorId,
      kilometraje: 1600,
      firmaDigital: firmaDigitalFactory(),
      validaciones: [{ validacionId: v1.body.data.id, cumplida: false }],
    });

    const res = await agent.get(`/api/ronda?vehiculoId=${vehiculoId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(2);
    expect(res.body.data[0].vehiculoId).toBe(vehiculoId);
  });

  it("Debe listar por fecha", async () => {
    const userRes = await agent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR, dni: "11111111" }));
    const usuarioId = userRes.body.data.id;

    const conductorRes = await agent.post("/api/conductor").send(conductorFactory({ usuarioId }));
    const conductorId = conductorRes.body.data.id;

    const vehiculoRes = await agent.post("/api/vehiculo").send(
      vehiculoFactory({ responsable: { id: usuarioId, tipo: TiposResponsable.USUARIO } })
    );
    const vehiculoId = vehiculoRes.body.data.id;

    const v1 = await agent.post("/api/validacion").send(validacionFactory({ relevancia: 60, obligatoria: true }));

    await agent.post("/api/ronda").send({
      vehiculoId,
      conductorId,
      kilometraje: 1500,
      firmaDigital: firmaDigitalFactory(),
      validaciones: [{ validacionId: v1.body.data.id, cumplida: true }],
    });

    const hoy = new Date().toISOString();
    const res = await agent.get(`/api/ronda?fecha=${encodeURIComponent(hoy)}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});