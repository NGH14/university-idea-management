import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

export const Column = [
  {
    field: "full_name",
    headerName: "Full name",
    disableColumnMenu: true,
    sortable: false,
    flex: 1,
    width: "auto",
  },
  {
    field: "date_of_birth",
    headerName: "Birthday",
    disableColumnMenu: true,
    sortable: false,
    type: "number",
    width: 120,
  },
  {
    field: "email",
    headerName: "Email",
    disableColumnMenu: true,
    sortable: false,
    type: "number",
    width: 220,
  },
  {
    field: "department",
    headerName: "Department",
    disableColumnMenu: true,
    sortable: false,
    type: "number",
    width: 150,
  },
  {
    field: "role",
    headerName: "Role",
    disableColumnMenu: true,
    sortable: false,
    width: 100,
  },
];
