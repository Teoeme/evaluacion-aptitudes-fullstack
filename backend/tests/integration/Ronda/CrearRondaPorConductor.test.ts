import { describe, it, expect, beforeAll } from "vitest";
import { createApp } from "../../../src/infrastructure/http/app";
import { Roles } from "../../../src/domain/value-objects/RolUsuario";
import { usuarioFactory, vehiculoFactory, conductorFactory, validacionFactory, firmaDigitalFactory } from "../../utils/factories";
import { loginAsRole } from "../../utils/helper";
import { TiposResponsable } from "../../../src/domain/value-objects/TipoResponsable";
import { ErrorCode } from "../../../src/infrastructure/http/middlewares/errorHandler";

let app: any;

describe("Ronda - Conductor vehículo no asignado", () => {
  beforeAll(() => {
    app = createApp();
  });

  it("Debe fallar si conductor crea ronda para vehículo no asignado", async () => {
    // login admin para crear datos
    const adminAgent = await loginAsRole(app, Roles.ADMIN);

    // Usuario A (conductor que va a intentar crear)
    const usuarioConductor = await adminAgent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR, email: "a@test.com" }));
    const usuarioConductorId = usuarioConductor.body.data.id;

    const conductorA = await adminAgent.post("/api/conductor").send(conductorFactory({ usuarioId: usuarioConductorId }));
    const conductorAId = conductorA.body.data.id;

    // Usuario B (responsable del vehículo)
    const conductorB = await adminAgent.post("/api/usuario").send(usuarioFactory({ rol: Roles.CONDUCTOR, email: "b@test.com" }));
    const conductorBId = conductorB.body.data.id;

    const vehiculo = await adminAgent.post("/api/vehiculo").send(
      vehiculoFactory({ responsable: { id: conductorBId, tipo: TiposResponsable.USUARIO } })
    );
    const vehiculoId = vehiculo.body.data.id;

    // Validación
    const v1 = await adminAgent.post("/api/validacion").send(validacionFactory({ relevancia: 60, obligatoria: true }));

    // Login como conductor A
    const conductorAgent = await loginAsRole(app, Roles.CONDUCTOR);

    // Intento de crear ronda sobre vehículo de B
    const res = await conductorAgent.post("/api/ronda").send({
      vehiculoId,
      conductorId: conductorAId,
      kilometraje: 1200,
      firmaDigital: firmaDigitalFactory(),
      validaciones: [{ validacionId: v1.body.data.id, cumplida: true }],
    });

    expect(res.status).toBe(403);
    expect(res.body.code).toBe(ErrorCode.RONDA_CONDUCTOR_OTRO_CONDUCTOR);
  });
});