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
		field: "full_name",
		headerName: "Full name",
		disableColumnMenu: true,
		sortable: true,
		width: "100%",
		type: "string",
		minWidth: 200,
		flex: 1,
		renderCell: (value) => (
			<div style={{ textTransform: "capitalize" }}>{value?.row?.full_name}</div>
		),
	},
	{
		field: "email",
		headerName: "Email",
		disableColumnMenu: true,
		sortable: true,
		type: "string",
		width: "auto",
		minWidth: 200,
		display: false,
		flex: 1,
	},
	{
		field: "department",
		headerName: "Department",
		align: "center",
		headerAlign: "center",
		disableColumnMenu: true,
		type: "string",
		sortable: true,
		width: 250,
		renderCell: (value) => (
			<div style={{ textTransform: "capitalize" }}>
				{value?.row?.department}
			</div>
		),
	},
	{
		field: "role",
		headerName: "Role",
		align: "center",
		headerAlign: "center",
		disableColumnMenu: true,
		sortable: true,
		width: 170,
		renderCell: (value) => (
			<div style={{ textTransform: "capitalize" }}>{value?.row?.role}</div>
		),
	},
];
