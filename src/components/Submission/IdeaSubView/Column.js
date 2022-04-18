import moment from "moment";

export const Column = [
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
		renderCell: (value) => (
			<span style={{ textTransform: 'capitalize' }}>{value?.row?.name}</span>
		),
	},
	{
		field: 'user.email',
		headerName: 'Author',
		disableColumnMenu: true,
		sortable: true,
		width: '100%',
		type: 'string',
		minWidth: 200,
		flex: 1,
	},
	{
		field: 'created_date',
		headerName: 'Create At',
		disableColumnMenu: true,
		sortable: false,
		align: 'center',
		headerAlign: 'center',
		minWidth: 170,
		type: 'date',
		renderCell: (value) =>
			value?.row?.created_date
				? moment(value?.row?.created_date).format('DD/MM/YYYY')
				: '-',
	},
];
