import { GridActionsCellItem } from '@mui/x-data-grid';
import { ROLES } from 'common/env';
import { BiPencil } from 'react-icons/bi';
import { GoInfo } from 'react-icons/go';
import { MdOutlineDeleteOutline } from 'react-icons/md';

const elementTemplate = (action, index) => (
	<GridActionsCellItem
		key={index}
		icon={action.icon}
		label={action.label}
		onClick={action.onClick ?? null}
		showInMenu
	/>
);

export const UimActionButtons = (param, { detailAction, updateAction, deleteAction }) => {
	const crudActions = [];

	detailAction &&
		crudActions.push({
			label: 'Detail',
			icon: <GoInfo color='#3f66da' style={{ fontSize: '20px' }} />,
			onClick: detailAction,
		});

	updateAction &&
		param?.role !== ROLES.ADMIN &&
		crudActions.push({
			label: 'Update',
			icon: <BiPencil style={{ fontSize: '20px' }} />,
			onClick: updateAction,
		});

	deleteAction &&
		param?.role !== ROLES.ADMIN &&
		crudActions.push({
			label: 'Delete',
			icon: <MdOutlineDeleteOutline color='red' style={{ fontSize: '20px' }} />,
			onClick: deleteAction,
		});

	return crudActions.map((action, index) => elementTemplate(action, index));
};
