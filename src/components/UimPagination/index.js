import React from 'react';
import { Select, MenuItem, Pagination } from '@mui/material';

export default function UimPagination({
	totalPages,
	currentPage,
	onChangePageSize,
	onChangePageIndex,
	pageSizeOptions,
}) {
	return (
		<>
			<Select
				labelId='row-size'
				id='row-size'
				defaultValue={pageSizeOptions[0] ?? 5}
				label='Rows'
				onChange={onChangePageSize}
			>
				{pageSizeOptions?.map((option) => (
					<MenuItem value={option}>{option}</MenuItem>
				))}
			</Select>
			<Pagination
				count={totalPages}
				page={currentPage}
				onChange={onChangePageIndex}
			/>
		</>
	);
}
