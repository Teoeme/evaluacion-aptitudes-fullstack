import type { HttpAdapter } from "../../../app/adapters/http.adapter"
import type { IResponse } from "../../../entities/response/IResponse"
import type { IAuthServiceUser } from "../../../entities/Usuario/Usuario"

export type getAvailableUsersToRegisterApiResponse = IResponse<'users', IAuthServiceUser[]>
export type getAvailableUsersToRegisterResult = IResponse<'users', IAuthServiceUser[]>

export const getAvailableUsersToRegister = async (fetcher: HttpAdapter): Promise<getAvailableUsersToRegisterResult> => {
    const response = await fetcher.get<getAvailableUsersToRegisterApiResponse>('/auth/users')
    return response
}