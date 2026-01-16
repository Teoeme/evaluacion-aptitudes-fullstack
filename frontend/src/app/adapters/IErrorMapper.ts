import type { AppError, BusinessError } from "../../entities/errors/IErrors";

export interface IErrorMapper {
     fromFetcherError(error: Error): AppError;
     fromUnknownError(error: unknown, origin: string): BusinessError;
     createCustomError(code:string,message:string, origin: string): BusinessError;
     isMappedError(error: unknown): boolean;

}