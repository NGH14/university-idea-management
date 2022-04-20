import { Chip } from '@mui/material';
import moment from 'moment';

export const Columns = [
	{
		field: 'title',
		headerName: 'Title',
		disableColumnMenu: true,
		sortable: true,
		type: 'string',
		minWidth: 180,
		flex: 1,
	},
	{
		field: 'tags',
		headerName: 'Tags',
		disableColumnMenu: true,
		sortable: false,
		align: 'center',
		headerAlign: 'center',
		type: 'string',
		width: '100%',
		minWidth: 320,
		flex: 1,
		renderCell: (value) =>
			value?.row?.tags?.map((V, i) => (
				<div
					style={{
						margin: '0 2px',
						display: 'flex',
						flexWrap: 'wrap',
					}}
				>
					<Chip variant='outlined' size='large' label={V} />
				</div>
			)),
	},
	{
		field: 'views',
		headerName: 'Views',
		disableColumnMenu: true,
		sortable: true,
		type: 'number',
		align: 'center',
		headerAlign: 'center',
		minWidth: 150,
	},
	{
		field: 'created_by',
		headerName: 'Author',
		disableColumnMenu: true,
		sortable: true,
		width: '100%',
		type: 'string',
		align: 'center',
		headerAlign: 'center',
		minWidth: 170,
		maxWidth: 200,
		flex: 1,
		renderCell: (value) => value?.row?.created_by ?? value?.row?.email,
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
			value?.row?.created_date
				? moment(value?.row?.created_date).format('DD/MM/YYYY')
				: '-',
	},
];
