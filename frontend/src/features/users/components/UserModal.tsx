import type { IUser } from '../../../entities/Usuario/Usuario'
import type { UpdateUserSchemaType } from '../schemas/validateUpdateUser'
import { Button, DialogModal, Icons,type DialogHandle } from 'prometeo-design-system'
import { useUsers } from '../hooks/useUsers'
import UpdateUserForm from './UpdateUserForm'
import detectObjectChanges from '../../../shared/utils/detectObjectChanges'
import { toast } from 'sonner'
import type { AppError } from '../../../entities/errors/IErrors'
import UserDeleteForm from './UserDeleteForm'

type UserModalProps = {
    ref: React.RefObject<DialogHandle | null>,
    user:IUser,
    onClose?: () => void,
    modalType:'edit' | 'delete'
}

const UserModal = ({ ref,onClose,user,modalType }: UserModalProps) => {
    const {handleEditUser,handleDeleteUser}=useUsers({search:''})
    
    const initialValues: UpdateUserSchemaType = {
        userId: user.auth_id!,
        area: user.area,
        role: user.role?.value,
        isActive: user.isActive,
        name: user.name,
        surname: user.surname,
        email: user.email,
        username: user.username,
        phone: user.phone
    }

    const handleSubmit=async (values: UpdateUserSchemaType) => {
        const changedFields = detectObjectChanges(initialValues, values)
        try {
            if(modalType === 'edit'){
            await handleEditUser(user._id,changedFields)
            toast.success('Usuario actualizado correctamente')
            handleClose()
            }else if(modalType === 'delete'){
                await handleDeleteUser(user._id)
                toast.success('Usuario eliminado correctamente')
                handleClose()
            }
        } catch (error) {
            toast.error((error as AppError).message)
        }
    }

    const handleClose = () => {
        onClose?.()
        ref.current?.close()
    }


    return (
        <DialogModal ref={ref} className='w-max h-max gap-6 flex flex-col'>

            <DialogModal.Header className='flex justify-between items-center'>
                <DialogModal.Title>{modalType === 'edit' ? 'Editar usuario' : 'Eliminar usuario'}</DialogModal.Title>
                <Button
                    type='button'
                    onClick={handleClose}
                    className='flex min-w-0 size-10 p-0 min-h-0'
                    contentClassName=''>
                    <Icons.Close size={24} className='p-0 m-0 flex ' />
                </Button>
            </DialogModal.Header>
            
            <DialogModal.Content>
                {modalType === 'edit' ?
                <UpdateUserForm initialValues={initialValues} handleSubmit={handleSubmit} />
                :
                <UserDeleteForm initialValues={{userId:user._id,confirm:'',fullName:user.fullName}} handleSubmit={handleSubmit} />
            }
            </DialogModal.Content>

        </DialogModal>
    )
}

export default UserModal