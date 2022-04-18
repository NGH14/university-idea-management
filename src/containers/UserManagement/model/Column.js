export const Columns = [
	{
		field: 'full_name',
		headerName: 'Full name',
		disableColumnMenu: true,
		sortable: true,
		width: '100%',
		type: 'string',
		minWidth: 200,
		flex: 1,
	},
	{
		field: 'email',
		headerName: 'Email',
		disableColumnMenu: true,
		sortable: true,
		type: 'string',
		width: 'auto',
		minWidth: 200,
		display: false,
		flex: 1,
	},
	{
		field: 'department',
		headerName: 'Department',
		align: 'center',
		headerAlign: 'center',
		disableColumnMenu: true,
		type: 'string',
		sortable: true,
		width: 'auto',
		minWidth: 200,
		flex: 1,

		renderCell: (value) => (
			<div
				style={{
					textTransform: 'capitalize',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				}}
			>
				{value?.row?.department}
			</div>
		),
	},
	{
		field: 'role',
		headerName: 'Role',
		align: 'center',
		headerAlign: 'center',
		disableColumnMenu: true,
		sortable: true,
		width: 'auto',
		minWidth: 200,
		flex: 1,
		renderCell: (value) => (
			<div style={{ textTransform: 'capitalize' }}>{value?.row?.role}</div>
		),
	},
];
