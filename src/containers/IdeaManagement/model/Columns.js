import { Chip } from '@mui/material';
import moment from 'moment';

export const Columns = [
	{
		field: 'title',
		headerName: 'Title',
		disableColumnMenu: true,
		sortable: true,
		type: 'string',
		minWidth: 100,
		flex: 1,
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
		minWidth: 200,
		flex: 1,
		renderCell: (value) => value?.row?.created_by ?? value?.row?.email,
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
		minWidth: 200,
		flex: 1,
		renderCell: (value) =>
			value?.row?.tags?.map((V, i) => (
				<div
					style={{
						margin: '0 2px',
						display: 'flex',
						flexWrap: 'wrap',
					}}>
					<Chip variant='outlined' size='large' label={V} />
				</div>
			)),
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
