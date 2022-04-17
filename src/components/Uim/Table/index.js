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
		showTableToolBar,
		totalItems,
		columns,
		rows,
		height,
		autoHeight = false,
	} = props;

	return (
		<div className={tableClassNames}>
			<DataGridPro
				hideFooter
				components={{
					NoRowsOverlay: CustomNoRowsOverlay,
					NoResultsOverlay: CustomNoRowsOverlay,
					ColumnSortedDescendingIcon: () => <ExpandMoreIcon className='icon' />,
					ColumnSortedAscendingIcon: () => <ExpandLessIcon className='icon' />,
					Toolbar: showTableToolBar && UimTableToolBar,
				}}
				rows={rows ?? []}
				columns={columns}
				hideFooterRowCount={true}
				autoHeight={autoHeight}
				hideFooterPagination={true}
				hideFooterSelectedRowCount={true}
				style={!autoHeight ? { minHeight: height ?? '68.5vh' } : {}}
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
