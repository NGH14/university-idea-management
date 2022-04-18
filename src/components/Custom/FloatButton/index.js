import { Box, Fab, Zoom } from '@mui/material';
import Tippy from '@tippyjs/react';
import React from 'react';

export default function FloatButton({
	onClick: handleClick,
	ariaLabel,
	icon,
	color,
	size,
	tippy: { placement = 'top', content = ariaLabel },
}) {
	return (
		<Zoom in={true}>
			<Tippy placement={placement} content={content}>
				<Box
					onClick={handleClick}
					role='presentation'
					sx={{ position: 'fixed', bottom: 30, right: 30 }}
				>
					<Fab color={color} size={size} aria-label={ariaLabel}>
						{icon}
					</Fab>
				</Box>
			</Tippy>
		</Zoom>
	);
}
