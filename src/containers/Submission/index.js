import '../../containers/UserManagement/style.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import axios from 'axios';
import _ from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { axiocRequests, sleep } from 'common';
import { API_PATHS, DEV_CONFIGS, URL_PATHS } from 'common/env';
import IdeaSubViewStaff from 'components/Idea/IdeaSubViewStaff';
import DetailSubmissionForm from 'components/Submission/DetailSubmissionForm';
import ModalSubmissionIdea from 'components/Submission/Modal/ModalSubmissionIdea';
import { dataDemo } from '../../containers/IdeaMangement/FakeData';

const toastMessages = {
	WAIT: 'Please wait...',
	SUC: {
		SUB: {
			EDITED: 'Update submission successful !!',
			DEL: 'Delete submission successful !!',
		},
		IDEA: {
			ADDED: 'Create idea successful !!',
			EDITED: 'Update idea successful !!',
			DEL: 'Delete idea successful !!',
		},
	},
	ERR: {
		SUB_NOT_FOUND: 'Submission not found !!',
		IDEAS_NOT_FOUND: 'Ideas not found !!',
		SERVER_ERROR: 'Something went wrong, please try again !!',
	},
};

export default function Submission() {
	const { id } = useParams();

	const navigate = useNavigate();
	const [data, setData] = useState({ sub: {}, ideas: [] });

	const [paginationIdea, setPaginationIdea] = useState({
		pageSize: 5,
		page: 0,
		total: 0,
	});

	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});

	useEffect(() => {
		if (DEV_CONFIGS.IS_OFFLINE_DEV) {
			let ideas = dataDemo.find((_) => _.submission_id === id);
			if (!ideas) {
				toast.error(toastMessages.ERR.IDEAS_NOT_FOUND);
				setStatus({ ...status, loading: false });
				navigate(-1);
			}
			return;
		}
		loadData();
	}, []);

	const loadData = async () => {
		await axios
			.all([
				axiocRequests.get(`${API_PATHS.ADMIN.MANAGE_SUB}/${id}`),
				// axiocRequests.get(`${API_PATHS.ADMIN.MANAGE_IDEA}/${id}`, {
				// 	params: {
				// 		page: pagination.page + 1,
				// 		page_size: pagination.pageSize,
				// 	},
				// }),
			])
			.then(
				axios.spread(function (resSub, resIdeas) {
					setData({
						...data,
						sub: resSub?.data?.result,
						ideas: resIdeas?.data?.result,
					});
					setPaginationIdea({
						...paginationIdea,
						total: resSub?.data?.result?.total,
					});
					setStatus({ ...status, loading: false, visibleModal: false });
				}),
			);
	};

	const onCloseModal = () => setStatus({ ...status, visibleModal: false });
	const onOpenModal = (action) => {
		setStatus({ visibleModal: true, action: action });
	};

	const onUpdateSubmission = async (value) => {
		setStatus({ ...status, loading: true });
		toast
			.promise(
				axiocRequests
					.put(`${API_PATHS.ADMIN.MANAGE_SUB}/${value?.id}`, value)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC.SUB.EDITED,
					error: toastMessages.ERR.SERVER_ERROR,
				},
			)
			.then(() => {
				setStatus({ ...status, visibleModal: false });
				loadData();
			});
	};

	const onUpdateIdea = async (value) => {
		setStatus({ ...status, loading: true });
		toast
			.promise(
				axiocRequests
					.put(`${API_PATHS.ADMIN.MANAGE_IDEA}/${value?.id}`, value)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC.SUB.EDITED,
					error: toastMessages.ERR.SERVER_ERROR,
				},
			)
			.then(() => {
				setStatus({ ...status, visibleModal: false });
				loadData();
			});
	};

	const renderModal = () => {
		return (
			<ModalSubmissionIdea
				visible={status.visibleModal}
				action={status.action}
				onClose={onCloseModal}
				initialValue={data?.sub}
				onUpdate={onUpdateSubmission}
			/>
		);
	};

	const renderTop = () => {
		return (
			<div style={{ textAlign: 'right' }}>
				<Button
					size={'small'}
					variant='contained'
					style={{ backgroundColor: '#9e9e9e', marginRight: 15 }}
					endIcon={<ArrowBackIcon />}
					onClick={() => navigate(`${URL_PATHS.HOME}`)}
				>
					Back
				</Button>
			</div>
		);
	};

	const renderSubmissionDetails = () => {
		return (
			<fieldset
				style={{
					padding: 12,
					borderRadius: 8,
					border: '2px solid gray',
					textTransform: 'capitalize',
				}}
			>
				<legend style={{ fontWeight: 'bold', padding: 8, fontSize: 22 }}>
					submission details
				</legend>
				<DetailSubmissionForm initialValue={data?.sub} />
			</fieldset>
		);
	};

	const renderIdeaView = () => {
		return (
			<fieldset
				style={{
					border: '1px solid gray',
					padding: 12,
					marginTop: 30,
					borderRight: 'none',
					borderLeft: 'none',
					borderBottom: 'none',
				}}
			>
				<legend
					style={{
						fontWeight: 'bold',
						padding: 8,
						fontSize: 22,
						display: 'flex',
					}}
				>
					List Ideas
				</legend>
				<IdeaSubViewStaff
					paginationIdea={paginationIdea}
					setPaginationIdea={setPaginationIdea}
					ideaData={data.ideas}
					subData={data?.sub}
				/>
			</fieldset>
		);
	};

	if (_.isEmpty(data.sub) || status.loading) return null;

	return (
		<div>
			{renderTop()}
			{renderSubmissionDetails()}
			{renderIdeaView()}
			{status.visibleModal && renderModal()}
		</div>
	);
}
