
const COLUMNS = [
    {
        Header: 'id',
        accessor: 'id',
        disableFilters: true,
    },
    {
        Header: 'Firt name',
        accessor: 'firstName',
        disableFilters: true,
    },
    {
        Header: 'Last name',
        accessor: 'lastName',
        disableFilters: true,
    },
    {
        Header: 'Email',
        accessor: 'email',
        disableFilters: true,
    },
    {
        Header: 'Phone',
        accessor: 'phone',
        disableFilters: true,
    },
    {
        Header: 'State',
        accessor: 'adress.state',
        disableFilters: false,
    },
];
export default COLUMNS;