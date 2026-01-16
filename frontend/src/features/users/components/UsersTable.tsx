import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, Button, Icons } from "prometeo-design-system";
import { memo, useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { type RolUsuario } from "../../../entities/roles/Role";
import type { IUser } from "../../../entities/Usuario/Usuario";
import Table from "../../../shared/components/Table";
import { useUser } from "../hooks/useUser";
import { useUsers } from "../hooks/useUsers";
import TableHeaderMenu from "./TableHeaderMenu";
interface IUsersTable {
  onEditClick: (user: IUser) => void;
  onDeleteClick: (user: IUser) => void;
  onAddUsersClick: () => void;
  onInviteUsersClick: () => void;
  height?: number | string
  width?: number | string
  className?: string
}

const UsersTable = ({ onEditClick, onDeleteClick, onAddUsersClick, onInviteUsersClick, height, width, className }: IUsersTable) => {
  const [search, setSearch] = useState("");
  const { users,isLoading } = useUsers({ search });

  const columns: ColumnDef<IUser>[] = useMemo(() => [
    {
      header: "Nombre",
      accessorKey: "fullName",
      cell: ({ row }) => {
        return <CustomUserCard user={row.original} />;
      },
    },
    {
      header: "Username",
      accessorKey: "username",
    },
    {
      header: "Área",
      accessorKey: "area",
    },
    {
      header: "Estado",
      accessorKey: "isActive",
      cell: ({ row }) => {
        return <CustomIsActive isActive={row.original.isActive} />;
      },
    },
    {
      header: "Rol",
      accessorKey: "role",
      cell: ({ row }) => {
        return <CustomRole role={row.original.role} />;
      },
    },
    {
      header: "Acciones",
      cell: ({ row }) => {
        return <CustomActions user={row.original} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />;
      },
    }
  ], []);

  const handleSearchChange = useCallback((search: string) => {
    if(search === ''){
      setSearch('')
    }
    setSearch(search)
  },[setSearch])

  return (
    <div className={twMerge(" bg-neutral-default-default h-full flex flex-col", className)}>
      <TableHeaderMenu onSearchChange={handleSearchChange} isLoading={isLoading} onAddUsersClick={onAddUsersClick} onInviteUsersClick={onInviteUsersClick} totalUsers={users.length} />
      <Table data={users} columns={columns} height={height} width={width} />
    </div>
  )
};

export default memo(UsersTable);

const CustomUserCard = memo(({user}: {user: IUser}) => {
  const disabledStyles = "text-neutral-default-disabled";

  return (
    <div className="flex items-center gap-2 rounded-lg p-2">
      <div className="overflow-hidden size-16">
        <Avatar 
        sizeImage="sm"
        sizeFallback="sm"
        fallbackText={user.fullName}
        urlImage={user?.profileImage} 
      />
      </div>

      <div className="w-max">
        <p className={twMerge(
            "prometeo-fonts-label-large",
            !user.isActive && disabledStyles)}
          >
          {user.fullName}
        </p>
        <p
          className={twMerge(
            "prometeo-fonts-body-small",
            !user.isActive && disabledStyles
          )}
        >
          {user.email}
        </p>
      </div>
    </div>
  );
});

const CustomIsActive = memo(({isActive}: {isActive: boolean}) => {
  return (
    <div className="flex items-center gap-2 bg-">
      <span
        className={twMerge(
          !isActive ? "bg-error-medium-default" : "bg-success-medium-default",
          "size-3 rounded-full flex"
        )}
      ></span>
      <p>{isActive ? "Activo" : "Inactivo"}</p>
    </div>
  );
});

const CustomRole = memo(({role}: {role: RolUsuario}) => {
  const roleStyles = {
    Regular: "",
    Admin: "text-primary-default-default",
    SuperAdmin: "text-warning-light",
    Developer: "text-error-light",
  };

  return (
    <p
      className={twMerge(
        roleStyles[role.value as keyof typeof roleStyles],
        "text-neutral-strong-default"
      )}
    >
      {role.value}
    </p>
  );
});

const CustomActions = memo(({user, onEditClick, onDeleteClick}: {user: IUser, onEditClick: (user: IUser) => void, onDeleteClick: (user: IUser) => void}) => {
  const { esAlMenos: isAtLeast } = useUser();
  
  return (
    <div className="flex items-center gap-2 " >
      <Button
        label=""
        type="button"
        className=" size-8"
        onClick={() => {onEditClick(user)}}
        icon={<Icons.Edit size={20} className="" />}
      />

      {isAtLeast("SuperAdmin") && (
        <Button
        label=""
        type="button"
        disabled={!user.isActive || (user.role.isAtLeast("SuperAdmin") && !isAtLeast("SuperAdmin"))}
        onClick={() => {onDeleteClick(user)}}
        className=" size-8 bg-error-default-default hover:bg-error-default-hover relative"
        icon={<Icons.Close size={20} className="" />}
        />

      )}
    </div>
  );
});