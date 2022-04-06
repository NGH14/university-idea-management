import moment from "moment";
import _ from "lodash";

export const Columns = [
    {
        field: 'no',
        headerName: '#',
        disableColumnMenu: true,
        sortable: false,
        type: 'number',
        width: 80,
        align: 'center',
        headerAlign: 'center',
        renderCell: (value) => <span>{value.api.getRowIndex(value.id) + 1}</span>,
    },
    {
        field: 'title',
        headerName: 'Title',
        disableColumnMenu: true,
        sortable: true,
        width: '100%',
        type: 'string',
        minWidth: 200,
        flex: 1,
    },
    {
        field: 'content',
        headerName: 'Content',
        disableColumnMenu: true,
        sortable: true,
        width: '100%',
        type: 'string',
        minWidth: 200,
        flex: 1,
    },
    {
        field: 'file',
        headerName: 'File',
        disableColumnMenu: true,
        sortable: true,
        width: '100%',
        type: 'string',
        minWidth: 200,
        flex: 1,
        renderCell: (value) => {
           return <ul>
                {_.map(value?.file, x=>{
                    return <li>{x.name}</li>
                })}
            </ul>
        },
    },
];
