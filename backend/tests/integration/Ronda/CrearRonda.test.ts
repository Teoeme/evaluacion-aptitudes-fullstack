import request from "supertest";
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { createApp } from "../../../src/infrastructure/http/app";
import { Roles, RolUsuario } from "../../../src/domain/value-objects/RolUsuario";
import { loginAsRole } from "../../utils/helper";
import { usuarioFactory, vehiculoFactory, conductorFactory, validacionFactory, firmaDigitalFactory } from "../../utils/factories";
import { TipoResponsable, TiposResponsable } from "../../../src/domain/value-objects/TipoResponsable";
import { ResponsableVehiculo } from "../../../src/domain/value-objects/ResponsableVehiculo";
import { BaseErrorCodes } from "../../../src/infrastructure/http/middlewares/errorHandler";

let app: any;
let agent: request.Agent;

describe("Crear Ronda - Integration Test", () => {
  beforeAll(async () => {
    app = createApp();
    agent = await loginAsRole(app, Roles.ADMIN);
});


  it("Debe crear ronda APTA", async () => {
       // Crear usuario, conductor y vehículo
       const user=usuarioFactory({ rol: Roles.CONDUCTOR })
       const userRes = await agent.post("/api/usuario").send(user);
       const usuarioId = userRes.body.data.id;

   
       const conductorRes = await agent.post("/api/conductor").send(conductorFactory({ usuarioId }));
       const conductorId = conductorRes.body.data.id;
   
       const vehiculoRes = await agent.post("/api/vehiculo").send(
         vehiculoFactory({ responsable: { id: usuarioId, tipo: TiposResponsable.USUARIO } })
       );
       const vehiculoId = vehiculoRes.body.data.id;
   
       // Crear validaciones activas
       const v1 = await agent.post("/api/validacion").send(validacionFactory({ relevancia: 50, obligatoria: true }));
       const v2 = await agent.post("/api/validacion").send(validacionFactory({ relevancia: 40, obligatoria: false }));

       const res = await agent.post("/api/ronda").send({
         vehiculoId,
         conductorId,
         kilometraje: 1500,
         firmaDigital: firmaDigitalFactory(),
         validaciones: [
           { validacionId: v1.body.data.id, cumplida: true },
           { validacionId: v2.body.data.id, cumplida: true },
         ]
       });

       expect(res.status).toBe(201);
       expect(res.body.data.estado.value).toBe("APTA");

  });

  it("Debe crear ronda NO APTA si falla obligatoria", async () => {
    const userRes = await agent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR }));
    const usuarioId = userRes.body.data.id;

    const conductorRes = await agent.post("/api/conductor").send(conductorFactory({ usuarioId }));
    const conductorId = conductorRes.body.data.id;

    const vehiculoRes = await agent.post("/api/vehiculo").send(
      vehiculoFactory({ responsable: { id: usuarioId, tipo: TiposResponsable.USUARIO } })
    );
    const vehiculoId = vehiculoRes.body.data.id;

    const v1 = await agent.post("/api/validacion").send(validacionFactory({ relevancia: 90, obligatoria: true }));

    const res = await agent.post("/api/ronda").send({
      vehiculoId,
      conductorId,
      kilometraje: 2000,
      firmaDigital: firmaDigitalFactory(),
      validaciones: [{ validacionId: v1.body.data.id, cumplida: false }],
    });
    expect(res.status).toBe(201);
    expect(res.body.data.estado.value).toBe("NO APTA");
  });

  it("Debe crear ronda NO APTA si cumplimiento < 85", async () => {
    const userRes = await agent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR }));
    const usuarioId = userRes.body.data.id;

    const conductorRes = await agent.post("/api/conductor").send(conductorFactory({ usuarioId }));
    const conductorId = conductorRes.body.data.id;

    const vehiculoRes = await agent.post("/api/vehiculo").send(
      vehiculoFactory({ responsable: { id: usuarioId, tipo: TiposResponsable.USUARIO } })
    );
    const vehiculoId = vehiculoRes.body.data.id;

    const v1 = await agent.post("/api/validacion").send(validacionFactory({ relevancia: 50, obligatoria: false }));
    const v2 = await agent.post("/api/validacion").send(validacionFactory({ relevancia: 30, obligatoria: false }));

    const res = await agent.post("/api/ronda").send({
      vehiculoId,
      conductorId,
      kilometraje: 2500,    
      firmaDigital: firmaDigitalFactory(),
      validaciones: [
        { validacionId: v1.body.data.id, cumplida: true },
        { validacionId: v2.body.data.id, cumplida: false },
      ],
    });


    expect(res.status).toBe(201);
    expect(res.body.data.estado.value).toBe("NO APTA");
  });

  it("Debe fallar si no se envía firma digital", async () => {
    const userRes = await agent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR }));
    const usuarioId = userRes.body.data.id;
  
    const conductorRes = await agent.post("/api/conductor").send(conductorFactory({ usuarioId }));
    const conductorId = conductorRes.body.data.id;
  
    const vehiculoRes = await agent.post("/api/vehiculo").send(
      vehiculoFactory({ responsable: { id: usuarioId, tipo: TiposResponsable.USUARIO } })
    );
    const vehiculoId = vehiculoRes.body.data.id;
  
    const v1 = await agent.post("/api/validacion").send(validacionFactory({ relevancia: 50, obligatoria: false }));
  
    const res = await agent.post("/api/ronda").send({
      vehiculoId,
      conductorId,
      kilometraje: 2000,
      validaciones: [{ validacionId: v1.body.data.id, cumplida: true }],
    });
    expect(res.status).toBe(400);
    expect(res.body.code).toBe(BaseErrorCodes.BAD_REQUEST);
    expect(res.body.success).toBe(false);

  });
  
});