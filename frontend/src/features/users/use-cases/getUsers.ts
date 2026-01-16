import type { HttpAdapter } from "../../../app/adapters/http.adapter";
import type { IResponse } from "../../../entities/response/IResponse";
import { RolUsuario } from "../../../entities/roles/Role";
import type { IUser, IUserFromApi } from "../../../entities/Usuario/Usuario";

export interface GetAllUsersQuery {
    fullName?: string;
    email?: string;
    username?: string;
    authId?: string;
}

export type UseCaseGetAllUsersResponse = IResponse<"users", IUserFromApi[]>
export type UseCaseGetAllUsersResult = IResponse<"users", IUser[]>


export const getAllUsers = async (
  fetcher: HttpAdapter,
  params?: GetAllUsersQuery
): Promise<UseCaseGetAllUsersResult> => {
  const result= await fetcher.get<UseCaseGetAllUsersResponse>(
    "/user/users",
    {
        params: params
    }
  );
  return {
    ...result,
    users: result.users.map(user => ({...user,role:new RolUsuario(user.role as unknown as string)}))
  }
};
