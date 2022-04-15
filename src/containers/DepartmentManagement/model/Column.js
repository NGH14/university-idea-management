import moment from 'moment';

export const Column = [
	{
		field: 'no',
		filterable: false,

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
		field: 'name',
		headerName: 'Department',
		disableColumnMenu: true,
		width: '100%',
		type: 'string',
		minWidth: 200,
		flex: 1,
		sortable: true,
		renderCell: (value) => (
			<div style={{ textTransform: 'capitalize' }}>
				{value?.row?.name}
			</div>
		),
	},
	{
		field: 'created_date',
		headerName: 'Create At',
		disableColumnMenu: true,
		sortable: false,
		align: 'center',
		headerAlign: 'center',
		minWidth: 150,
		type: 'date',
		flex: 1,
		renderCell: (value) => (
			<div>
				{moment(value?.row?.created_date).format('DD/MM/YYYY hh:mm')}
			</div>
		),
	},
	{
		field: 'modified_date',
		headerName: 'Modified Date',
		disableColumnMenu: true,
		sortable: true,
		align: 'center',
		headerAlign: 'center',
		minWidth: 150,
		type: 'date',
		renderCell: (value) => (
			<div>
				{moment(value?.row?.created_date).format('DD/MM/YYYY hh:mm')}
			</div>
		),
		flex: 1,
	},
];
