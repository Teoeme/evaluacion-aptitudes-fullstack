import { UnauthorizedError } from "../../../domain/errors/BaseErrors";
import { IAuthTokenService } from "../../../domain/services/IAuthTokenService";



export class VerificarTokenUseCase {
    private readonly authTokenService: IAuthTokenService;

    constructor(dependencias: {
        authTokenService: IAuthTokenService;
    }) {
        this.authTokenService = dependencias.authTokenService;
    }

    async execute(token: string): Promise<{ valid: boolean; payload?: { id: string; email: string; rol: string } }> {
        try {
            const payload = await this.authTokenService.verificarToken(token);
            return {
                valid: true,
                payload: {
                    id: payload.id,
                    email: payload.email,
                    rol: payload.rol,
                },
            };
        } catch (error) {
            throw new UnauthorizedError('Token inválido o expirado');
        }
    }
}