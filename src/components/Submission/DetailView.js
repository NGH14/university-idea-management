/* eslint-disable react-hooks/exhaustive-deps */
import '../../containers/UserManagement/style.css';
import moment from 'moment';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import { axioc, sleep } from 'common';
import { API_PATHS, URL_PATHS } from 'common/env';
import _ from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import DetailSubmissionForm from './DetailSubmissionForm';
import IdeaSubView from './IdeaSubView';
import ModalSubmissionIdea from './Modal/ModalSubmissionIdea';

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

export default function DetailView() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState();

	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});

	useEffect(() => loadData(), []);

	const loadData = async () => {
		await axioc.get(`${API_PATHS.ADMIN.MANAGE_SUB}/${id}`).then((res) => {
			setStatus({ ...status, loading: false, visibleModal: false });
			setData(res?.data?.result);
		});
	};

	const onCloseModal = () => setStatus({ ...status, visibleModal: false });
	const onOpenModal = (action) => {
		setStatus({ visibleModal: true, action: action });
	};

	const onUpdateSubmission = (value) => {
		toast.promise(
			axioc
				.put(`${API_PATHS.ADMIN.MANAGE_SUB}/${value?.id}`, value)
				.then(() => sleep(700))
				.then(async () => {
					setStatus({ ...status, visibleModal: false });
					loadData();
				}),
			{
				pending: toastMessages.WAIT,
				success: toastMessages.SUC.SUB.EDITED,
				error: toastMessages.ERR.SERVER_ERROR,
			},
		);
	};

	const renderModal = () => {
		return (
			<ModalSubmissionIdea
				visible={status.visibleModal}
				action={status.action}
				onClose={onCloseModal}
				initialValue={data}
				onUpdate={onUpdateSubmission}
			/>
		);
	};

	const renderTop = () => {
		return (
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button
					variant='text'
					style={{ marginRight: 15 }}
					startIcon={<ArrowBackIcon />}
					onClick={() => navigate(URL_PATHS.MANAGE_SUB)}
				>
					Back
				</Button>
			</div>
		);
	};

	const RenderSubmissionDetails = () => {
		return (
			<fieldset
				style={{
					borderRadius: 8,
					textTransform: 'capitalize',
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						marginBlock: '15px',
					}}
				>
					<legend
						style={{
							fontWeight: 'bold',
							fontSize: 22,
						}}
					>
						submission details
						<span>
							{data?.is_fully_close !== true
								? data?.is_fully_close === false
									? `[pass initial deadline (${moment(
											data?.initial_date,
									  ).format('DD/MM/YYYY')})]`
									: '[fully closed]'
								: ''}
						</span>
					</legend>
					<Button
						variant='contained'
						endIcon={<BiPencil />}
						onClick={() => onOpenModal('update')}
					>
						Edit
					</Button>
				</div>

				<DetailSubmissionForm submission={data} />
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
				<IdeaSubView submission={data} />
			</fieldset>
		);
	};

	if (_.isEmpty(data) || status.loading) return null;

	return (
		<div>
			{renderTop()}
			<RenderSubmissionDetails />
			{renderIdeaView()}
			{status.visibleModal && renderModal()}
		</div>
	);
}
