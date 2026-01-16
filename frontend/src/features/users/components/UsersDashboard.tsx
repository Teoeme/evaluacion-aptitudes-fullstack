import type { IUser } from "../../../entities/Usuario/Usuario";
import { useDialogControl } from "prometeo-design-system";
import { useCallback, useState } from "react";
import UsersTable from "./UsersTable";
import UserModal from "./UserModal";
import AddUserModal from "./add-users/AddUserModal";
import InviteUsersModal from "./invite-users/InviteUsersModal";

export const UsersDashboard = () => {
  const [modalType, setModalType] = useState<"edit" | "delete">("edit");
  const [user, setUser] = useState<IUser>({} as IUser);
  
  const userModal = useDialogControl();
  const agregarUsuariosDialog = useDialogControl();
  const inviteUsersDialog = useDialogControl();

  const handleEditClick =useCallback((user: IUser) => {
    setUser((pv) => ({ ...pv, ...user }));
    setModalType("edit");
    userModal.open()
  },[]);

  const handleDeleteClick =useCallback ((user: IUser) => {
    setUser((pv) => ({ ...pv, ...user }));
    setModalType("delete");
    userModal.open();
  },[]);

  const handleCloseModal = () => {
    setUser({} as IUser);
  };

  const handleAddUsersClick = () => {
    agregarUsuariosDialog.open();
  };

  const handleInviteUsersClick = () => {
    inviteUsersDialog.open();
  };

  return (
    <div className="p-4 w-full flex-1 grid gap-4 grid-cols-12 grid-rows-12 h-screen">
      <div className="col-span-12 row-span-2 border-b-2 border-neutral-700">
        <h2 className="prometeo-fonts-title-large text-white">
          Gestión de Usuarios
        </h2>
      </div>

      <div className="col-span-12 row-span-10 overflow-hidden">
        <UsersTable
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onAddUsersClick={handleAddUsersClick}
          onInviteUsersClick={handleInviteUsersClick}
        />
      </div>

      <UserModal
        ref={userModal.ref}
        user={user}
        onClose={handleCloseModal}
        modalType={modalType}
      />

      <AddUserModal
        ref={agregarUsuariosDialog.ref}
      />

      <InviteUsersModal
        dialogRef={inviteUsersDialog.ref}
      />

      

    </div>
  );
};
