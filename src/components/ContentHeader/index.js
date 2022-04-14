import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, IconButton } from '@mui/material';
import Tippy from '@tippyjs/react';
import React from 'react';

const ContentHeader = ({
	classes: { titleClassNames, headingClassNames },
	tooltipContent,
	onClickAction,
	onOpenModal,
	title,
}) => (
	<div className={titleClassNames}>
		<div className={headingClassNames}>
			<h2>{title}</h2>
			<Tippy placement='right' content='Table tool bar'>
				<IconButton onClick={onClickAction}>
					<MoreVertIcon />
				</IconButton>
			</Tippy>
		</div>

		<Tippy placement='right' content={tooltipContent}>
			<Button
				endIcon={<AddCircleOutlineIcon />}
				onClick={onOpenModal}
				variant='contained'
			>
				Create
			</Button>
		</Tippy>
	</div>
);

export default ContentHeader;
