import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Tippy from '@tippyjs/react';
import { getGuid } from 'common';

const SidebarItem = ({ text, icon, onClick, selected, openButton, index }) => (
	<Tippy content={text} placement='right'>
		<ListItemButton
			key={text.toLowerCase() + '_button_' + index + getGuid()}
			onClick={() => onClick(index)}
			selected={selected}
			sx={{
				px: 2.5,
				minHeight: 48,
				justifyContent: openButton ? 'initial' : 'center',
			}}
		>
			{icon && (
				<ListItemIcon
					key={text.toLowerCase() + '_icon_' + index + getGuid()}
					sx={{
						minWidth: 0,
						mr: openButton ? 3 : '0',
						justifyContent: 'center',
					}}
				>
					{icon}
				</ListItemIcon>
			)}
			<ListItemText
				key={text.toLowerCase() + '_title_' + index + getGuid()}
				disableTypography
				primary={text}
				sx={{
					fontFamily: 'Poppins, sans-serif',
					opacity: openButton ? 1 : 0,
					fontWeight: '700',
					fontSize: '14px',
					color: '#777',
				}}
			/>
		</ListItemButton>
	</Tippy>
);

export default SidebarItem;
