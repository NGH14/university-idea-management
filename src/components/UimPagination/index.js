import React from 'react';
import { Select, MenuItem, Pagination } from '@mui/material';

import './style.css';
export default function UimPagination({
	totalPages,
	currentPage,
	onChangePageSize,
	onChangePageIndex,
	pageSizeOptions,
}) {
	return (
		<>
			<div className='userselection_table'>
				<Select
					sx={{ border: 'none' }}
					id='row-size'
					defaultValue={pageSizeOptions[0] ?? 10}
					onChange={onChangePageSize}>
					{pageSizeOptions?.map((option) => (
						<MenuItem value={option}>{option}</MenuItem>
					))}
				</Select>
			</div>
			<Pagination
				siblingCount={0}
				boundaryCount={1}
				count={totalPages}
				page={currentPage}
				onChange={onChangePageIndex}
			/>
		</>
	);
}
