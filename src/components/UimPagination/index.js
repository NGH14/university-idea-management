import React from 'react';
import { Select, MenuItem, Pagination as MuiPagination } from '@mui/material';

import './style.css';

function UimPagination({
	pageSizeOptions = [5, 10, 25, 50],
	appeared = true,
	pageSize = 1,
	total = 1,
	onPageSizeChange,
	onChange,
	page,
}) {
	const pageNumber = total / pageSize;

	return appeared ? (
		<>
			<div className='userselection_table'>
				<Select
					sx={{ border: 'none' }}
					id='row-size'
					defaultValue={pageSizeOptions[0] ?? 5}
					onChange={onPageSizeChange}
				>
					{pageSizeOptions?.map((option) => (
						<MenuItem value={option}>{option}</MenuItem>
					))}
				</Select>
			</div>
			<MuiPagination
				siblingCount={0}
				boundaryCount={1}
				count={pageNumber !== 1 ? Math.floor(pageNumber) + 1 : 1}
				page={page}
				onChange={onChange}
			/>
		</>
	) : (
		<></>
	);
}

export default React.memo(UimPagination);
