import request from "supertest";
import { Roles, RolUsuario } from "../../src/domain/value-objects/RolUsuario";
import { Email } from "../../src/domain/value-objects/Email";
import { Usuario } from "../../src/domain/entities/Usuario";
import { ServiceContainer } from "../../src/infrastructure/ServiceContainer";
import { JwtAuthTokenService } from "../../src/infrastructure/auth/JwtAuthTokenService";
import { usuarioFactory } from "./factories";

export async function loginAsRole(app: any, role: Roles = Roles.ADMIN) {
  const usuario = usuarioFactory({ rol: role });

  const RegistrarUsuarioUseCase= ServiceContainer.usuario.registrar; 
  const usuarioRegistrado=await RegistrarUsuarioUseCase.execute(usuario);

  const tokenService = new JwtAuthTokenService();
  const token = await tokenService.generarToken({
    id: usuarioRegistrado.id,
    email: usuarioRegistrado.email,
    rol: usuarioRegistrado.rol,
  });

  const agent = request.agent(app);
  agent.jar.setCookie(`token=${token.value}`);
  return agent;
}