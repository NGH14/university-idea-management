import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tippy from '@tippyjs/react';

import moment from 'moment';

export const Column = [
	{
		field: 'title',
		headerName: 'Title',
		disableColumnMenu: true,
		sortable: true,
		width: '100%',
		type: 'string',
		minWidth: 200,
		maxWidth: 600,
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
		width: '100%',
		minWidth: 200,
		maxWidth: 300,
		flex: 1,
	},
	{
		field: 'initial_date',
		headerName: 'Initial Deadline',
		disableColumnMenu: true,
		sortable: true,
		align: 'center',
		headerAlign: 'center',
		type: 'date',
		width: '100%',
		minWidth: 130,
		maxWidth: 200,
		flex: 1,
		renderCell: (value) => moment(value?.row?.initial_date).format('DD/MM/YYYY'),
	},
	{
		field: 'final_date',
		headerName: 'Final Deadline',
		disableColumnMenu: true,
		sortable: true,
		align: 'center',
		headerAlign: 'center',
		type: 'date',
		width: '100%',
		minWidth: 130,
		maxWidth: 200,
		flex: 1,
		renderCell: (value) => moment(value?.row?.final_date).format('DD/MM/YYYY'),
	},
	{
		field: 'is_fully_close',
		headerName: 'Status',
		disableColumnMenu: true,
		align: 'center',
		headerAlign: 'center',
		sortable: false,
		minWidth: 80,
		renderCell: (value) =>
			value?.row?.is_fully_close == null ? (
				<Tippy content='active' placement='left'>
					<CheckIcon />
				</Tippy>
			) : !!value?.row?.is_fully_close ? (
				<Tippy content='final closed' placement='left'>
					<CloseIcon />
				</Tippy>
			) : (
				<Tippy content='inital closed' placement='left'>
					<MoreHorizIcon />
				</Tippy>
			),
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
		renderCell: (value) => moment(value?.row?.created_date).format('DD/MM/YYYY'),
	},
];
