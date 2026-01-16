import { Table as PrometeoTable, TableBody, TableFooter, TableHeader, TableHead, TableRow, TableCell} from 'prometeo-design-system'
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef, type OnChangeFn, type Row, type RowSelectionState } from '@tanstack/react-table'
import { useState } from 'react'
import { useEffect } from 'react'
import IndeterminateCheckbox from './ui/IndeterminateCheckBox'
import { twMerge } from 'tailwind-merge'

export interface ITable<T> {
    data: T[]
    columns: ColumnDef<T>[]
    enableRowSelection?: (boolean | ((row: Row<T>) => boolean))
    enableMultiRowSelection?: boolean
    onRowSelectionChange?: (selection: RowSelectionState) => void
    getRowId?: (row: T) => string
    emptyDataMessage?: string
    emptyDataComponent?: React.ReactNode
    height?: number | string
    width?: number | string
    className?: string,
    headerFixed?:boolean
}

const Table = <T,>({ data, columns, enableRowSelection: enableRowSelection=false, enableMultiRowSelection=false, onRowSelectionChange, getRowId, emptyDataMessage, emptyDataComponent, height, width, className,headerFixed=true }: ITable<T>) => {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [haveFooter, setHaveFooter] = useState(false)
    
    const handleRowSelectionChange:OnChangeFn<RowSelectionState> = (selection) => {
        const newValue = typeof selection === 'function' ? selection(rowSelection) : selection
        setRowSelection(newValue)
        onRowSelectionChange?.(newValue)
    }   

    const selectColumn:ColumnDef<T> =  {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox 
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="">
            <IndeterminateCheckbox 
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
              
            />
          </div>
        ),
      }
      const selectionEnabled = enableRowSelection || enableMultiRowSelection
      const tableColumns = selectionEnabled ? [selectColumn, ...columns] : columns

    const table = useReactTable({
        data,
        columns: tableColumns,
        state:{
            rowSelection,
        },
        enableRowSelection,
        enableMultiRowSelection,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: handleRowSelectionChange,
        getRowId
    })
    
        
    useEffect(()=>{
        setHaveFooter(table.getFooterGroups().some(fg=>fg.headers.some(h=>h.column.columnDef.footer)))
    },[table])

    return (

        <div className={twMerge("overflow-x-auto", className)}
            style={{
                height: height,
                width: width,
            }}
        >
            <PrometeoTable className="h-full w-full">
                <TableHeader className={`${headerFixed ? 'sticky top-0 z-50' : ''}`}>
                    {table.getHeaderGroups().map((hg) => {
                        return (
                            <TableRow key={hg.id}>
                                {hg.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className=' text-left'>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableHeader>

                <TableBody  >
                    {table.getRowModel().rows.length > 0 ? table.getRowModel().rows.map((row) => {

                        return (
                            <TableRow key={row.id} isSelected={row.getIsSelected()}  >
                                {row.getVisibleCells().map(cell =>{
                                    return (
                                        <TableCell key={cell.id}
                                        className=' text-left' >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    )
                                })}

                            </TableRow>
                        )
                    }) : emptyDataComponent ? emptyDataComponent : <TableRow>
                        <TableCell colSpan={table.getAllColumns().length}>
                            <p>{emptyDataMessage || 'No hay datos para mostrar'} </p>
                        </TableCell>
                    </TableRow>
                }
                </TableBody>

                {haveFooter && <TableFooter>
                    {table.getFooterGroups().map((fg) => {
                        return (
                            <TableRow key={fg.id}>
                                {fg.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {flexRender(header.column.columnDef.footer, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableFooter>}


            </PrometeoTable>
        </div>
    )
}

export default Table