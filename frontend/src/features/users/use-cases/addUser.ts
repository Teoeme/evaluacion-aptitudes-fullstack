import { fetcher } from "../../../app/instances/axios.intance"
import type { IResponse } from "../../../entities/response/IResponse"
import type { IAuthServiceUser, IUser } from "../../../entities/Usuario/Usuario"

type RegisterUserProps ={
    user:IAuthServiceUser & {role:string, area:string}
}

export type registerUserApiResponse = IResponse<'user', IUser>
export const registerUser = async ({user}:RegisterUserProps):Promise<registerUserApiResponse>=>{
    const response = await fetcher.post<registerUserApiResponse>('/user', user)
    return response
}