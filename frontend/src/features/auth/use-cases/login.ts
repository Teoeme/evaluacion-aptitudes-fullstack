import type { HttpAdapter } from "../../../app/adapters/http.adapter";
import type { IResponse } from "../../../entities/response/IResponse";
import type { IUserFromApi } from "../../../entities/Usuario/Usuario";

export interface LoginCredentials {
  email: string;
  password: string;
}

export type UseCaseLoginResponse = IResponse<"user", (IUserFromApi & { token: string })>
export type UseCaseLoginResult = IResponse<"user", (IUserFromApi & { token: string })>


export const useCaseLogin = async (
  fetcher: HttpAdapter,
  credentials: LoginCredentials
): Promise<UseCaseLoginResult> => {
  const response = await fetcher.post<UseCaseLoginResponse>(
    "/auth/login",
    credentials
  );
  
  return response
};
