import './style.css';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGridPro } from '@mui/x-data-grid-pro';
import CustomNoRowsOverlay from 'components/Custom/CustomNoRowsOverlay';
import React from 'react';
import UimTableToolBar from '../TableTootBar';
import UimPagination from '../Pagination';

export function UimTable({
	pagination: { page, pageSize, onPageChange, onPageSizeChange },
	classes: { tableClassNames, paginationClassNames },
	showTableToolBar,
	totalItems = 0,
	columns,
	rows,
}) {
	return (
		<div className={tableClassNames}>
			<DataGridPro
				components={{
					NoRowsOverlay: CustomNoRowsOverlay,
					ColumnSortedDescendingIcon: () => <ExpandMoreIcon className='icon' />,
					ColumnSortedAscendingIcon: () => <ExpandLessIcon className='icon' />,
					Toolbar: showTableToolBar && UimTableToolBar,
				}}
				initialState={{ pinnedColumns: { right: ['actions'] } }}
				hideFooterSelectedRowCount={true}
				style={{ minHeight: '70vh' }}
				hideFooterPagination={true}
				hideFooterRowCount={true}
				rowCount={pageSize}
				pageSize={pageSize}
				pagination={false}
				rows={rows ?? []}
				columns={columns}
				cell--textCenter
				page={page - 1}
			/>
			<div className={paginationClassNames ?? 'table_footer'}>
				<UimPagination
					onPageSizeChange={onPageSizeChange}
					onChange={onPageChange}
					pageSize={pageSize}
					total={totalItems}
					appeared={rows}
					page={page}
				/>
			</div>
		</div>
	);
}
