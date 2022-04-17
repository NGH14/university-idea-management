import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';

import CreateIdeaForm from 'components/Idea/CreateIdeaForm';
import EditSubmissionForm from '../EditSubmissionForm';

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

const ModalSubmissionIdea = (props) => {
	const { visible, onClose, onCreate, onUpdate, action, initialValue } = props;

	const renderForm = () => {
		switch (action) {
			case 'create':
				return (
					<CreateIdeaForm
						onClose={() => onClose()}
						onCreate={onCreate}
						submission={initialValue}
					/>
				);
			case 'update':
				return (
					<EditSubmissionForm
						onClose={() => onClose()}
						onUpdate={onUpdate}
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

export default React.memo(ModalSubmissionIdea);
