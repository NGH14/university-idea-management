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
		width: 150,
	},
	{
		field: "role",
		headerName: "Role",
		align: "center",
		headerAlign: "center",
		disableColumnMenu: true,
		sortable: true,
		width: 150,
	},
	{
		field: "date_of_birth",
		headerName: "Birthday",
		disableColumnMenu: true,
		sortable: true,
		align: "center",
		headerAlign: "center",
		width: 140,
		renderCell: (value) => (
			<div>
				{value?.row?.date_of_birth
					? moment(value?.row?.date_of_birth).format("DD/MM/YYYY")
					: null}
			</div>
		),
		type: "date",
	},
];
