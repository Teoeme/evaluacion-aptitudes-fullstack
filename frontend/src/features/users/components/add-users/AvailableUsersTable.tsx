import type { ColumnDef, Row, RowSelectionState } from '@tanstack/react-table'
import type { IAuthServiceUser } from '../../../../entities/Usuario/Usuario'
import type { StagedUserToAdd } from './AddUserModal'
import { Avatar, Input, Select } from 'prometeo-design-system'
import { useMemo } from 'react'
import { Roles } from '../../../../entities/roles/Role'
import Table from '../../../../shared/components/Table'

type AvailableUsersTableProps = {
  availableUsers: StagedUserToAdd[]
  onRowSelectionChange: (selection: RowSelectionState) => void
  onRowValueChange: (rowKey: string, value: Record<string, unknown>) => void
}

const AvailableUsersTable = ({availableUsers, onRowValueChange, onRowSelectionChange}:AvailableUsersTableProps) => {

    const columns: ColumnDef<StagedUserToAdd>[] = useMemo(() => [
        {
            header: 'Usuarios',
            accessorKey: 'name',
            cell: ({ row }) => {
                return usuarioCard(row.original)
            },
        },
        {
            header: 'Rol',
            accessorKey: 'role',
            cell: ({ row }) => {
              return( <Select
                label='Rol'
                options={Roles}
                optionValue={role=>role}
                optionLabel={role=>role}
                value={[row.original.role]}
                key={`${row.original.auth_id}-role`}
                className=' w-[210px] bg-neutral-default-default'
                onOptionClick={(option)=>{
                  onRowValueChange(row.original.auth_id, {role:option });
                  turnRowSelected(row)
                }}
                />)
            },
        },
        {
            header: 'Área',
            accessorKey: 'area',
            cell: ({ row }) => {
                return <div className='w-max bg-neutral-default-default'>
                <Input 
                  key={`${row.original.auth_id}-area`}
                  width='210px'
                  name="area" 
                  label="Área"
                  value={row.original.area} 
                  onChange={(value)=>{
                    onRowValueChange(row.original.auth_id, {area:value});
                    turnRowSelected(row)
                  }}
                />
                  </div>

            },
        },
    ], [onRowValueChange])

    const usuarioCard=(user:IAuthServiceUser)=>{
      return(
        <div className='flex items-center gap-2'>
          <Avatar
            fallbackText={user.name + ' ' + (user?.surname ?? '')}
            sizeFallback='xs'
            sizeImage='xs'
          />
          <div className='flex flex-col gap-1'>
          <p className='prometeo-fonts-label-large'>{user.name + ' ' + (user?.surname ?? '')}</p>
          <p className='prometeo-fonts-body-small'>{user.email}</p>
          </div>
        </div>
      )
    }

    const turnRowSelected=(row:Row<StagedUserToAdd>)=>{
      if(!row.getIsSelected()) row.toggleSelected()
    }

  return (
    <Table 
    columns={columns} 
    data={availableUsers} 
    enableRowSelection={true} 
    enableMultiRowSelection={true}
    onRowSelectionChange={onRowSelectionChange}
    getRowId={(row) => row.auth_id}
    height={'60vh'}
    emptyDataMessage='Todos los usuarios de su empresa ya se encuentran vinculados al sistema'
    />
  )
}

export default AvailableUsersTable