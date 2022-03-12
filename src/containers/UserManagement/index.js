import {useEffect, useState} from "react";
import {AppUse, RequestApi} from "../../common/AppUse";
import { Column } from "./model/Column";
import { IconButton} from "@mui/material";
import { Notification } from "../../common/Notification";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModalUserManagement from "./modal/ModalUserManagement";
import { STORAGE_VARS } from "../../common/env";
import { dataDemo } from "./FakeData";
import {DataGridPro} from "@mui/x-data-grid-pro";

function UserManagement() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    loading: true,
    initialValue: null,
    visibleNotification: false,
    titleNotification: "",
    typeNotification: "error", //error or success
    visibleModal: false,
    statusEdit: false,
  })
  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 0
  })

  const columns = [
    ...Column,
    {
      headerAlign: "center",
      field: "actions",
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

  useEffect(() => {
    loadData();
  }, [pagination]);


  const loadData = async () => {
    try{
      const res = await RequestApi.getApi(`user-management/users?papesize=${pagination.pageSize}?page=${pagination.page+1}`);
      if (res?.data?.succeeded) {
        setData(res?.data?.result?.rows)
        setStatus({...status, loading: false})
      }
    } catch {
      setStatus({
        ...status,
        visibleNotification: true,
        titleNotification: "System error",
        typeNotification: "error",
      });
    }
  };
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
    try {
      const res = RequestApi.deleteApi(`user-management/user/${id}`);
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
    console.log(value, "value");
    try {
      const res = await RequestApi.putApi(
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
        })
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
  const onCreate = (value) => {
    try {
      const res = RequestApi.postApi(`user-management`, value);
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
      const res = await RequestApi.getApi(`user-management/user/${id}`);
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
        titleNotification: "Error sever",
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
  const onChangePagination =  (pageSize, page) => {
    setPagination({page, pageSize})
  }
  const renderTop = () => {
    return (
        <div style={{ textAlign: "right", marginBottom: 10 }}>
          <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
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
      <DataGridPro
          rows={data || dataDemo}
          columns={columns}
          pagination={true}
          columnHeader--alignCenter={'c'}
          pageSize={pagination.pageSize}
          page={pagination.page}
          initialState={{ pinnedColumns: { right: ['actions']} }}
          onPageSizeChange={(pageSize)=>{onChangePagination(pageSize, pagination.page)}}
          onPageChange={(page)=>{onChangePagination( pagination.pageSize,page)}}
          rowsPerPageOptions={[10, 25, 50, 100]}
          // checkboxSelection={false}
          // disableSelectionOnClick={false}
          // isRowSelectable={false}
          rowCount={50}
      />
    )
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
