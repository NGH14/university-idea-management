import "./style.css";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import { BiPencil } from "react-icons/bi";
import { GoInfo } from "react-icons/go";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

import { AuthRequest, sleep } from "../../common/AppUse";
import { API_PATHS, DEV_CONFIGS } from "../../common/env";
import CustomNoRowsOverlay from "../../components/Custom/CustomNoRowsOverlay";
import { UserContext } from "../../context/AppContext";
import { dataDemo } from "./FakeData";
import ModalUserManagement from "./modal/ModalUserManagement";
import { Column } from "./model/Column";

const toastMessages = {
  WAIT: "Please wait...",
  SUC_USER_ADDED: "Create user successful !!",
  SUC_USER_EDITED: "Update user successful !!",
  SUC_USER_DEL: "Delete user successful !!",
  ERR_SERVER_ERROR: "Something went wrong, please try again !!",
};

function UserManagement() {
  const { state } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState(null);

  const [status, setStatus] = useState({
    visibleModal: false,
    action: "create",
  });

  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 0,
  });

  const [tableToolBar, setTableToolBar] = useState(false);
  useEffect(() => {
    if (DEV_CONFIGS.IS_OFFLINE_DEV) {
      setData(dataDemo);
      setRowId(null);
      return;
    }

    loadData();
  }, [pagination]);

  const handleOnClickToolBar = () => setTableToolBar((pre) => !pre);

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
          icon={<GoInfo color="#3f66da" style={{ fontSize: "20px" }} />}
          label="Detail"
          onClick={() => onOpenModal(params.id, "detail")}
          showInMenu
        />,

        <GridActionsCellItem
          icon={<BiPencil style={{ fontSize: "20px" }} />}
          label="Update"
          disabled={state?.dataUser?.id === params.id ? true : false}
          onClick={() => onOpenModal(params.id, "update")}
          showInMenu
        />,

        <GridActionsCellItem
          icon={
            <MdOutlineDeleteOutline color="red" style={{ fontSize: "20px" }} />
          }
          disabled={state?.dataUser?.id === params.id ? true : false}
          label="Delete"
          onClick={() => onDelete(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  const loadData = async () => {
    await AuthRequest.get(API_PATHS.ADMIN.MANAGE_USER + "/list", {
      params: {
        page: pagination.page + 1,
        page_size: pagination.pageSize,
      },
    })
      .then((res) => {
        setData(res?.data?.result?.rows ?? []);
        setRowId(null);
      })
      .catch(() => toast.error(toastMessages.ERR_SERVER_ERROR));
  };

  const onOpenModal = (id, action) => {
    if (id) {
      setRowId(id);
    }
    setStatus({ ...status, visibleModal: true, action });
  };

  const onDelete = async (id) => {
    toast
      .promise(
        AuthRequest.delete(`${API_PATHS.ADMIN.MANAGE_USER}/${id}`).then(() =>
          sleep(700)
        ),
        {
          pending: toastMessages.WAIT,
          success: toastMessages.SUC_USER_DEL,
          error: toastMessages.ERR_SERVER_ERROR,
        }
      )
      .then(() => {
        setStatus({ ...status, visibleModal: false });
        loadData();
      });
  };

  const onUpdate = async (value) => {
    toast
      .promise(
        AuthRequest.put(
          `${API_PATHS.ADMIN.MANAGE_USER}/${value?.id}`,
          value
        ).then(() => sleep(700)),
        {
          pending: toastMessages.WAIT,
          success: toastMessages.SUC_USER_EDITED,
          error: toastMessages.ERR_SERVER_ERROR,
        }
      )
      .then(() => {
        setStatus({ ...status, visibleModal: false });
        loadData();
      });
  };

  const onCreate = async (value) => {
    toast
      .promise(
        AuthRequest.post(API_PATHS.ADMIN.MANAGE_USER, value).then(() =>
          sleep(700)
        ),
        {
          pending: toastMessages.WAIT,
          success: toastMessages.SUC_USER_ADDED,
          error: toastMessages.ERR_SERVER_ERROR,
        }
      )
      .then(() => {
        setStatus({ ...status, visibleModal: false });
        loadData();
      });
  };

  const onCloseModal = () => {
    rowId && setRowId(null);

    setStatus({
      ...status,
      visibleModal: false,
    });
  };

  const CustomToolbarUser = () => {
    return (
      <GridToolbarContainer sx={{ fontWeight: 700 }}>
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
          <h2>User Management</h2>
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
            ColumnSortedDescendingIcon: () => (
              <ExpandMoreIcon className="icon" />
            ),
            ColumnSortedAscendingIcon: () => (
              <ExpandLessIcon className="icon" />
            ),
            Toolbar: tableToolBar && CustomToolbarUser,
          }}
          rows={data}
          columns={columns}
          columnVisibilityModel={{}}
          pagination={true}
          cell--textCenter
          pageSize={pagination.pageSize}
          page={pagination.page}
          initialState={{ pinnedColumns: { right: ["actions"] } }}
          onPageSizeChange={(pageSize) =>
            onChangePagination(pageSize, pagination.page)
          }
          onPageChange={(page) => onChangePagination(pagination.pageSize, page)}
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
      {status.visibleModal && renderModal()}
    </div>
  );
}
export default UserManagement;
