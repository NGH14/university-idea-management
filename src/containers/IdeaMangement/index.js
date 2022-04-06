import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button} from "@mui/material";
import _ from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthRequest, sleep } from "../../common/AppUse";
import {API_PATHS} from "../../common/env";
import ModalIdea from "../../components/Idea/ModalIdea";
import {DataGridPro, GridActionsCellItem} from "@mui/x-data-grid-pro";
import CustomNoRowsOverlay from "../../components/Custom/CustomNoRowsOverlay";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {GoInfo} from "react-icons/go";
import {BiPencil} from "react-icons/bi";
import {MdOutlineDeleteOutline} from "react-icons/md";
import {Columns} from "./model/Columns";
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector, GridToolbarExport,
	GridToolbarFilterButton
} from "@mui/x-data-grid";

const toastMessages = {
	WAIT: 'Please wait...',
	SUC_COMMENT_ADDED: 'Create comment successful !!',
	SUC_COMMENT_EDITED: 'Update comment successful !!',
	SUC_COMMENT_DEL: 'Delete comment successful !!',
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
};

function IdeaManagement() {
	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});
	const [tableToolBar, setTableToolBar] = useState(false);
	const [pagination, setPagination] = useState({
		page: 1,
	});
	const [data, setData] = useState([]);

	useEffect(() => {
		loadData();
	}, [pagination]);
	const loadData = async () => {
		await AuthRequest.get(`${API_PATHS.ADMIN.MANAGE_IDEA}/table/list/${null}`, {
			params: {
				page: pagination.page,
				page_size: 5,
			},
		})
			.then((res) => {
				setData(res?.data?.result?.rows ?? []);
			})
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR));
	};

	const CustomToolbarSubmission = () => {
		return (
			<GridToolbarContainer sx={{ fontWeight: 700 }}>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				<GridToolbarExport printOptions={{ disableToolbarButton: true }} />
			</GridToolbarContainer>
		);
	};

	const onChangePagination = (pageSize, page) => {
		setPagination({ page, pageSize });
	};

	const columns = [
		...Columns,
		{
			field: 'actions',
			headerName: 'Action',
			width: 75,
			type: 'actions',
			disableColumnMenu: true,
			sortable: false,
			getActions: (params) => [
				<GridActionsCellItem
					icon={<GoInfo color='#3f66da' style={{ fontSize: '20px' }} />}
					label='Detail'
					// onClick={() => navigate(`${URL_PATHS.MANAGE_SUB}/${params.id}`)}
					showInMenu
				/>,

				<GridActionsCellItem
					icon={<BiPencil style={{ fontSize: '20px' }} />}
					label='Update'
					onClick={() => onOpenModal(params.id, 'update')}
					showInMenu
				/>,

				<GridActionsCellItem
					icon={
						<MdOutlineDeleteOutline
							color='red'
							style={{ fontSize: '20px' }}
						/>
					}
					label='Delete'
					onClick={() => onDelete(params.id)}
					showInMenu
				/>,
			],
		},
	];

	const onDelete = (id) => {
		toast
			.promise(
				AuthRequest.delete(`${API_PATHS.ADMIN.MANAGE_USER}/${id}`).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_IDEA_DEL,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				loadData();
			});
	};

	const onUpdate = (value) => {
		toast
			.promise(
				AuthRequest.put(
					`${API_PATHS.ADMIN.MANAGE_USER}/${value?.id}`,
					value,
				).then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_IDEA_EDITED,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				if (value?.exitFile && value?.file && !_.isEmpty(value?.file)) {
					// delete file API
				}
				setStatus({ ...status, visibleModal: false });
				loadData();
			});
	};

	const onCreate = (value) => {
		toast
			.promise(
				AuthRequest.post(API_PATHS.ADMIN.MANAGE_IDEA, value).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_IDEA_ADDED,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				setStatus({ ...status, visibleModal: false });
				loadData();
			});
	};



	const onCloseModal = () => {
		setStatus({ ...status, visibleModal: false });
	};
	const onOpenModal = (action, id) => {
		setStatus({ ...status, visibleModal: true, action: action });
	};

	const renderTop = () => {
		return (
			<div style={{ width: '100%', textAlign: 'right', marginBottom: 15 }}>
				<Button
					size={'small'}
					variant='contained'
					endIcon={<AddIcon />}
					onClick={() => onOpenModal('create')}
				>
					Create Idea
				</Button>
			</div>
		);
	};
	const renderModal = () => {
		return (
			<ModalIdea
				visible={status.visibleModal}
				action={status.action}
				onClose={onCloseModal}
				onUpdate={onUpdate}
				onCreate={onCreate}
			/>
		);
	};

	const renderContent = () => {
		return (
			<div className='managementsubmission_table'>
				<DataGridPro
					components={{
						NoRowsOverlay: CustomNoRowsOverlay,
						ColumnSortedDescendingIcon: () => (
							<ExpandMoreIcon className='icon' />
						),
						ColumnSortedAscendingIcon: () => (
							<ExpandLessIcon className='icon' />
						),
						Toolbar: tableToolBar && CustomToolbarSubmission,
					}}
					rows={data}
					columns={columns}
					pagination={true}
					cell--textCenter
					pageSize={pagination.pageSize}
					page={pagination.page}
					initialState={{ pinnedColumns: { right: ['actions'] } }}
					onPageSizeChange={(pageSize) =>
						onChangePagination(pageSize, pagination.page)
					}
					onPageChange={(page) => onChangePagination(pagination.pageSize, page)}
					style={{ minHeight: '600px' }}
					rowsPerPageOptions={[5, 10, 25, 50]}
				/>
			</div>
		);
	};

	return (
		<>
			<div
				style={{
					minHeight: '700px',
					width: '100%',
					padding: '0 5px',
					fontFamily: 'Poppins',
				}}
			>
				{renderTop()}
				{renderContent()}
				{status.visibleModal && renderModal()}
			</div>
		</>
	);
}
export default IdeaManagement;
