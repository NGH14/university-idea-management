export const Columns = [
	{
		title: 'no.',
		dataIndex: 'no.',
		key: 'no',
		width: '5%',
		render: (_text, _record, index) => index + 1,
	},
	{
		title: 'Full name',
		dataIndex: 'full_name',
		key: 'full_name',
		width: '25%',
		sorter: (a, b) => a.full_name - b.full_name,
		sortDirections: ['descend'],
	},
	{
		title: 'Email',
		key: 'email',
		dataIndex: 'email',
		width: '20%',
	},
	{
		title: 'Department',
		key: 'department',
		dataIndex: 'department',
		align: 'center',
		width: '15%',
		render: (department) => (
			<div style={{ textTransform: 'capitalize' }}>{department ?? ''}</div>
		),
	},
	{
		title: 'Role',
		key: 'role',
		dataIndex: 'role',
		align: 'center',
		width: '15%',
		render: (role) => <div style={{ textTransform: 'capitalize' }}>{role ?? ''}</div>,
	},
];
