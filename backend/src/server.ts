import dotenv from 'dotenv'
dotenv.config();

import { connectToMongoDB } from "./infrastructure/database/mongodb/conexion";
import { createApp } from "./infrastructure/http/app";
import chalk from 'chalk';
const PORT=process.env.PORT || 3000;

async function startServer() {
    try {
        console.log(chalk.green('Conectando a la base de datos...'))
        await connectToMongoDB();
        const app = createApp();
        
        app.listen(PORT, () => {
            console.log(chalk.yellow(`Servidor corriendo en el puerto ${PORT}`));
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }   
}

startServer();