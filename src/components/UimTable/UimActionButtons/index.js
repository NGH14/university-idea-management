import { GridActionsCellItem } from '@mui/x-data-grid';

const UimActionButtons = (actions = []) =>
	actions?.length !== 0
		? actions?.map((action, index) => (
				<GridActionsCellItem
					key={index}
					icon={action.icon}
					label={action.label}
					onClick={action.onClick ?? null}
					disabled={action.disabled ?? false}
					showInMenu
				/>
		  ))
		: actions;

export default UimActionButtons;
