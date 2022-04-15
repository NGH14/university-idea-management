import moment from 'moment';

export const Column = [
	{
		filterable: false,

		field: 'no',
		headerName: '#',
		disableColumnMenu: true,
		sortable: false,
		type: 'number',
		width: 80,
		align: 'center',
		headerAlign: 'center',
		renderCell: (value) => (
			<span>{value.api.getRowIndex(value.id) + 1}</span>
		),
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
		field: 'modified_by',
		headerName: 'Modified By',
		disableColumnMenu: true,
		align: 'center',
		headerAlign: 'center',
		sortable: true,
		type: 'string',
		width: 300,
		minWidth: 300,
		maxWidth: 500,
	},
	{
		field: 'initial_date',
		headerName: 'Initial Deadline',
		disableColumnMenu: true,
		sortable: true,
		align: 'center',
		headerAlign: 'center',
		width: 170,
		minWidth: 130,
		maxWidth: 200,
		type: 'date',
		renderCell: (value) =>
			value?.row?.initial_date
				? moment(value?.row?.initial_date).format('DD/MM/YYYY')
				: '-',
	},
	{
		field: 'final_date',
		headerName: 'Final Deadline',
		disableColumnMenu: true,
		sortable: true,
		align: 'center',
		headerAlign: 'center',
		type: 'date',
		width: 170,
		minWidth: 130,
		maxWidth: 200,
		renderCell: (value) =>
			value?.row?.final_date
				? moment(value?.row?.final_date).format('DD/MM/YYYY')
				: '-',
	},
	{
		field: 'is_active',
		headerName: 'Status',
		disableColumnMenu: true,
		align: 'center',
		headerAlign: 'center',
		sortable: false,
		type: 'boolean',
		width: 80,
		minWidth: 70,
		maxWidth: 200,
	},
];
