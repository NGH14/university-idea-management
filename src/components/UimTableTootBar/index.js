import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';

export default function UimTableToolBar(
	disableColumnTool = false,
	disableFilterTool = false,
	disableDensityTool = false,
	disableExportTool = false,
) {
	return (
		<GridToolbarContainer sx={{ fontWeight: 700 }}>
			{disableColumnTool && <GridToolbarColumnsButton />}
			{disableFilterTool && <GridToolbarFilterButton />}
			{disableDensityTool && <GridToolbarDensitySelector />}
			{disableExportTool && (
				<GridToolbarExport printOptions={{ disableToolbarButton: true }} />
			)}
		</GridToolbarContainer>
	);
}
