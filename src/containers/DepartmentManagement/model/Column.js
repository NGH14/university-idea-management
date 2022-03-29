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
		renderCell: (value) => <div>{value.api.getRowIndex(value.id) + 1}</div>,
	},
	{
		field: "name",
		headerName: "Department",
		align: "center",
		headerAlign: "center",
		disableColumnMenu: true,
		width: "100%",
		type: "string",
		minWidth: 200,
		flex: 1,
		sortable: true,
	},
	{
		field: "created_date",
		headerName: "Create Date",
		disableColumnMenu: true,
		sortable: false,
		align: "center",
		headerAlign: "center",
		width: 150,
		type: "date",
		renderCell: (value) => (
			<div>{moment(value?.row?.created_date).format("DD/MM/YYYY hh:mm")}</div>
		),
		flex: 1,
	},
	{
		field: "modified_date",
		headerName: "Modified Date",
		disableColumnMenu: true,
		sortable: true,
		align: "center",
		headerAlign: "center",
		width: 140,
		type: "date",
		renderCell: (value) => (
			<div>{moment(value?.row?.created_date).format("DD/MM/YYYY hh:mm")}</div>
		),
		flex: 1,
	},
	{
		field: "modified_by",
		headerName: "Modified By",
		disableColumnMenu: true,
		align: "center",
		headerAlign: "center",
		type: "string",
		sortable: true,
		width: 200,
		renderCell: (value) => <div>{value?.row?.modified_by}</div>,
		flex: 1,
	},
];
