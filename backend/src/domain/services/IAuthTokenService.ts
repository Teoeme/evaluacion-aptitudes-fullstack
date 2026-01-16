export interface IAuthTokenPayload {
    id: string;
    email: string;
    rol: string;
}

export interface IAuthTokenService {
    generarToken(payload:IAuthTokenPayload): Promise<{value:string,expiresIn:number}>;
    verificarToken(token: string): Promise<IAuthTokenPayload>;
}