import "../UserManagement/style.css";

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
import { useNavigate } from "react-router-dom";

import { AuthRequest } from "../../common/AppUse";
import { API_PATHS, URL_PATHS } from "../../common/env";
import CustomNoRowsOverlay from "../../components/Custom/CustomNoRowsOverlay";
import { UserContext } from "../../context/AppContext";
import ModalSubmissionManagement from "./modal/ModalUserManagement";
import { Column } from "./model/Column";

function SortedDescendingIcon() {
	return <ExpandMoreIcon className="icon" />;
}

function SortedAscendingIcon() {
	return <ExpandLessIcon className="icon" />;
}

function SubmissionManagement() {
	const navigate = useNavigate();
	const { state } = useContext(UserContext);
	const [data, setData] = useState([]);
	const [rowId, setRowId] = useState(null);

	const [status, setStatus] = useState({
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
					onClick={() => navigate(`${URL_PATHS.MANAGE_SUB}/${params.id}`)}
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
		await AuthRequest.get(
			`${API_PATHS.ADMIN.SUB}?papesize=${pagination.pageSize}?page=${pagination.page + 1}`,
		)
			.then((res) => {
				if (res?.data?.succeeded) {
					setData(res?.data?.result?.rows);
					setRowId(null);
				}
			})
			.catch(() => {});
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
			const res = await AuthRequest.delete(`submission-management/${id}`);
			if (res?.data?.succeeded) {
				loadData();
			}
		} catch {}
	};

	const onUpdate = async (value) => {
		handleClose();
		try {
			const res = await AuthRequest.put(`submission-management/${value?.id}`, value);
			if (res?.data?.succeeded) {
				loadData();
			}
		} catch {}
	};

	const onCreate = async (value) => {
		try {
			const res = await AuthRequest.post(`submission-management`, value);
			if (res?.data?.succeeded) {
				setStatus({
					...status,
					visibleModal: false,
				});
				await loadData();
			}
		} catch {
			setStatus({
				...status,
				visibleModal: false,
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
			<GridToolbarContainer sx={{ fontWeight: 700, display: "flex", justifyContent: "ceter" }}>
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
			<div className="managementuser_title">
				<div className="managementuser_heading">
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
			<div className="managementuser_table">
				<DataGridPro
					components={{
						NoRowsOverlay: CustomNoRowsOverlay,
						ColumnSortedDescendingIcon: SortedDescendingIcon,
						ColumnSortedAscendingIcon: SortedAscendingIcon,
						Toolbar: tableToolBar && CustomToolbar,
					}}
					rows={
						data || []
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
			{status.visibleModal && renderModal()}
		</div>
	);
}
export default SubmissionManagement;
