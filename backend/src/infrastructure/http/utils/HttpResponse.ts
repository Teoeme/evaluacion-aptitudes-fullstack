export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    metadata?: any; 
}

export class HttpResponse {
    static ok<T>(res: any, data: T, message: string = 'Operación exitosa') {
        const response: ApiResponse<T> = {
            success: true,
            data,
            message
        };
        return res.status(200).json(response);
    }

    static created<T>(res: any, data: T, message: string = 'Recurso creado exitosamente') {
        const response: ApiResponse<T> = {
            success: true,
            data,
            message
        };
        return res.status(201).json(response);
    }
}