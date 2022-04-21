import './style.css';

import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import moment from 'moment';
import React from 'react';

function DetailSubmissionForm({ submission }) {
	return (
		<>
			<div className='form_group-submis-submis' style={{ marginBottom: 12 }}>
				<div className='form_content' style={{ display: 'flex' }}>
					<InputLabel
						style={{
							width: 130,
							marginBottom: 'auto',
							marginTop: 'auto',
						}}
					>
						Title
					</InputLabel>
					<TextField
						inputProps={{ readOnly: true }}
						style={{ width: '100%', pointerEvents: 'none' }}
						value={submission?.title}
						variant='standard'
						name='title'
					/>
				</div>
			</div>

			{
				<div
					className='form_group-submis'
					style={{ marginBottom: 12, display: 'flex' }}
				>
					<div
						className='form_content'
						style={{ display: 'flex', width: '100%' }}
					>
						<InputLabel
							InputProps={{ disableUnderline: true }}
							style={{
								width: 150,
								marginBottom: 'auto',
								marginTop: 'auto',
							}}
						>
							Create By
						</InputLabel>
						<TextField
							inputProps={{ readOnly: true }}
							style={{ width: '100%', pointerEvents: 'none' }}
							variant='standard'
							name='initial_date'
							value={submission?.created_by}
						/>
					</div>
					<div
						className='form_content'
						style={{ display: 'flex', width: '100%' }}
					>
						<InputLabel
							InputProps={{ disableUnderline: true }}
							style={{
								width: 150,
								marginBottom: 'auto',
								marginTop: 'auto',
								marginLeft: 10,
							}}
						>
							Modified By
						</InputLabel>
						<TextField
							inputProps={{ readOnly: true }}
							style={{ width: '100%', pointerEvents: 'none' }}
							variant='standard'
							name='final_date'
							value={submission?.modified_by}
						/>
					</div>
				</div>
			}

			<div
				className='form_group-submis'
				style={{ marginBottom: 12, display: 'flex' }}
			>
				<div className='form_content' style={{ display: 'flex', width: '100%' }}>
					<InputLabel
						style={{
							width: 150,
							marginBottom: 'auto',
							marginTop: 'auto',
						}}
					>
						Initial Deadline
					</InputLabel>
					<TextField
						inputProps={{ readOnly: true }}
						style={{ width: '100%', pointerEvents: 'none' }}
						variant='standard'
						name='initial_date'
						value={moment(submission?.initial_date).format(
							'DD/MM/YYYY hh:mm A',
						)}
					/>
				</div>
				<div className='form_content' style={{ display: 'flex', width: '100%' }}>
					<InputLabel
						style={{
							width: 150,
							marginBottom: 'auto',
							marginTop: 'auto',
							marginLeft: 10,
						}}
					>
						Final Deadline
					</InputLabel>
					<TextField
						inputProps={{ readOnly: true }}
						style={{ width: '100%', pointerEvents: 'none' }}
						variant='standard'
						name='final_date'
						value={moment(submission?.final_date).format(
							'DD/MM/YYYY hh:mm A',
						)}
					/>
				</div>
			</div>

			<div className='form_group-submis' style={{ marginBottom: 12 }}>
				<div className='form_content' style={{ display: 'flex' }}>
					<InputLabel
						style={{
							width: 130,
							marginBottom: 'auto',
							marginTop: 'auto',
						}}
					>
						Description
					</InputLabel>
					<TextField
						inputProps={{ readOnly: true }}
						style={{ width: '100%', pointerEvents: 'none' }}
						variant='standard'
						name='description'
						value={submission?.description}
					/>
				</div>
			</div>
		</>
	);
}
export default DetailSubmissionForm;
