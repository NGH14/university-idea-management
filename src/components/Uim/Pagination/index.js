import React from 'react';
import { Select, MenuItem, Pagination as MuiPagination } from '@mui/material';

import './style.css';

export default function UimPagination({
	pageSizeOptions = [5, 10, 25, 50],
	onPageSizeChange,
	appeared = true,
	pageSize = 1,
	total = 1,
	onChange,
	page,
}) {
	const pageNumber = total / pageSize;
	const pageNumberMod = total % pageSize;

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
				key={Math.random() * 10}
				siblingCount={0}
				boundaryCount={1}
				count={pageNumberMod !== 0 ? Math.floor(pageNumber) + 1 : pageNumber}
				page={page}
				onChange={onChange}
			/>
		</>
	) : (
		<></>
	);
}
