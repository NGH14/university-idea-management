import React, { useEffect, useState } from 'react';

import {
	Chart,
	Series,
	CommonSeriesSettings,
	Legend,
	ValueAxis,
	Title,
	Export,
	Tooltip,
	AdaptiveLayout,
	Font,
} from 'devextreme-react/chart';
import _ from 'lodash';
import moment from 'moment';
import Box from '@mui/material/Box';
import { CircularProgress, Slider, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import Typography from '@mui/material/Typography';
import './style.css';
const palette = ['red', 'orange', 'yellow', 'green', 'blue'];

const customizeTooltip = (arg) => {
	return {
		text: `${arg.value}`,
	};
};

function TotalSubmissionChart({ data, setFilter, filter }) {
	const [newData, setNewData] = useState([]);
	const [filterDisplay, setFilterDisplay] = useState([1, 6]);

	useEffect(() => {
		const newArray = [];
		_.map(data, (x, index) => {
			if (index + 1 >= filterDisplay[0] && index + 1 <= filterDisplay[1]) {
				newArray.push(x);
			}
		});

		setNewData(newArray);
	}, [data]);

	const onFilterDisplay = (value) => {
		const newArray = [];
		_.map(data, (x, index) => {
			if (index + 1 >= value[0] && index + 1 <= value[1]) {
				newArray.push(x);
			}
		});
		setNewData(newArray);
		setFilterDisplay(value);
	};

	const onYearChange = (value) => {
		const newDate = new Date(value.getFullYear(), 0, 1);
		setFilter({
			...filter,
			year: value,
			monthYearIdea: newDate,
			monthYearIdeaInfo: newDate,
		});
	};

	const renderPickerYear = () => {
		return (
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: 10,
						marginInline: 10,
						fontFamily: 'Poppins',
					}}
				>
					<div
						style={{
							marginInline: 10,
							padding: 0,
							width: 120,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: 10,
							fontFamily: 'Poppins',
						}}
					>
						<DatePicker
							label='Year'
							sx={{ border: 'none' }}
							disableFuture
							inputFormat='yyyy'
							views={['year']}
							value={filter?.year}
							onChange={(value) => {
								onYearChange(value);
							}}
							renderInput={(params) => (
								<TextField
									variant='standard'
									className='datepicker_input'
									{...params}
									helperText={null}
								/>
							)}
						/>
					</div>
					<div>
						<Box
							sx={{
								maxwidth: '100%',
								width: '200px',
								textAlign: 'right',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 3,
								marginBlock: '20px',
							}}
						>
							<Typography
								sx={{
									width: 250,
									gap: 3,
								}}
								id='input-slider'
								gutterBottom
								textAlign={'left'}
								style={{ margin: 0 }}
							>
								Month: {filterDisplay[0]} - {filterDisplay[1]}
							</Typography>
							<Slider
								aria-label='Small steps'
								value={filterDisplay}
								onChange={(value) =>
									onFilterDisplay(value?.target?.value)
								}
								sx={{ color: '#4295D1' }}
								valueLabelDisplay='auto'
								disableSwap
								min={1}
								max={12}
								step={1}
							/>
						</Box>
					</div>
				</div>
			</LocalizationProvider>
		);
	};
	return (
		<div
			style={{
				width: '100%',
			}}
		>
			<Paper elevation={0}>
				<div
					style={{
						display: 'flex',
						textAlign: 'center',
						justifyContent: 'center ',
						alignItems: 'center',
						width: '100%',
						marginInline: 'auto',
						paddingTop: 10,
						marginBottom: 10,
					}}
					className='uim_chart'
				>
					{renderPickerYear()}
				</div>
				<Chart className={'chart'} dataSource={newData} palette={'Soft Pastel'}>
					<CommonSeriesSettings argumentField={'month'} type={'stackedBar'} />
					<Title
						text={`${_.toUpper('Total submission in year')} ${moment(
							filter.year,
						).format('YYYY')}`}
					>
						<Font color='#000' size='20' weight='700' />
					</Title>

					<Series valueField={'active_submissions'} name={'Active'} />
					<Series valueField={'inactive_submissions'} name={'Inactive'} />
					<ValueAxis position={'left'}>
						<Title text={'Total'} />
					</ValueAxis>
					<Legend
						verticalAlignment={'top'}
						horizontalAlignment={'center'}
						itemTextPosition={'right'}
					/>
					<Export enabled={true} backgroundColor={'#fff'} />
					<Tooltip
						enabled={true}
						location={'edge'}
						customizeTooltip={(e) => customizeTooltip(e)}
					/>
				</Chart>
			</Paper>
		</div>
	);
}

export default TotalSubmissionChart;
