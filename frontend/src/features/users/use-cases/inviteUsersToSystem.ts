import type { HttpAdapter } from "../../../app/adapters/http.adapter";
import type { IResponse } from "../../../entities/response/IResponse";
import type { IInviteUsersData } from "../../../entities/Usuario/Usuario";

export type inviteUsersToSystemApiResponse = IResponse<'data', IInviteUsersData>


export const inviteUsersToSystem = async (fetcher: HttpAdapter, emails: string[])=>{
    const response = await fetcher.post<inviteUsersToSystemApiResponse>('/user/invite', { emails });
    return response.data
}