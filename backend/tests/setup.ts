import dotenv from 'dotenv'
dotenv.config();

import chalk from 'chalk';
import mongoose from 'mongoose';
import { beforeAll, afterAll, afterEach } from 'vitest';

// backend/tests/setup.ts
beforeAll(async () => {
    // Cada worker tendrá un nombre de DB único: test_db_1, test_db_2, etc.
    const workerId = process.env.VITEST_WORKER_ID || '1';
    const baseDbName = process.env.MONGODB_TEST_DATABASE || 'evaluacion-aptitudes-test';
    const dynamicDbName = `${baseDbName}_${workerId}`;
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(process.env.MONGODB_TEST_URL || 'mongodb://localhost:27017/test_db', {
                dbName: dynamicDbName 
            });
        } catch (error) {
            console.log(chalk.blue(`Error al conectar db ${workerId} -> DB: ${dynamicDbName}`));
            console.error(error);
        }
    }
});


afterAll(async () => {
    try {
        if (mongoose.connection.db) {
            await mongoose.connection.db.dropDatabase();
        }
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error limpiando la DB del worker:', error);
    }
});