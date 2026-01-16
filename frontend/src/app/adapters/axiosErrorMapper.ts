import type {
  AppError,
  ApiErrorResponse,
  HttpError,
  ValidationError,
  BusinessError,
} from "../../entities/errors/IErrors";
import { ApiErrorCodes } from "../../entities/errors/APIErrors";
import type { IErrorMapper } from "./IErrorMapper";
import type { AxiosError } from "axios";



export class AxiosErrorMapper implements IErrorMapper {

  fromFetcherError = (error: Error): AppError => {
    const response = (error as AxiosError).response;
    const data = response?.data as ApiErrorResponse;

    if (response?.status === 400 && data?.code === ApiErrorCodes.BAD_REQUEST) {
      return {
        message: data.message || "Error de validación",
        code: data.code || ApiErrorCodes.BAD_REQUEST,
        origin: "API",
        timestamp: new Date().getDate(),
      } as ValidationError;
    }

    // Otro error desde api
    return {
      message: data?.message || (error as Error).message || "Error de conexión",
      code: data?.code || this.getErrorCodeFromStatus(response?.status),
      origin: "API",
      timestamp: new Date().getDate(),
      status: response?.status || 0,
      details: response?.statusText,
    } as HttpError;
  };

  fromUnknownError = (
    error: unknown,
    origin: string = "UNKNOWN"
  ): BusinessError => {
    const message = error instanceof Error ? error.message : "Error inesperado";

    return {
      message,
      code: "UNKNOWN_ERROR",
      origin,
      timestamp: new Date().getDate(),
      context: { originalError: error },
    };
  };

  createCustomError = (code:string,message:string, origin: string): BusinessError => {
    return {
      message,
      code,
      origin,
      timestamp: new Date().getDate(),
    };
  };

  isMappedError = (error: unknown): boolean => {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      "message" in error &&
      "origin" in error &&
      "timestamp" in error
    );
  };

  private getErrorCodeFromStatus = (status?: number): string => {
    const codes: Record<number, string> = {
      400: ApiErrorCodes.BAD_REQUEST,
      401: ApiErrorCodes.UNAUTHORIZED,
      403: ApiErrorCodes.FORBIDDEN,
      404: ApiErrorCodes.RESOURCE_NOT_FOUND,
      409: ApiErrorCodes.CONFLICT,
      422: ApiErrorCodes.INTERNAL_ERROR,
      500: ApiErrorCodes.INTERNAL_ERROR,
      502: ApiErrorCodes.INTERNAL_ERROR,
      503: ApiErrorCodes.INTERNAL_ERROR,
    };

    return codes[status || 0] || ApiErrorCodes.INTERNAL_ERROR;
  };
  
}
