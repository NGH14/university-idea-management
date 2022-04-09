import { Box, Fab, Zoom } from '@mui/material';
import React from 'react';

export default function FloatingButton({
	onClick: handleClick,
	icon,
	color,
	size,
	ariaLabel,
}) {
	return (
		<Zoom in={true}>
			<Box
				onClick={handleClick}
				role='presentation'
				sx={{ position: 'fixed', bottom: 30, right: 30 }}
			>
				<Fab color={color} size={size} aria-label={ariaLabel}>
					{icon}
				</Fab>
			</Box>
		</Zoom>
	);
}
