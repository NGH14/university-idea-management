import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import _ from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { axioc } from 'common';
import { API_PATHS, DEV_CONFIGS } from 'common/env';
import CreateDepartmentForm from 'components/Department/CreateDepartmentForm';
import EditDepartmentForm from 'components/Department/EditDepartmentForm';
import { dataDemo } from '../FakeData';

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
	maxHeight: 380,
	' @media (max-width: 950px)': {
		width: '100%',
	},
};

const toastMessages = {
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
	ERR_DEP_NOT_FOUND: 'Department not found !!',
};

const ModalDepartmentManagement = (props) => {
	const { visible, onClose, onCreate, onUpdate, action, rowId } = props;
	const [initialValue, setInitialValue] = useState([]);

	useEffect(() => {
		if (DEV_CONFIGS.IS_OFFLINE_DEV) {
			let deps = dataDemo.find((_) => _.id === rowId);
			if (!deps) {
				toast.error(toastMessages.ERR_DEP_NOT_FOUND);
				return;
			}
			setInitialValue(deps);
			return;
		}

		if (action !== 'create') {
			loadData();
		}
	}, [action]);

	const loadData = async () => {
		await axioc
			.get(`${API_PATHS.ADMIN.MANAGE_DEP}/${rowId}`)
			.then((res) => setInitialValue(res?.data?.result))
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR));
	};

	const renderForm = () => {
		switch (action) {
			case 'create':
				return (
					<CreateDepartmentForm onClose={() => onClose()} onCreate={onCreate} />
				);
			case 'update':
				return (
					<EditDepartmentForm
						onClose={() => onClose()}
						onUpdate={onUpdate}
						initialValue={initialValue}
					/>
				);
			default:
				return;
		}
	};

	if (action !== 'create' && _.isEmpty(initialValue)) return null;

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
export default React.memo(ModalDepartmentManagement);
