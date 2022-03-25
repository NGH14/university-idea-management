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

import { AuthRequest } from "../../common/AppUse";
import CustomNoRowsOverlay from "../../components/Custom/CustomNoRowsOverlay";
import { StyledMenu } from "../../components/Custom/StyledMenu";
import Notification from "../../components/Notification";
import ModalDepartmentManagement from "./modal/ModalDepartmentManagement";
import { Column } from "./model/Column";

function SortedDescendingIcon() {
	return <ExpandMoreIcon className="icon" />;
}
function SortedAscendingIcon() {
	return <ExpandLessIcon className="icon" />;
}

function DepartmentManagement() {
	const [data, setData] = useState([]);
	const [rowId, setRowId] = useState(null);
	const [status, setStatus] = useState({
		visibleNotification: false,
		titleNotification: "",
		typeNotification: "error", //error or success
		visibleModal: false,
		action: "create", // create, update, detail
	});
	const [pagination, setPagination] = useState({
		pageSize: 10,
		page: 0,
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
		try {
			const res = await AuthRequest.get(
				`department-management/departments?papesize=${
					pagination.pageSize
				}?page=${pagination.page + 1}`,
			);
			if (res?.data?.succeeded) {
				setData(res?.data?.result?.rows);
				setRowId(null);
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
		try {
			const res = await AuthRequest.delete(
				`department-management/department/${id}`,
			);
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
				value,
			);
			if (res?.data?.succeeded) {
				setStatus({
					...status,
					action: "create",
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
					action: "create",
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

	const onCloseNotification = () => {
		setStatus({ ...status, visibleNotification: false });
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
			<ModalDepartmentManagement
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
				<h2 className="managementuser_heading">Department manager</h2>
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
					}}
					rows={data} // dataDemo
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
