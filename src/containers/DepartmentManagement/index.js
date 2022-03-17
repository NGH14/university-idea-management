import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Column } from "./model/Column";
import { IconButton } from "@mui/material";
import { Notification } from "../../common/Notification";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreHorizTwoTone from "@mui/icons-material/MoreHorizTwoTone";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DataGridPro } from "@mui/x-data-grid-pro";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";

import "../UserManagement/style.css";
import { AuthRequest } from "../../common/AppUse";
import ModalDepartmentManagement from "./modal/ModalDepartmentManagement";
import CustomNoRowsOverlay from "../../components/Custom/CustomNoRowsOverlay";
import {StyledMenu} from "../../components/Custom/StyledMenu";


function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}
function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}



function DepartmentManagement() {
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
  const openUserAction = Boolean(actionUser);
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

  useEffect(() => {
    loadData();
  }, [pagination]);

  const loadData = async () => {
    try {
      const res = await AuthRequest.get(
        `department-management/departments?papesize=${pagination.pageSize}?page=${
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
      const res = await AuthRequest.delete(`department-management/department/${id}`);
      if (res?.data?.succeeded) {

        setStatus({
          ...status,
          visibleNotification: true,
          titleNotification: "Delete Department success",
          typeNotification: "success",
        });
        loadData();
      }
    } catch {
      setStatus({
        ...status,
        visibleNotification: true,
        titleNotification: "Delete Department error",
        typeNotification: "error",
      });
    }
  };
  const onUpdate = async (value) => {
    handleClose();
    try {
      const res = await AuthRequest.put(
        `department-management/department/${value?.id}`,
        value
      );
      if (res?.data?.succeeded) {
        setStatus({
          ...status,
          visibleNotification: true,
          titleNotification: "Update Department success",
          typeNotification: "success",
          visibleModal: false,
        });
        loadData();
      }
    } catch {
      setStatus({
        ...status,
        visibleNotification: true,
        titleNotification: "Update Department error",
        typeNotification: "error",
      });
    }
  };
  const onCreate = async (value) => {
    try {
      const res = await AuthRequest.post(`department-management`, value);
      if (res?.data?.succeeded) {
        setStatus({
          ...status,
          visibleModal: false,
          visibleNotification: true,
          titleNotification: "Create Department Success",
          typeNotification: "success",
        });
        await loadData();
      }
    } catch {
      setStatus({
        ...status,
        visibleNotification: true,
        titleNotification: "Create Department error",
        typeNotification: "error",
      });
    }
  };
  //
  const onShow = async (id) => {
    try {
      const res = await AuthRequest.get(`category-management/category/${id}`);
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

  const renderModal = () => {
    return (
      <ModalDepartmentManagement
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
        <h2 className="managementuser_heading">Department manager</h2>
        <Button
          variant="contained"
          endIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            setStatus({ ...status, visibleModal: true });
          }}
        >
          Create
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
          }}
          rows={data }// dataDemo
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
          style={{minHeight: 700}}
          // autoHeight={true}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        height: '100vh',
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
export default DepartmentManagement;
