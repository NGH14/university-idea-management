import "./style.css";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import * as React from "react";
import { useContext, useEffect, useState } from "react";

import { AuthRequest } from "../../common/AppUse";
import { Notification } from "../../common/Notification";
import CustomNoRowsOverlay from "../../components/Custom/CustomNoRowsOverlay";
import { UserContext } from "../../context/AppContext";
import ModalUserManagement from "./modal/ModalUserManagement";
import { Column } from "./model/Column";

function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}
function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

function UserManagement() {
  const { state, setState } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [status, setStatus] = useState({
    visibleNotification: false,
    titleNotification: "",
    typeNotification: "error", //error or success
    visibleModal: false,
    action: "create", // create, update, detail
  });
  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 0,
  });

  const [actionUser, setActionUser] = useState(null);
  const [tableToolBar, setTableToolBar] = useState(false);

  useEffect(() => {
    loadData();
  }, [pagination]);

  const openUserAction = Boolean(actionUser);
  const handleOnClickToolBar = () => {
    setTableToolBar((pre) => !pre);
  };

  const handleClick = (event) => {
    setActionUser(event.currentTarget);
  };

  const handleClose = () => {
    setActionUser(null);
  };

  const columns = [
    ...Column,
    {
      field: "actions",
      headerName: "Action",
      width: 75,
      type: "actions",
      disableColumnMenu: true,
      sortable: false,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<InfoOutlinedIcon color={"info"} />}
          label="Detail"
          onClick={() => onOpenModal(params.id, "detail")}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon color={"secondary"} />}
          label="Update"
          onClick={() => onOpenModal(params.id, "update")}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          disabled={state?.dataUser?.id === params.id ? true : false}
          label="Delete"
          onClick={() => onDelete(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  const loadData = async () => {
    try {
      const res = await AuthRequest.get(
        `user-management/users?papesize=${pagination.pageSize}?page=${
          pagination.page + 1
        }`,
      );
      if (res?.data?.succeeded) {
        setData(res?.data?.result?.rows);
        setRowId(null);
      }
    } catch {
      setStatus({
        ...status,
        visibleNotification: true,
        titleNotification: "Something went wrong, Please Try Again ",
        typeNotification: "error",
      });
    }
  };

  const onOpenModal = (id, action) => {
    if (id) {
      setRowId(id);
    }
    setStatus({ ...status, visibleModal: true, action });
  };

  const onDelete = async (id) => {
    handleClose();
    try {
      const res = await AuthRequest.delete(`user-management/user/${id}`);
      if (res?.data?.succeeded) {
        setStatus({
          ...status,
          visibleNotification: true,
          titleNotification: "Delete user success",
          typeNotification: "success",
        });
        loadData();
      }
    } catch {
      setStatus({
        ...status,
        visibleNotification: true,
        titleNotification: "Delete user error",
        typeNotification: "error",
      });
    }
  };
  const onUpdate = async (value) => {
    handleClose();
    try {
      const res = await AuthRequest.put(
        `user-management/user/${value?.id}`,
        value,
      );
      if (res?.data?.succeeded) {
        setStatus({
          ...status,
          visibleNotification: true,
          titleNotification: "Delete user success",
          typeNotification: "success",
          visibleModal: false,
        });
        loadData();
      }
    } catch {
      setStatus({
        ...status,
        visibleNotification: true,
        titleNotification: "Delete user error",
        typeNotification: "error",
      });
    }
  };
  const onCreate = async (value) => {
    try {
      const res = await AuthRequest.post(`user-management`, value);
      if (res?.data?.succeeded) {
        setStatus({
          ...status,
          visibleNotification: true,
          titleNotification: "Create User Success",
          typeNotification: "success",
          visibleModal: false,
        });
        loadData();
      }
    } catch {
      setStatus({
        ...status,
        visibleModal: false,
        visibleNotification: true,
        titleNotification: "Delete user error",
        typeNotification: "error",
      });
    }
  };

  const onCloseNotification = () => {
    setStatus({ ...status, visibleNotification: false });
  };
  const onCloseModal = () => {
    if (rowId) {
      setRowId(null);
    }
    setStatus({
      ...status,
      visibleModal: false,
    });
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer
        sx={{ fontWeight: 700, display: "flex", justifyContent: "ceter" }}
      >
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </GridToolbarContainer>
    );
  };
  const renderModal = () => {
    return (
      <ModalUserManagement
        visible={status.visibleModal}
        action={status.action}
        onClose={onCloseModal}
        rowId={rowId}
        onCreate={onCreate}
        onUpdate={onUpdate}
      />
    );
  };
  const onChangePagination = (pageSize, page) => {
    setPagination({ page, pageSize });
  };
  const renderTop = () => {
    return (
      <div className="managementuser_title">
        <div className="managementuser_heading">
          <h2>Management User</h2>
          <Tooltip title="Table Tool Bar">
            <IconButton onClick={handleOnClickToolBar}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </div>

        <Button
          variant="contained"
          endIcon={<AddCircleOutlineIcon />}
          onClick={() => onOpenModal(null, "create")}
        >
          Add user
        </Button>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="managementuser_table">
        <DataGridPro
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            ColumnSortedDescendingIcon: SortedDescendingIcon,
            ColumnSortedAscendingIcon: SortedAscendingIcon,
            Toolbar: tableToolBar && CustomToolbar,
          }}
          rows={
            data
            // dataDemo
          }
          columns={columns}
          pagination={true}
          cell--textCenter
          pageSize={pagination.pageSize}
          page={pagination.page}
          initialState={{ pinnedColumns: { right: ["actions"] } }}
          onPageSizeChange={(pageSize) => {
            onChangePagination(pageSize, pagination.page);
          }}
          onPageChange={(page) => {
            onChangePagination(pagination.pageSize, page);
          }}
          style={{ minHeight: "600px" }}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "700px",
        width: "100%",
        padding: "0 5px",
        fontFamily: "Poppins",
      }}
    >
      {renderTop()}
      {renderContent()}
      <Notification
        visible={status.visibleNotification}
        message={status.titleNotification}
        type={status.typeNotification}
        onClose={onCloseNotification}
      />
      {status.visibleModal && renderModal()}
    </div>
  );
}
export default UserManagement;
