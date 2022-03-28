import "../UserManagement/style.css";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreHorizTwoTone from "@mui/icons-material/MoreHorizTwoTone";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthRequest } from "../../common/AppUse";
import { API_PATHS } from "../../common/env";
import CustomNoRowsOverlay from "../../components/Custom/CustomNoRowsOverlay";
import { StyledMenu } from "../../components/Custom/StyledMenu";
import ModalTagManagement from "./modal/ModalTagManagement";
import { Column } from "./model/Column";

const toastMessages = {
	SUC_TAG_ADDED: "Create tag successful !!",
	SUC_TAG_EDITED: "Update tag successful !!",
	SUC_TAG_DEL: "Delete tag successful !!",
	ERR_SERVER_ERROR: "Something went wrong, please try again !!",
};

function TagManagement() {
	const [data, setData] = useState([]);
	const [rowId, setRowId] = useState(null);

	const [status, setStatus] = useState({
		visibleModal: false,
		action: "create",
	});

	const [pagination, setPagination] = useState({
		page: 0,
		pageSize: 10,
	});

	useEffect(() => {
		loadData();
	}, [pagination]);

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
					label="Delete"
					onClick={() => onDelete(params.id)}
					showInMenu
				/>,
			],
		},
	];

	const loadData = async () => {
		await AuthRequest.get(API_PATHS.ADMIN.TAG, {
			params: {
				page: pagination.page + 1,
				page_size: pagination.pageSize,
			},
		})
			.then((res) => {
				setData(res?.data?.result?.rows);
				setRowId(null);
			})
			.catch(() =>
				toast.error(toastMessages.ERR_SERVER_ERROR, {
					style: { width: "auto" },
				}),
			);
	};

	const renderActionButton = (id) => {
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
					<MenuItem onClick={() => onOpenModal(id, "detail")}>
						<InfoOutlinedIcon color={"info"} />
						Details
					</MenuItem>

					<MenuItem onClick={() => onOpenModal(id, "update")}>
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

	const onOpenModal = (id, action) => {
		if (id) {
			setRowId(id);
		}
		setStatus({ ...status, visibleModal: true, action });
	};

	const onDelete = async (id) => {
		handleClose();
		await AuthRequest.delete(`${API_PATHS.ADMIN.TAG}/${id}`)
			.then(() => {
				toast.success(toastMessages.SUC_TAG_DEL);
				loadData();
			})
			.catch(() =>
				toast.success(toastMessages.ERR_SERVER_ERROR, {
					style: { width: "auto" },
				}),
			);
	};

	const onUpdate = async (value) => {
		handleClose();
		await AuthRequest.put(`${API_PATHS.ADMIN.TAG}/${value?.id}`, value)
			.then(() => {
				toast.success(toastMessages.SUC_TAG_EDITED);
				loadData();
			})
			.catch(() =>
				toast.success(toastMessages.ERR_SERVER_ERROR, {
					style: { width: "auto" },
				}),
			);
	};

	const onCreate = async (value) => {
		await AuthRequest.post(API_PATHS.ADMIN.TAG, value)
			.then(() => {
				toast.success(toastMessages.SUC_TAG_ADDED);
				loadData();
			})
			.catch(() =>
				toast.success(toastMessages.ERR_SERVER_ERROR, {
					style: { width: "auto" },
				}),
			);
	};

	const onCloseModal = () => {
		setStatus({
			...status,
			visibleModal: false,
			action: "create",
		});
	};

	const renderModal = () => {
		return (
			<ModalTagManagement
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
				<h2 className="managementuser_heading">Tag manager</h2>
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
						ColumnSortedDescendingIcon: () => (
							<ExpandMoreIcon className="icon" />
						),
						ColumnSortedAscendingIcon: () => (
							<ExpandLessIcon className="icon" />
						),
					}}
					rows={data || []} // dataDemo
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
					style={{ minHeight: 700 }}
					// autoHeight={true}
					rowsPerPageOptions={[10, 25, 50, 100]}
				/>
			</div>
		);
	};

	return (
		<div
			style={{
				height: "100vh",
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
export default TagManagement;
