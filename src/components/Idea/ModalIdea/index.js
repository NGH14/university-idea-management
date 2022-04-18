/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import { API_PATHS, axioc, toastMessages } from 'common';
import CreateIdeaForm from 'components/Idea/CreateIdeaForm';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

const ModalIdea = (props) => {
	const { onCreate, onUpdate, visible, onClose, action, exIdeaData, specifySub } =
		props;

	const renderForm = () => {
		switch (action) {
			case 'create':
				return (
					<CreateIdeaForm
						onClose={() => onClose()}
						onCreate={onCreate}
						submission={
							specifySub === true ? exIdeaData?.submission?.id : null
						}
					/>
				);
			case 'update':
				return (
					<UpdateIdeaForm
						onClose={() => onClose()}
						onUpdate={onUpdate}
						initialValue={exIdeaData}
						specifySub={specifySub ?? false}
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
