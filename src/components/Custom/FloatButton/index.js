import { Box, Fab, Zoom } from '@mui/material';
import Tippy from '@tippyjs/react';
import React from 'react';

export default function FloatButton({
	tippy: { placement = 'top', content },
	onClick: handleClick,
	ariaLabel = content,
	disabled = false,
	icon,
	color,
	size,
}) {
	return (
		<Zoom in={true}>
			<Tippy placement={placement} content={content}>
				<Box
					onClick={disabled ? null : handleClick}
					role='presentation'
					sx={{ position: 'fixed', bottom: 30, right: 30 }}
				>
					<Fab
						size={size}
						color={color}
						disabled={disabled}
						aria-label={ariaLabel}
					>
						{icon}
					</Fab>
				</Box>
			</Tippy>
		</Zoom>
	);
}
