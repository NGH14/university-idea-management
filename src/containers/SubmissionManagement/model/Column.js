import moment from "moment";

export const Column = [
	{
		field: "no",
		headerName: "No.",
		disableColumnMenu: true,
		sortable: false,
		type: "number",
		width: 80,
		align: "center",
		headerAlign: "center",

		renderCell: (value) => {
			return <div>{value.api.getRowIndex(value.id) + 1}</div>;
		},
	},
	{
		field: "title",
		// headerAlign: "center",
		headerName: "Title",
		disableColumnMenu: true,
		sortable: true,
		width: "100%",
		type: "string",
		minWidth: 200,
		flex: 1,
	},
	{
		field: "description",
		// headerAlign: "center",
		headerName: "Description",
		disableColumnMenu: true,
		sortable: false,
		width: "auto",
		minWidth: 200,
		flex: 1,
	},

	{
		field: "initial_date",
		headerName: "Initial Date",
		// headerAlign: "center",
		disableColumnMenu: true,
		sortable: true,
		type: "date",
		width: "auto",
		minWidth: 200,
		flex: 1,
		renderCell: (value) => {
			return (
				<div>
					{value?.row?.initial_date
						? moment(value?.row?.initial_date).format("DD/MM/YYYY")
						: null}
				</div>
			);
		},
	},
	{
		field: "final_date",
		headerName: "Final Date",
		// headerAlign: "center",
		disableColumnMenu: true,
		sortable: true,
		type: "date",
		width: "auto",
		minWidth: 200,
		flex: 1,
		renderCell: (value) => {
			return (
				<div>
					{value?.row?.final_date
						? moment(value?.row?.final_date).format("DD/MM/YYYY")
						: null}
				</div>
			);
		},
	},
];
