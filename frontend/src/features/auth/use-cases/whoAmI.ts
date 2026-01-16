import type { HttpAdapter } from "../../../app/adapters/http.adapter"
import type { IResponse } from "../../../entities/response/IResponse"
import type { UsuarioResponseDto } from "../../../entities/Usuario/Usuario"

export type WhoAmIUseCaseResponse = IResponse<UsuarioResponseDto>
export type WhoAmIUseCaseResult = IResponse<UsuarioResponseDto>

export const whoAmIUseCase = async (fetcher: HttpAdapter):Promise<WhoAmIUseCaseResult> =>{
    const result = await fetcher.get<WhoAmIUseCaseResponse>("/auth/who-am-i");
    return result
}