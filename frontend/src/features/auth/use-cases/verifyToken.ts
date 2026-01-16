import type { HttpAdapter } from "../../../app/adapters/http.adapter";
import type { IResponse } from "../../../entities/response/IResponse";


export type UseCaseVerifyTokenResponse = IResponse
export type UseCaseVerifyTokenResult = IResponse

export const useCaseVerifyToken = async (fetcher: HttpAdapter):
 Promise<UseCaseVerifyTokenResult> => {
        const result = await fetcher.post<UseCaseVerifyTokenResponse>("/auth/verify-token");
        return result
}

