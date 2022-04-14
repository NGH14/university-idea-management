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
		disabled={action.disabled ?? false}
		showInMenu
	/>
);

export const UimActionButtons = (param, { detailAction, updateAction, deleteAction }) => {
	const crudActions = [];

	console.log(param?.role);

	detailAction &&
		crudActions.push({
			label: 'Detail',
			icon: <GoInfo color='#3f66da' style={{ fontSize: '20px' }} />,
			onClick: detailAction,
		});
	updateAction &&
		crudActions.push({
			label: 'Update',
			icon: <BiPencil style={{ fontSize: '20px' }} />,
			disabled: param?.role === ROLES.ADMIN,
			onClick: updateAction,
		});
	deleteAction &&
		crudActions.push({
			label: 'Delete',
			icon: <MdOutlineDeleteOutline color='red' style={{ fontSize: '20px' }} />,
			disabled: param?.role === ROLES.ADMIN,
			onClick: deleteAction,
		});

	return crudActions.map((action, index) => elementTemplate(action, index));
};
