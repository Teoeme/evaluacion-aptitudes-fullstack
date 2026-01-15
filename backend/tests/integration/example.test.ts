// import request from 'supertest';
// import { describe, it, expect } from 'vitest';
// import { app } from '../../src/app'; // Asegúrate de exportar 'app' en tu app.ts sin el .listen()

// describe('Auth Routes Integration', () => {
  
//   it('POST /api/auth/register - should register a user successfully', async () => {
//     const newUser = {
//       email: 'test@example.com',
//       password: 'SecurePassword123!',
//       name: 'Test User'
//     };

//     const response = await request(app)
//       .post('/api/auth/register')
//       .send(newUser);

//     // 1. Validar respuesta HTTP
//     expect(response.status).toBe(201);
    
//     // 2. Validar estructura del body
//     expect(response.body).toHaveProperty('token');
//     expect(response.body.user).toHaveProperty('id');
//     expect(response.body.user.email).toBe(newUser.email);
    
//     // 3. (Opcional) Validar seguridad: que NO devuelva el password
//     expect(response.body.user).not.toHaveProperty('password');
//   });

//   it('POST /api/auth/register - should fail with invalid email', async () => {
//     const badUser = {
//         email: 'not-an-email',
//         password: '123'
//     };

//     const response = await request(app).post('/api/auth/register').send(badUser);
    
//     // Esto demuestra que tu Zod y Middleware de errores funcionan
//     expect(response.status).toBe(400); 
//   });
// });