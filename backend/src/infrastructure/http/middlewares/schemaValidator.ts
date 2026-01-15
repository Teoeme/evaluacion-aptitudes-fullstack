/* Middleware para la vlaidacion de esquemas con ZOD antes de que la request llegue al middleware de autenticacion y luego al controlador */

import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";
import { BadRequestError, InternalValidationError } from "../../../domain/errors/BaseErrors";

/* 
SchemaValidator como middleware de la request
*/
const schemaValidator = (schema: ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const mergedData={...req.body, ...req.params, ...req.query};
            const { error } = schema.safeParse(mergedData);
            if (error) {
                return next(zodErrorHandler(error,'middleware'));
            }
            next();
        } catch (error) {
            return next(error);
        }
    }
}

export const zodErrorHandler = (error: ZodError,variant:'middleware' | 'errorHandler'='middleware') => {
    const errorMessage = error.issues.map(issue => {
        const code=issue.code;
        switch(code){
            case 'unrecognized_keys':
                return `No se esperaba el campo ${issue.keys.join(', ')}`;
            default:
                return issue.message || 'Error de validacion';
        }
    }).join(' | ');

    const details = error.issues.map(issue => {
        const hasPath = issue.path.length > 0;
        if (hasPath) {
            return `Campo ${issue.path.join('.')}: ${issue.message}`;
        }
        
        return issue.message;
    }).join(' | ');

    if(variant === 'errorHandler'){
        return new InternalValidationError(`Error de validacion interna`,`[InternalValidation] ${details}`);
    }else{
        return new BadRequestError(errorMessage,details);
    }
}


export default schemaValidator;