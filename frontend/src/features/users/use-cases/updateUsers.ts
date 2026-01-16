import type { HttpAdapter } from "../../../app/adapters/http.adapter";
import type { IResponse } from "../../../entities/response/IResponse";
import type { IUser } from "../../../entities/Usuario/Usuario";

export interface UpdateUserParams {
    userId: string;
    updates:Partial<IUser>
}

export interface ChangeUserIsActiveParams {
    userId: string;
}

export type UseCaseUpdateUserResponse = IResponse
export type UseCaseUpdateUserResult = IResponse

export const updateUser = async (fetcher: HttpAdapter , params:UpdateUserParams)
: Promise<UseCaseUpdateUserResult> => {
        const result = await fetcher.put<UseCaseUpdateUserResponse>(`/user/${params.userId}`, params.updates)
        return result
}

export const activateUser = async (fetcher: HttpAdapter , params:ChangeUserIsActiveParams)
: Promise<UseCaseUpdateUserResult> => {
        const result = await fetcher.put<UseCaseUpdateUserResponse>(`/user/activate/${params.userId}`)
        return result
}

export const deactivateUser = async (fetcher: HttpAdapter , params:ChangeUserIsActiveParams)
: Promise<UseCaseUpdateUserResult> => {
        const result = await fetcher.put<UseCaseUpdateUserResponse>(`/user/deactivate/${params.userId}`)
        return result
}
