import mongoose from "mongoose";
import { MongoDbError } from "../../http/utils/MongoDbErrors";
import chalk from "chalk";

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'evaluacion-aptitudes-dev';


interface ConnectOptions {
    uri?: string;
    dbName?: string;
}

export const connectToMongoDB = async (options?: ConnectOptions) => {
    const uri = options?.uri || MONGODB_URL;
    const dbName = options?.dbName || MONGODB_DATABASE;
     
    try {
            if(mongoose.connection.readyState === 1){
                console.log('Conexion a MongoDB ya establecida');
                return;
            }
            const mongooseOptions: mongoose.ConnectOptions = {
                dbName
            }

            await mongoose.connect(uri, mongooseOptions);

            console.log(chalk.white.bgGreenBright('Conexion a MongoDB establecida)'));
            return;
       
        } catch (error) {
            console.error('Error al conectar a MongoDB:', error);
            const mongoError = error instanceof Error ? error : new Error(String(error));
            throw new MongoDbError('Error al conectar a MongoDB', mongoError.message, 123);
            
        }
    };