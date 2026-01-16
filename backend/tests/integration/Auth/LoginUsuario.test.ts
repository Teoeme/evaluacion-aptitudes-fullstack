import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import { createApp } from '../../../src/infrastructure/http/app';
import { Roles } from '../../../src/domain/value-objects/RolUsuario';
import type { Express } from 'express';
import { loginAsRole } from '../../utils/helper';

let app: Express;
let agent:request.Agent;
beforeAll(async () => {
  app = createApp();
  agent = await loginAsRole(app,Roles.ADMIN);
});

describe('Login Usuario Tests de Integración', () => {

  const usuario = {
    nombreCompleto: 'Juan Perez',
    dni: '12345678',
    rol: Roles.CONDUCTOR,
    area: 'Logística',
    email: 'juan.perez@transporte.com',
    password: 'Password123!',
    confirmPassword: 'Password123!'
  };

  it('POST /api/auth/login - debería loguear correctamente', async () => {
    await agent.post('/api/usuario').send(usuario);

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: usuario.email,
        password: usuario.password
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.headers['set-cookie']).toBeDefined();
    const cookies = response.headers['set-cookie'] as unknown as string[];
    expect(cookies).toBeDefined();
    expect(cookies.some(cookie => cookie.startsWith('token='))).toBe(true);
    expect(response.body.data).toHaveProperty('usuario');
    expect(response.body.data.usuario.email).toBe(usuario.email);
    expect(response.body.data.usuario.rol).toBe(usuario.rol);
  });

  it('POST /api/auth/login - debería fallar con password incorrecto', async () => {
    await agent.post('/api/usuario').send(usuario);

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: usuario.email,
        password: 'PasswordIncorrecto'
      });
    expect(response.status).toBe(403); 
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Credenciales inválidas');
  });

  it('POST /api/auth/login - debería fallar si el usuario no existe', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'noexiste@test.com',
        password: 'Password123!'
      });

    expect(response.status).toBe(403); 
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Credenciales inválidas');
  });
});