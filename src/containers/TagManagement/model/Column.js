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
		headerName: "Tag",
		headerAlign: "center",
		disableColumnMenu: true,
		sortable: true,
		width: "100%",
		type: "string",
		minWidth: 200,
		flex: 1,
		renderCell: (value) => (
			<div style={{ textTransform: "capitalize" }}>{value?.row?.name}</div>
		),
	},
	{
		field: "created_by",
		headerName: "Created By",
		disableColumnMenu: true,
		sortable: true,
		width: "100%",
		type: "string",
		minWidth: 200,
		flex: 1,
		renderCell: (value) => (
			<div style={{ textTransform: "capitalize" }}>
				{value?.row?.created_by}
			</div>
		),
	},
	{
		field: "modified_by",
		headerName: "Modified By",
		disableColumnMenu: true,
		sortable: true,
		width: "100%",
		type: "string",
		minWidth: 200,
		flex: 1,
		renderCell: (value) => (
			<div style={{ textTransform: "capitalize" }}>
				{value?.row?.modified_by}
			</div>
		),
	},
	{
		field: "created_date",
		headerName: "Create At",
		disableColumnMenu: true,
		sortable: false,
		align: "center",
		headerAlign: "center",
		minWidth: 150,
		type: "date",
		flex: 1,
		renderCell: (value) => (
			<div>{moment(value?.row?.created_date).format("DD/MM/YYYY hh:mm")}</div>
		),
	},
	{
		field: "modified_date",
		headerName: "Modified At",
		disableColumnMenu: true,
		sortable: true,
		align: "center",
		headerAlign: "center",
		width: 150,
		type: "date",
		renderCell: (value) => (
			<div>{moment(value?.row?.created_date).format("DD/MM/YYYY hh:mm")}</div>
		),
	},
];
