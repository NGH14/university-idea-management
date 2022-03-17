import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Column } from "./model/Column";
import { IconButton } from "@mui/material";
import { Notification } from "../../common/Notification";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreHorizTwoTone from "@mui/icons-material/MoreHorizTwoTone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModalUserManagement from "./modal/ModalUserManagement";
import { STORAGE_VARS } from "../../common/env";
import { dataDemo } from "./FakeData";
import { DataGridPro } from "@mui/x-data-grid-pro";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { styled, alpha } from "@mui/material/styles";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import "./style.css";
import { AuthRequest } from "../../common/AppUse";
import CustomNoRowsOverlay from "../../components/Custom/CustomNoRowsOverlay";
import {StyledMenu} from "../../components/Custom/StyledMenu";


function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}
function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}



function UserManagement() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    initialValue: null,
    visibleNotification: false,
    titleNotification: "",
    typeNotification: "error", //error or success
    visibleModal: false,
    statusEdit: false,
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
      disableColumnMenu: true,
      sortable: false,
      renderCell: (value) => {
        return renderButton(value.id);
      },
    },
  ];

  const loadData = async () => {
    try {
      const res = await AuthRequest.get(
        `user-management/users?papesize=${pagination.pageSize}?page=${
          pagination.page + 1
        }`
      );
      if (res?.data?.succeeded) {
        setData(res?.data?.result?.rows);
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
  const renderButton = (id) => {
    return (
      <div>
        <IconButton id="useraction-menu" onClick={handleClick}>
          <MoreHorizTwoTone />
        </IconButton>
        <StyledMenu
          disableElevation
          id="user-menu"
          anchorEl={actionUser}
          open={openUserAction}
          onClose={handleClose}
        >
          <MenuItem onClick={() => onShow(id)}>
            <InfoOutlinedIcon color={"info"} />
            Details
          </MenuItem>

          <MenuItem onClick={() => onShow(id)}>
            <EditIcon color={"secondary"}></EditIcon> Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete(id);
            }}
          >
            <DeleteIcon color={"error"} />
            Delete
          </MenuItem>
        </StyledMenu>
      </div>
    );
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
        value
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
  //
  const onShow = async (id) => {
    try {
      const res = await AuthRequest.get(`user-management/user/${id}`);
      if (res?.data?.succeeded) {
        setStatus({
          ...status,
          initialValue: res?.data?.result,
          visibleModal: true,
          statusEdit: true,
        });
      }
    } catch {
      setStatus({
        ...status,
        statusEdit: true,
        visibleNotification: true,
        titleNotification: "Something went wrong, Please Try Again ",
        typeNotification: "error",
      });
    }
  };

  const onCloseNotification = () => {
    setStatus({ ...status, visibleNotification: false });
  };
  const onCloseModal = () => {
    setStatus({
      ...status,
      visibleModal: false,
      initialValue: null,
      statusEdit: false,
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
        initialValue={status.initialValue}
        statusEdit={status.statusEdit}
        onClose={onCloseModal}
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
          onClick={() => {
            setStatus({ ...status, visibleModal: true });
          }}
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
            // data
            dataDemo
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

          // checkboxSelection={false}
          // disableSelectionOnClick={true}
          // isRowSelectable={true}

          // rowCount={data.total}
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
