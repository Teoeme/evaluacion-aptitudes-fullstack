import { Button, Icons, Input } from "prometeo-design-system"

export type TableHeaderMenuProps = {
    onSearchChange: (search: string) => void
    onAddUsersClick: () => void
    onInviteUsersClick: () => void
    isLoading: boolean
    totalUsers: number
}

const TableHeaderMenu = ({onSearchChange,onAddUsersClick,onInviteUsersClick,isLoading,totalUsers}:TableHeaderMenuProps) => {
  return (
    <div className="bg-inherit w-full h-max flex flex-col items-end gap-8 justify-between py-2 pb-4">
      <div className="flex items-center gap-4">
        
        <Button
        label="Invitar usuario"
        type="button"
        variant="outline"
        onClick={onInviteUsersClick}
        />

        <Button
        className=""
        type="button"
        icon={<Icons.Add size={20} className="" />}
        onClick={onAddUsersClick}
        label="Agregar Usuarios"
        />
        </div>
        <div className="flex items-baseline gap-2 justify-between w-full bg-neutral-default-default flex-col md:flex-row ">

        <p className="prometeo-fonts-body-large">Total de usuarios: <span className=" prometeo-fonts-label-xlarge">{totalUsers || 0}</span></p>

        <Input 
        name="search"
        label="Buscar"
        height="35px"
        onEmptied={()=>{
          onSearchChange('');
        }}
        debounceMs={600}
        isFetching={isLoading}
        onChange={onSearchChange}
        icon={<Icons.Search size={20} className="" />}
        />
        </div>

    </div>
  )
}

export default TableHeaderMenu      