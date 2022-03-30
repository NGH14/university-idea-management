import moment from "moment";

export const Column = [
	{
		field: "no",
		headerName: "#",
		disableColumnMenu: true,
		sortable: false,
		type: "number",
		width: 80,
		align: "center",
		headerAlign: "center",
		renderCell: (value) => <span>{value.api.getRowIndex(value.id) + 1}</span>,
	},
	{
		field: "title",
		headerName: "Title",
		disableColumnMenu: true,
		sortable: true,
		width: "100%",
		type: "string",
		minWidth: 200,
		flex: 1,
	},
	{
		field: "initial_date",
		headerName: "Initial Date",
		disableColumnMenu: true,
		sortable: true,
		align: "center",
		headerAlign: "center",
		width: 170,
		type: "date",
		renderCell: (value) =>
			value?.row?.initial_date
				? moment(value?.row?.initial_date).format("DD/MM/YYYY")
				: "-",
	},
	{
		field: "final_date",
		headerName: "Final Date",
		disableColumnMenu: true,
		sortable: true,
		align: "center",
		headerAlign: "center",
		width: 170,
		type: "date",
		renderCell: (value) =>
			value?.row?.final_date
				? moment(value?.row?.final_date).format("DD/MM/YYYY")
				: "-",
	},
];
