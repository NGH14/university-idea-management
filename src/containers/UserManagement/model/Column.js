import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

export const Column = [
  {
    field: "fullName",
    headerName: "Full name",
    disableColumnMenu: true,
    sortable: false,
    flex: 1,
    width: "auto",
  },
  {
    field: "dateOfBirth",
    headerName: "Birthday",
    disableColumnMenu: true,
    sortable: false,
    type: "number",
    width: 180,
  },
  {
    field: "Email",
    headerName: "email",
    disableColumnMenu: true,
    sortable: false,
    type: "number",
    width: 180,
  },
  {
    field: "Department",
    headerName: "department",
    disableColumnMenu: true,
    sortable: false,
    type: "number",
    width: 180,
  },
  {
    field: "Role",
    headerName: "role",
    disableColumnMenu: true,
    sortable: false,
    width: 180,
  },
];
