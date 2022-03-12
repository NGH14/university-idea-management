import { useEffect, useState } from "react";
import AppUse from "../../common/AppUse";
import { Column } from "./model/Column";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Snackbar } from "@mui/material";
import { Notification } from "../../common/Notification";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModalUserManagement from "./modal/ModalUserManagement";
import { STORAGE_VARS } from "../../common/env"
const dataDemo = [
  {
    id: "123",
    full_name: "Demo 01",
    user_name: "Demo 01",
    department: "Demo 01",
    email: "Demo 01",
    role: "Demo 01",
    password: "Demo 01",
    confirm_password: "Demo 01",
    date_of_birth: null,
  },
  {
    id: "1234",
    full_name: "Demo 02",
    user_name: "Demo 02",
    department: "Demo 02",
    email: "Demo 02",
    role: "Demo 02",
    password: "Demo 02",
    confirm_password: "Demo 02",
    date_of_birth: null,
  }
]
function UserManagement() {
  const [data, setData] = useState({
    dataUser: null,
    initialValue: null,
    visibleNotification: false,
    titleNotification: "",
    typeNotification: "error", //error or success
    visibleModal: false,
    statusEdit: false
  });

  const columns = [
    ...Column,
    {
      field: "id",
      headerName: "Action",
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      // flex: 1,
      renderCell: (value) => {
        return renderButton(value.id);
      },
    },
  ];
  const renderButton = (id) => {
    return (
      <div>
        <IconButton onClick={() => onShow(id)} color={"info"}>
          <InfoOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => onShow(id)} color={"secondary"}>
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            onDelete(id);
          }}
          color={"error"}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };

  const onDelete = (id) => {
    try{
      const res = AppUse.deleteApi(`user-management/user/${id}`);
      if (res?.data?.success) {
        setData({
          ...data,
          visibleNotification: true,
          titleNotification: "Delete user success",
          typeNotification: "success",
        });
        loadData();
      } else {
        setData({
          ...data,
          visibleNotification: true,
          titleNotification: "Delete user error",
          typeNotification: "error",
        });
      }
    } catch {
      setData({
        ...data,
        visibleNotification: true,
        titleNotification: "Delete user error",
        typeNotification: "error",
      });
    }
  };
  const onUpdate = async (value) => {
    console.log(value, 'value')
    try{
      const res = await AppUse.putApi(`user-management/user/${value?.id}`, value);
      if (res?.data?.success) {
        setData({
          ...data,
          visibleNotification: true,
          titleNotification: "Delete user success",
          typeNotification: "success",
          visibleModal: false,
        });
        loadData();
      } else {
        setData({
          ...data,
          visibleNotification: true,
          titleNotification: "Delete user error",
          typeNotification: "error",
        });
      }
    } catch {
      setData({
        ...data,
        visibleNotification: true,
        titleNotification: "Delete user error",
        typeNotification: "error",
      });
    }

  };
  const onCreate = (value) => {
    try {
      const res = AppUse.postApi(`user-management`, value);
      if (res?.data?.succeeded) {
        setData({
          ...data,
          visibleNotification: true,
          titleNotification: "Create User Success",
          typeNotification: "success",
          visibleModal: false,
        });
        loadData();
      } else {
        setData({
          ...data,
          visibleModal: false,
          visibleNotification: true,
          titleNotification: "Delete user error",
          typeNotification: "error",
        });
      }
    } catch {
      setData({
        ...data,
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
      const res = await AppUse.getApi(`user-management/user/${id}`);
      if (res?.data?.succeeded) {
        setData({ ...data,
          initialValue: res?.data?.result,
          visibleModal: true,
          statusEdit: true
        });
      } else {
        setData({
          ...data,
          statusEdit: true,
          visibleNotification: true,
          titleNotification: "Error sever",
          typeNotification: "error",
        });
      }
    } catch {
      setData({
        ...data,
        statusEdit: true,
        visibleNotification: true,
        titleNotification: "Error sever",
        typeNotification: "error",
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    const res = await AppUse.getApi("user-management/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
      },
    });
    
    if (res?.data?.succeeded) {
      setData({ ...data, dataUser: res?.data?.result?.rows });
    } else {
      setData({
        ...data,
        visibleNotification: true,
        titleNotification: "System error",
        typeNotification: "error",
      });
    }
  };
  const onCloseNotification = () => {
    setData({ ...data, visibleNotification: false });
  };
  const onCloseModal = () => {
    setData({ ...data, visibleModal: false, initialValue: null, statusEdit: false });
  };

  const renderModal = () => {
    return (
      <ModalUserManagement visible={data.visibleModal}
                           initialValue={data.initialValue}
                           statusEdit={data.statusEdit}
                           onClose={onCloseModal}
                           onCreate={onCreate}
                           onUpdate={onUpdate}
      />
    );
  };
  const renderContent = () => {
    return (
      <DataGrid
        rows={data.dataUser || dataDemo}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick={false}
        isRowSelectable={false}
      />
    );
  };
  const renderTop = () => {
    return (
      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            setData({ ...data, visibleModal: true });
          }}
        >
          Create
        </Button>
      </div>
    );
  };
  return (
    <div
      style={{
        height: 500,
        width: "100%",
        margin: "80px 0px 100px 0px",
        padding: "0 10px",
      }}
    >
      {renderTop()}
      {renderContent()}
      <Notification
        visible={data.visibleNotification}
        message={data.titleNotification}
        type={data.typeNotification}
        onClose={onCloseNotification}
      />
      {data.visibleModal && renderModal()}
    </div>
  );
}
export default UserManagement;
