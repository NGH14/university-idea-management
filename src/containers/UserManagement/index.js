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

function CustomNoRowsOverlay() {
  const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",

    "& .ant-empty-img-1": {
      fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
      fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
      fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
      fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
      fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
      fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
  }));
  return (
    <StyledGridOverlay>
      <svg
        width="140"
        height="120"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No User</Box>
    </StyledGridOverlay>
  );
}
function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}
function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: 10,

    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgba(255, 255, 255, 0.4) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

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
