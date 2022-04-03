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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthRequest, sleep } from "../../common/AppUse";
import { API_PATHS, DEV_CONFIGS, URL_PATHS } from "../../common/env";
import CustomNoRowsOverlay from "../../components/Custom/CustomNoRowsOverlay";
import { UserContext } from "../../context/AppContext";
import { dataDemo_submissions } from "./FakeData/Submissions";
import ModalSubmissionManagement from "./modal/ModalSubmissionManagement";
import { Column } from "./model/Column";

const toastMessages = {
	WAIT: "Please wait...",
	SUC_SUB_ADDED: "Create submission successful !!",
	SUC_SUB_EDITED: "Update submission successful !!",
	SUC_SUB_DEL: "Delete submission successful !!",
	ERR_SERVER_ERROR: "Something went wrong, please try again !!",
};

function SubmissionManagement() {
	const { state, setState } = useContext(UserContext);
	const [data, setData] = useState([]);
	const [rowId, setRowId] = useState(null);
	const navigate = useNavigate();

	const [status, setStatus] = useState({
		visibleModal: false,
		action: "create",
	});

	const [pagination, setPagination] = useState({
		pageSize: 10,
		page: 0,
	});

	const [actionUser, setActionUser] = useState(null);
	const [tableToolBar, setTableToolBar] = useState(false);

	useEffect(() => {
		if (DEV_CONFIGS.IS_OFFLINE_DEV) {
			setData(dataDemo_submissions);
			setRowId(null);
			return;
		}

		loadData();
	}, [pagination]);

	const openUserAction = Boolean(actionUser);
	const handleOnClickToolBar = () => setTableToolBar((pre) => !pre);

	const handleClick = (event) => setActionUser(event.currentTarget);
	const handleClose = () => setActionUser(null);

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
					onClick={() => navigate(`${URL_PATHS.MANAGE_SUB}/${params.id}`)}
					showInMenu
				/>,

				<GridActionsCellItem
					icon={<BiPencil style={{ fontSize: "20px" }} />}
					label="Update"
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
		await AuthRequest.get(API_PATHS.ADMIN.MANAGE_SUB + "/list", {
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
				AuthRequest.delete(`${API_PATHS.ADMIN.MANAGE_SUB}/${id}`).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_SUB_DEL,
					error: toastMessages.ERR_SERVER_ERROR,
				},
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
					`${API_PATHS.ADMIN.MANAGE_SUB}/${value?.id}`,
					value,
				).then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_SUB_EDITED,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				setStatus({ ...status, visibleModal: false });
				loadData();
			});
	};

	const onCreate = async (value) => {
		toast
			.promise(
				AuthRequest.post(API_PATHS.ADMIN.MANAGE_SUB, value).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_SUB_ADDED,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				setStatus({ ...status, visibleModal: false });
				loadData();
			});
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
			<ModalSubmissionManagement
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
			<div className="managementsubmission_title">
				<div className="managementsubmission_heading">
					<h2>Management Submission</h2>
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
					Create
				</Button>
			</div>
		);
	};

	const renderContent = () => {
		return (
			<div className="managementsubmission_table">
				<DataGridPro
					components={{
						NoRowsOverlay: CustomNoRowsOverlay,
						ColumnSortedDescendingIcon: () => (
							<ExpandMoreIcon className="icon" />
						),
						ColumnSortedAscendingIcon: () => (
							<ExpandLessIcon className="icon" />
						),
						Toolbar: tableToolBar && CustomToolbar,
					}}
					rows={data}
					columns={columns}
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
export default SubmissionManagement;
