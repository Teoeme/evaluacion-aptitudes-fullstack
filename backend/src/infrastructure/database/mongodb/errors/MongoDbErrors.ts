import mongoose from "mongoose";
import { CustomError } from "../../../domain/errors/BaseErrors";


export class MongoDbError extends CustomError {
  mongoCode: number;
  constructor(message: string, details: string, mongoCode: number) {
    super(message, details);
    this.name = 'MongoDbError';
    this.details = `MongoDbError${details}`;
    this.mongoCode = mongoCode
  }
}

export const isMongooseError = (err: any): boolean => {
  return (
    err instanceof mongoose.Error ||
    err.name === 'MongoServerError' ||
    err.name === 'MongoError' ||
    err.code === 11000 || // Duplicate key error
    err.name === 'ValidationError' ||
    err.name === 'CastError' ||
    err.name === 'MongoNotConnectedError' ||
    err.name ==='MongooseError'
  );
};

export function mongoErrorDispatcher(err: mongoose.Error | any): MongoDbError {
  const errorName = err.name;
  const errorCode = err?.code || '';
 
  switch (errorName === 'MongoServerError' ? errorCode : errorName) { //Si el error es de MongoServer busca por codigo
    case 'CastError':
    case mongoose.Error.CastError.name:
      return new MongoDbError('Formato de datos invalido', `[CastError]: ${err.message}`, 100);
      
    case mongoose.Error.ValidationError.name:
      return new MongoDbError('Error de validacion', `[ValidationError]: ${err.message}`, 120);

    case 'DuplicatedKeyError':  
    case 11000: // El error de duplicado siempre viene como MongoServerError con este código
      return new MongoDbError('Duplicado encontrado', `[DuplicatedKeyError]: ${err.message}`, 11000);
      
    case 'InvalidQueryFormatError':
    case 2: 
      return new MongoDbError('Formato de consulta invalido', `[InvalidQueryFormatError]: ${err.message}`, 2);
      
    case 'InvalidDateValueError':
      return new MongoDbError('Fecha invalida', `[InvalidDateValueError]: ${err.message}`, 16001);

    case 'DatabaseConnectionError':
    case 'MongoNotConnectedError':
    case 'MongooseError':
      return new MongoDbError('Error de conexion a la base de datos', `[DatabaseConnectionError]: ${err.message}`, 123);

    case 'DatabaseDisconnectionError':
      return new MongoDbError('Error de desconexion a la base de datos', `[DatabaseDisconnectionError]: ${err.message}`, 124);

    default:
      return new MongoDbError(`Error inesperado: ${err.message}`, err.message, 666);
  }
}
