import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';

import UpdateIdeaForm from '../../components/Idea/UpdateIdeaForm';

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

	' @media (max-width: 600px)': {
		width: '100%',
	},
};
const toastMessages = {
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
	ERR_USER_NOT_FOUND: 'User not found !!',
};

const ModalIdeaDetailView = (props) => {
	const { visible, onClose, onUpdate, initialValue } = props;

	return (
		<Modal
			open={visible}
			onClose={() => onClose()}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<UpdateIdeaForm
					onClose={() => onClose()}
					onUpdate={onUpdate}
					submission={null}
					initialValue={initialValue}
				/>
			</Box>
		</Modal>
	);
};

export default React.memo(ModalIdeaDetailView);
