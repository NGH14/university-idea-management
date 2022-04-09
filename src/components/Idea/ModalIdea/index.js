import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { AuthRequest } from 'common/AppUse';
import { API_PATHS } from 'common/env';
import CreateIdeaForm from '../../Idea/CreateIdeaForm';
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
const toastMessages = {
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
	ERR_USER_NOT_FOUND: 'User not found !!',
};

const ModalIdea = (props) => {
	const { visible, onClose, onCreate, onUpdate, action, submission, idIdea } = props;
	const [initialValue, setInitialValue] = useState([]);

	useEffect(() => {
		// if (DEV_CONFIGS.IS_OFFLINE_DEV) {
		//     let user = dataDemo_ideas.find((_) => _.id === rowId);
		//     if (!user) {
		//         toast.error(toastMessages.ERR_USER_NOT_FOUND);
		//         return;
		//     }
		//     setInitialValue(user);
		//     return;
		// }

		if (action !== 'create') {
			loadData();
		}
	}, [action]);

	const loadData = async () => {
		await AuthRequest.get(`${API_PATHS.ADMIN.MANAGE_IDEA}/${idIdea}`)
			.then((res) => setInitialValue(res?.data?.result))
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR));
	};

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
