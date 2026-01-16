import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../app/instances/axios.intance";
import { getAllUsers } from "../use-cases/getUsers";
import { activateUser, deactivateUser, updateUser } from "../use-cases/updateUsers";
import type { IUser } from "../../../entities/Usuario/Usuario";
import { deleteUser } from "../use-cases/deleteUsers";

export const useUsers = ({ search }: { search?: string }) => {
  const { data, isLoading, error,refetch } = useQuery({
    queryKey: ["users", search],
    refetchOnWindowFocus: false,
    refetchOnMount:false,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 20,
    queryFn: () =>
      getAllUsers(
        fetcher,
        search ? generalSearchParamsAdapter(search) : undefined
      ),
  });

  const generalSearchParamsAdapter = (search: string) => {
    return {
      fullName: search,
      email: search,
      username: search,
      authId: search,
    };
  };

  const changeUserIsActive = async (userId: string, isActive: boolean) => {
    const result = isActive ? await activateUser(fetcher, {userId}) : await deactivateUser(fetcher, {userId})
    return result
  };

  const handleEditUser = async (userId: string, updates: Partial<IUser>) => {
    
    if('isActive' in updates) {
      await changeUserIsActive(userId, updates.isActive!)
      delete updates.isActive
    }
    
    const result = await updateUser(fetcher, {
      userId,
      updates,
    });
    
    refetch() //actualizar tabla
    return result
  };

  const handleDeleteUser = async (userId: string) => {
    const result = await deleteUser(fetcher, userId)
    refetch() //actualizar tabla
    return result
  };

  const users = data?.users || [];

  return {
    users,
    isLoading,
    error,
    handleEditUser,
    handleDeleteUser,
  };
};
