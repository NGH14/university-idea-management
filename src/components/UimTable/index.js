import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGridPro } from '@mui/x-data-grid-pro';
import CustomNoRowsOverlay from 'components/Custom/CustomNoRowsOverlay';
import UimPagination from 'components/UimPagination';
import React from 'react';

function UimTable({
	pagination: { page, pageSize, onPageChange, onPageSizeChange },
	classes: { tableClassNames, paginationClassNames },
	totalItems = 0,
	tableToolBar,
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
					Toolbar: tableToolBar,
				}}
				rows={rows ?? []}
				columns={columns}
				rowCount={pageSize}
				columnVisibilityModel={{}}
				pagination={false}
				cell--textCenter
				pageSize={pageSize}
				page={page - 1}
				hideFooterSelectedRowCount={true}
				hideFooterPagination={true}
				hideFooterRowCount={true}
				initialState={{ pinnedColumns: { right: ['actions'] } }}
				style={{ minHeight: '70vh' }}
			/>
			<div className={paginationClassNames}>
				<UimPagination
					page={page}
					appeared={rows}
					total={totalItems}
					pageSize={pageSize}
					onChange={onPageChange}
					onPageSizeChange={onPageSizeChange}
				/>
			</div>
		</div>
	);
}

export default React.memo(UimTable);
