import { useEffect, useState } from "react"
import AppUse from "../../common/AppUse"
import { Column } from "./model/Column"
import { DataGrid } from "@mui/x-data-grid"
import { IconButton, Snackbar } from "@mui/material"
import { Notification } from "../../common/Notification"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import ModalCreateUser from "./modal/ModalCreateUser"
import Button from "@mui/material/Button"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

function UserManagement() {
  const [data, setData] = useState({
    dataUser: null,
    initialValue: null,
    visibleNotification: false,
    titleNotification: "",
    typeNotification: "error", //error or success
    visibleModal: false,
  })

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
        return renderButton(value.id)
      },
    },
  ]
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
            onDelete(id)
          }}
          color={"error"}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    )
  }

  const onDelete = (id) => {
    const res = AppUse.deleteApi(`user-management/user/${id}`)
    if (res?.data?.success) {
      setData({
        ...data,
        visibleNotification: true,
        titleNotification: "Delete user success",
        typeNotification: "success",
      })
      loadData()
    } else {
      setData({
        ...data,
        visibleNotification: true,
        titleNotification: "Delete user error",
        typeNotification: "error",
      })
    }
  }
  const onUpdate = async (id, value) => {
    const res = await AppUse.putApi(`user-management/user/${id}`, value)
    if (res?.data?.success) {
      setData({
        ...data,
        visibleNotification: true,
        titleNotification: "Delete user success",
        typeNotification: "success",
        visibleModal: false
      })
      loadData()
    } else {
      setData({
        ...data,
        visibleNotification: true,
        titleNotification: "Delete user error",
        typeNotification: "error",
      })
    }
  }
  const onCreate = (value) => {
      const res = AppUse.deleteApi(`user-management`)
      if(res?.data?.succeeded){
          setData({...data, visibleNotification: true,
            titleNotification: 'Create User Success',
            typeNotification: 'success',
            visibleModal: false})
          loadData()
      } else {
          setData({...data, visibleNotification: true, titleNotification: 'Delete user error', typeNotification: 'error'})
      }
  }
  //
  const onShow = async (id) => {
    const res = await AppUse.getApi(`user-management/user/${id}`)
    if (res?.data?.success) {
      setData({ ...data, initialValue: res?.data?.result, visibleModal: true })
    } else {
      setData({
        ...data,
        visibleNotification: true,
        titleNotification: "Error sever",
        typeNotification: "error",
      })
    }
  }

  useEffect(()=>{
      loadData()
  }, [])
  const loadData = async () => {
    const res = await AppUse.getApi("user-management/users")
    if (res?.data?.succeeded) {
      setData({ ...data, dataUser: res?.data?.result?.rows })
    } else {
      setData({
        ...data,
        visibleNotification: true,
        titleNotification: "System error",
        typeNotification: "error",
      })
    }
  }
  const onCloseNotification = () => {
    setData({ ...data, visibleNotification: false })
  }
  const onCloseModal = () => {
    setData({ ...data, visibleModal: false })
  }

  const renderModal = () => {
    return (
      <ModalCreateUser visible={data.visibleModal} onClose={onCloseModal} />
    )
  }
  const renderContent = () => {
    return (
      <DataGrid
        rows={data.dataUser}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick={false}
        isRowSelectable={false}
      />
    )
  }
  const renderTop = () => {
    return (
      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            setData({ ...data, visibleModal: true })
          }}
        >
          Create
        </Button>
      </div>
    )
  }
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
  )
}
export default UserManagement
