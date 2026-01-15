import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import { createApp } from '../../../src/infrastructure/http/app';
import { Roles } from '../../../src/domain/value-objects/RolUsuario';
import type {Express} from 'express'

let app:Express;

beforeAll(()=>{
    app = createApp();
})

describe('Registrar Usuario Integration Test', () => {
    
    const validUser = {
        nombreCompleto: 'Juan Perez',
        dni: '12345678',
        rol: Roles.CONDUCTOR,
        area: 'Logística',
        email: 'juan.perez@transporte.com',
        password: 'Password123!',
        confirmPassword: 'Password123!'
    };

    it('POST /api/usuarios - debería registrar un usuario exitosamente', async () => {
        const response = await request(app)
            .post('/api/usuario')
            .send(validUser);


        expect(response.status).toBe(201);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombreCompleto).toBe(validUser.nombreCompleto);
        expect(response.body.data.email).toBe(validUser.email);
        expect(response.body.data.rol).toBe(validUser.rol);
        
        expect(response.body.data).not.toHaveProperty('password');
    });

    it('POST /api/usuarios - debería fallar si las contraseñas no coinciden', async () => {
        const invalidUser = {
            ...validUser,
            dni: '87654321', 
            email: 'otro@test.com',
            confirmPassword: 'WrongPassword'
        };

        const response = await request(app)
            .post('/api/usuario')
            .send(invalidUser);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('Las contraseñas no coinciden');
    });

    it('POST /api/usuarios - debería fallar si el email ya existe', async () => {
        await request(app).post('/api/usuario').send(validUser);

        // Intentamos registrar el mismo email de nuevo
        const response = await request(app)
            .post('/api/usuario')
            .send({
                ...validUser,
                dni: '99999999' 
            });

        expect(response.status).toBe(409);
        expect(response.body.message).toContain('Email');
    });

    it('POST /api/usuarios - debería fallar con DNI inválido', async () => {
        const userWithBadDni = {
            ...validUser,
            dni: '123'
        };

        const response = await request(app)
            .post('/api/usuario')
            .send(userWithBadDni);

        expect(response.status).toBe(400);
        expect(response.body.details).toContain('DNI');
    });
});