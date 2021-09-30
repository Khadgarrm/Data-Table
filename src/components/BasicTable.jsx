import React, {useMemo} from 'react';
import {useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect} from 'react-table';
import COLUMNS from './columns';
import DATA_JSON from '../DATA_JSON.json';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import ColumnFilter from './ColumnFilter';
import CheckBox from './CheckboxPage';

const BasicTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => DATA_JSON, []);
    const defaultColumn = useMemo(() => {
        return{
            Filter: ColumnFilter
        };
    },[]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        setGlobalFilter,
        state,
        selectedFlatRows
      } = useTable(
        {
        columns,
        data,
        defaultColumn,
        initialState: {pageSize: 20}
       },
      useFilters,
      useGlobalFilter,
      useSortBy,
      usePagination,
      useRowSelect,
      hooks => {
          hooks.visibleColumns.push(columns => [
              {
                id: 'selection',
                Header: ({getToggleAllRowsSelectedProps}) => (
                    <CheckBox {...getToggleAllRowsSelectedProps()}/>
                ),
                Cell: ({row}) =>  <CheckBox {...row.getToggleRowSelectedProps()} />,     
            },
            ...columns
        ])
       }
      );

      const { globalFilter } = state;

    return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/> 
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
                                    <div>{column.canFilter ? column.render('Filter'): null}</div>
                                </th>
                            ))}
                    </tr>
                    ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                    {page.map(row => {
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
                        })}
            </tbody>
        </table>
        <div>
            <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
        </div>
        <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map(row => row.original)
            },
            null,
            2
          )}
        </code>
      </pre>
        </>
    )
};
export default BasicTable
