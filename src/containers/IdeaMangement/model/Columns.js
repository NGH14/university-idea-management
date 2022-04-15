import moment from 'moment';
import _ from 'lodash';
import { Chip, List, ListItem } from '@mui/material';

export const Columns = [
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
				<div style={{ margin: '0 2px' }}>
					<Chip label={V} variant='outlined' size='large' />
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
