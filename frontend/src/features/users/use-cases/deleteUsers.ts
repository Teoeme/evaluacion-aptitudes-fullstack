import type { IResponse } from "../../../entities/response/IResponse"
import type { HttpAdapter } from "../../../app/adapters/http.adapter"

export type UseCaseDeleteUsersParams = {
    userId: string
}

export type UseCaseDeleteUsersResponse=IResponse

export const deleteUser = async(fetcher:HttpAdapter,userId:string) : Promise<UseCaseDeleteUsersResponse>=>{
    return await fetcher.delete<UseCaseDeleteUsersResponse>(`/user/${userId}`)
}