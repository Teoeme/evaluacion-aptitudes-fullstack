// // tests/setup.ts
// import mongoose from 'mongoose';
// import { beforeAll, afterAll, afterEach } from 'vitest';

// // Conectar a una DB de test antes de empezar
// beforeAll(async () => {
//     // Idealmente usa una variable de entorno TEST_DB_URI
//     await mongoose.connect(process.env.TEST_DB_URI || 'mongodb://localhost:27017/test_db');
// });

// // Limpiar colecciones después de cada test (para que no choquen datos)
// afterEach(async () => {
//     const collections = mongoose.connection.collections;
//     for (const key in collections) {
//         await collections[key].deleteMany({});
//     }
// });

// // Cerrar conexión al terminar todo
// afterAll(async () => {
//     await mongoose.connection.close();
// });