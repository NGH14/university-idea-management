import moment from "moment";

export const Column = [
  {
    field: "no",
    headerName: "No.",
    disableColumnMenu: true,
    sortable: false,
    width: 80,
    type: "number",
    // flex: 1,
    align: "center",
    headerAlign: "center",

    renderCell: (value) => {
      return <div>{value.api.getRowIndex(value.id) + 1}</div>;
    },
  },
  {
    field: "name",
    headerAlign: "center",
    headerName: "Tag",
    disableColumnMenu: true,
    sortable: true,
    width: "100%",
    type: "string",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "created_date",
    headerAlign: "center",
    headerName: "Create at",
    disableColumnMenu: true,
    sortable: false,
    width: "auto",
    minWidth: 200,
    type: "date",
    renderCell: (value) => {
      return (
        <div>{moment(value?.row?.created_date).format("DD/MM/YYYY hh:mm")}</div>
      );
    },
    flex: 1,
  },
];
