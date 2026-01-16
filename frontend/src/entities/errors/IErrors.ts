import type { IResponse } from "../response/IResponse";

export interface BaseError {
    message: string;
    code: string;
    origin: string;
    timestamp: number;
  }

  export type ValidationError = BaseError; //Por ahora no hay validaciones discriminadas desde la API

  export interface HttpError extends BaseError {
    status: number;
    details?: string;
  }
  
  export interface BusinessError extends BaseError {
    context?: Record<string, unknown>;
  }
  
  export type AppError = HttpError | ValidationError | BusinessError;
  
  // Error response estándar del backend
  export interface ApiErrorResponse extends IResponse { //Es un IResponse
    success: false;
    message: string;
    code: string;
  }

  