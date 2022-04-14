import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';

export default function UimTableToolBar() {
	return (
		<GridToolbarContainer sx={{ fontWeight: 700 }}>
			<GridToolbarColumnsButton />
			<GridToolbarFilterButton disableHoverListener={true} />
			<GridToolbarDensitySelector />
			<GridToolbarExport printOptions={{ disableToolbarButton: true }} />
		</GridToolbarContainer>
	);
}
