/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { axiocRequests, API_PATHS, toastMessages } from 'common';

import CreateIdeaForm from 'components/Idea/CreateIdeaForm';
import UpdateIdeaForm from '../UpdateIdeaForm';

const style = {
	position: 'relative',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '1000px',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '5px',
	overflow: 'auto',
	maxHeight: '100%',

	' @media (max-width: 950px)': {
		width: '100%',
	},
};

const ModalIdea = ({
	submission,
	onCreate,
	onUpdate,
	visible,
	onClose,
	action,
	idIdea,
}) => {
	const [initialValue, setInitialValue] = useState([]);

	useEffect(() => {
		if (action !== 'create') {
			axiocRequests
				.get(`${API_PATHS.ADMIN.MANAGE_IDEA}/${idIdea}`)
				.then((res) => setInitialValue(res?.data?.result));
		}
	}, [action]);

	const renderForm = () => {
		switch (action) {
			case 'create':
				return (
					<CreateIdeaForm
						onClose={() => onClose()}
						onCreate={onCreate}
						submission={submission}
					/>
				);
			case 'update':
				return (
					<UpdateIdeaForm
						onClose={() => onClose()}
						onUpdate={onUpdate}
						submission={submission}
						initialValue={initialValue}
					/>
				);
			default:
				return;
		}
	};

	return (
		<Modal
			open={visible}
			onClose={() => onClose()}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>{renderForm()}</Box>
		</Modal>
	);
};

export default React.memo(ModalIdea);
