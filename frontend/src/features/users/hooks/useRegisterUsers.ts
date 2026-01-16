import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../app/instances/axios.intance";
import { getAvailableUsersToRegister } from "../use-cases/getAvailableUsersToRegister";
// import { registerUser } from '../use-cases/addUser'
import { useEffect, useState } from "react";
import { registerUser } from "../use-cases/addUser";
import type { AppError } from "../../../entities/errors/IErrors";
import { inviteUsersToSystem } from "../use-cases/inviteUsersToSystem";
import type { IAuthServiceUser } from "../../../entities/Usuario/Usuario";
import type { StagedUserToAdd } from "../components/add-users/AddUserModal";

export const useRegisterUsers = () => {
  const [registerUsersLoading, setRegisterUsersLoading] = useState(false);
  const [inviteUsersLoading, setInviteUsersLoading] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<IAuthServiceUser[]>([])
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["availableUsers"],
    // refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    // enabled: isOpen,  
    // staleTime: 1000 * 60 * 60,
    // gcTime: 1000 * 60 * 20,
    queryFn: () => getAvailableUsersToRegister(fetcher),
  });

  useEffect(()=>{
    if(data){
      setAvailableUsers(data.users)  
    }
  },[data])

  const registerUsers = async (
    stagedUsersToAdd: StagedUserToAdd[]
  ): Promise<{ success: boolean }> => {
    try {
      setRegisterUsersLoading(true);
      for (const user of stagedUsersToAdd) {
        await registerUser({ user: user });
      }
      await refetch();
      return { success: true };
    } catch (err: AppError | unknown) {
      throw new Error((err as AppError).message || "Error al agregar usuarios");
    } finally {
      setRegisterUsersLoading(false);
    }
  };

  const handleInviteUsersToSystem = async (emails: string[]) => {
    try {
      setInviteUsersLoading(true)
      return await inviteUsersToSystem(fetcher, emails)
    } catch (error) {
      throw new Error((error as AppError).message || "Error al invitar usuarios")
    } finally {
      setInviteUsersLoading(false)
    }
    };

  return {
    availableUsers,
    registerUsers,
    isLoading: isLoading || registerUsersLoading,
    error,
    handleInviteUsersToSystem,
    inviteUsersLoading,
  };
};
