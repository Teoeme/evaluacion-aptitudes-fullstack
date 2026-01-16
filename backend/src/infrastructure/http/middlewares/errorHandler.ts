import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../domain/errors/BaseErrors";
import { zodErrorHandler } from "./schemaValidator";
import { ZodError } from "zod";
import { isMongooseError, mongoErrorDispatcher } from "../../database/mongodb/errors/MongoDbErrors";
import { RondaErrorsCodes } from "../../../domain/errors/RondaErrors";

export enum BaseErrorCodes {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  CONFLICT = 'CONFLICT',
  DATABASE_ERROR = 'DATABASE_ERROR',
  SERVICE_ERROR = 'SERVICE_ERROR',
  SYSTEM_CUOTA_ERROR = 'SYSTEM_CUOTA_ERROR',
  INTERNAL_VALIDATION_ERROR = 'INTERNAL_VALIDATION_ERROR',
}

export const ErrorCode = {
  ...BaseErrorCodes,
  ...RondaErrorsCodes,
} as const

const NODE_ENV = process.env.NODE_ENV || "development";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if(isMongooseError(err)){
   err = mongoErrorDispatcher(err);
  }

  if(err instanceof ZodError){
    err = zodErrorHandler(err,'errorHandler');
  }

  const { statusCode, code, details, overrideMessage } = errorMapper(err);

  res.status(statusCode).json({
    success: false,
    message: overrideMessage || err.message || "Error inesperado",
    code,
    details,
    stack: NODE_ENV === "development" ? err.stack : undefined,
    origin: NODE_ENV === "development" ? getCallerLocation(err) : undefined,
  });
};
export default errorHandler;

const errorMapper = (err: CustomError): { statusCode: number, code: BaseErrorCodes, details: string, overrideMessage?:string } => {
  if(err.code && err.statusCode){
    return {
      statusCode: err.statusCode,
      code: err.code as BaseErrorCodes,
      details: err.details || err.message,
      overrideMessage:err.message
    };
  }

  const instanceType = err.name;
  switch (instanceType) {
    case 'ResourceNotFoundError':
      return {
        statusCode: 404,
        code: BaseErrorCodes.RESOURCE_NOT_FOUND,
        details: err.message,
      };
    case 'ResourceAlreadyExistsError':
      return {
        statusCode: 409,
        code: BaseErrorCodes.RESOURCE_ALREADY_EXISTS,
        details: err.message,
      };
    case 'BadRequestError':
      return {
        statusCode: 400,
        code: BaseErrorCodes.BAD_REQUEST,
        details: err.details || err.message,
      };
    case 'SyntaxError':
      return {
        statusCode:400,
        code:BaseErrorCodes.BAD_REQUEST,
        overrideMessage:'Error de sintaxis en el JSON',
        details:err.message
      }
    case 'UnauthorizedOperationError':
      return {
        statusCode: 403,
        code: BaseErrorCodes.UNAUTHORIZED,
        details: err.details || err.message,
        overrideMessage:err.message
      };
    case 'UnauthorizedError':
      return {
        statusCode: 401,
        code: BaseErrorCodes.UNAUTHORIZED,
        details: err.details || err.message,
        overrideMessage:err.message
      };
    case 'AuthServiceError':
    case 'AuthEmailNotVerifiedError':
      return {
        statusCode: 424,
        code: err.code as BaseErrorCodes || BaseErrorCodes.SERVICE_ERROR,
        details: err.details || err.message,
        overrideMessage:err.message
      };
    case 'ForbiddenError':
      return {
        statusCode: 403,
        code: BaseErrorCodes.FORBIDDEN,
        details: err.details || err.message,
        overrideMessage:err.message
      };
    case 'InvalidResponseError':
      return {
        statusCode: 500,
        code: BaseErrorCodes.INTERNAL_ERROR,
        details: err.details || err.message,
        overrideMessage:err.message
      };
    case 'InvalidStateError':
      return {
        statusCode: 409,
        code: BaseErrorCodes.CONFLICT,
        details: err.details || err.message,
        overrideMessage:err.message
      };
    case 'MongoDbError':
      return {
        statusCode: 500,
        code: BaseErrorCodes.DATABASE_ERROR,
        details: err.details || err.message,
        overrideMessage:err.message
      };
    case 'SystemCuotaError':
      return {
        statusCode: 424,
        code: BaseErrorCodes.SYSTEM_CUOTA_ERROR,
        details: err.details || err.message,
        overrideMessage:err.message
      };
    case 'InternalValidationError':
      return {
        statusCode: 500,
        code: BaseErrorCodes.INTERNAL_VALIDATION_ERROR,
        details: err.details || err.message,
        overrideMessage:err.message
      };
      default:
      return {
        statusCode: 500,
        code: BaseErrorCodes.INTERNAL_ERROR,
        details: err.message || "Error inesperado",
      };
  }
}


function getCallerLocation(error: Error) {
  Error.captureStackTrace(error, getCallerLocation);

  const stackLines = error.stack?.split("\n");

  if (stackLines && stackLines.length >= 4) {
    return stackLines[3]?.trim() || "Unknown Location";
  } else {
    return "Unknown Location";
  }
}



