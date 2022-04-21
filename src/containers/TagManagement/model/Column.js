import moment from 'moment';

export const Column = [
	{
		field: 'name',
		headerName: 'Tag',
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
		sortable: true,
		width: '100%',
		type: 'string',
		minWidth: 200,
		flex: 1,
	},
	{
		field: 'modified_date',
		headerName: 'Modified Date',
		disableColumnMenu: true,
		sortable: true,
		align: 'center',
		headerAlign: 'center',
		type: 'date',
		maxWidth: 400,
		flex: 1,
		renderCell: (value) =>
			value?.row?.modified_date
				? moment(value?.row?.modified_date).format('DD/MM/YYYY')
				: '-',
	},
	{
		field: 'created_date',
		headerName: 'Create At',
		disableColumnMenu: true,
		sortable: true,
		align: 'center',
		headerAlign: 'center',
		minWidth: 170,
		type: 'date',
		renderCell: (value) =>
			moment(value?.row?.created_date).format('DD/MM/YYYY hh:mm A'),
	},
];
