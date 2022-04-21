import './style.css';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGridPro } from '@mui/x-data-grid-pro';
import CustomNoRowsOverlay from 'components/Custom/CustomNoRowsOverlay';
import React from 'react';
import UimTableToolBar from '../TableTootBar';
import UimPagination from '../Pagination';

export function UimTable(props) {
	const {
		pagination: { page, pageSize, onPageChange, onPageSizeChange },
		classes: { tableClassNames, paginationClassNames },
		autoHeight = false,
		showTableToolBar,
		totalItems,
		columns,
		height,
		rows,
	} = props;

	return (
		<div className={tableClassNames}>
			<DataGridPro
				hideFooter
				rows={rows ?? []}
				columns={columns}
				autoHeight={autoHeight}
				isRowSelectable={false}
				hideFooterRowCount={true}
				hideFooterPagination={true}
				hideFooterSelectedRowCount={true}
				style={!autoHeight ? { minHeight: height ?? '68.5vh' } : {}}
				components={{
					NoRowsOverlay: CustomNoRowsOverlay,
					NoResultsOverlay: CustomNoRowsOverlay,
					ColumnSortedDescendingIcon: () => <ExpandMoreIcon className='icon' />,
					ColumnSortedAscendingIcon: () => <ExpandLessIcon className='icon' />,
					Toolbar: showTableToolBar && UimTableToolBar,
				}}
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
