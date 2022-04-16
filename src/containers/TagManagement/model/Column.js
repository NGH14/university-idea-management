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
				? moment(value?.row?.modified_at).format('DD/MM/YYYY')
				: '-',
	},
];
