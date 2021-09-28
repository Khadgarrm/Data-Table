import React, {useMemo} from 'react';
import {useTable, useSortBy, useGlobalFilter, useFilters} from 'react-table';
import COLUMNS from './columns';
import DATA_JSON from '../DATA_JSON.json';
import './table.css'
import { GlobalFilter } from './GlobalFilter';


const BasicTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => DATA_JSON, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
      } = useTable({
        columns,
        data
      },
      useGlobalFilter,
      useSortBy)

      const { globaFilter } = state

    return (
        <>
        <GlobalFilter filter={globaFilter} setFilter={setGlobalFilter}/> 
        <table {...getTableProps()}>
            <thead>
                {
                  headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </th>
                            ))}
                    </tr>
                    ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                           <tr {...row.getRowProps()}>
                               {
                                   row.cells.map(cell => {
                                     return <td {...cell.getCellProps()}>
                                         {cell.render('Cell')}
                                     </td>
                                   })
                               }
                           </tr>
                        )
                        })
                }
                
            </tbody>
        </table>
        </>
    )
};
export default BasicTable
