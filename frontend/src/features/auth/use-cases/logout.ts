import { deleteCookie } from "../../../shared/utils/cookieUtils";

export const logoutUseCase = (): boolean => {
    const success = deleteCookie("token", {
      path: "/",
    });
    
    return success;
};
