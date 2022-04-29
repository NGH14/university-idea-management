/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import { Slider, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Font } from 'devextreme-react/bar-gauge';
import {
	ArgumentAxis,
	Chart,
	CommonSeriesSettings,
	Export,
	Grid,
	Legend,
	Margin,
	Series,
	Subtitle,
	Title,
	Tooltip,
} from 'devextreme-react/ui/chart';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { axioc } from 'common';

const energySources = [
	{ value: 'total_ideas', name: 'total Idea' },
	{ value: 'total_comments', name: 'Total Comment' },
	{ value: 'total_likes', name: 'Total like' },
	{ value: 'total_dislikes', name: 'Total Dislike' },
];

const customizeTooltip = (arg) => {
	return {
		text: arg.valueText,
	};
};

function IdeaInfoChart({ timeKey, data, loading }) {
	const [newData, setNewData] = useState(data);
	const [dataFilter, setDataFilter] = useState([]);
	const [newFilter, setNewFilter] = useState({
		timeKey: new Date(timeKey),
		display: [1, 15],
	});

	useEffect(() => {
		let arrDate = _.cloneDeep(data);
		const newArray = [];
		_.map(arrDate, (x, index) => {
			const day = _.toNumber(moment(x.date).format('DD'));
			if (day >= newFilter.display[0] && day <= newFilter.display[1]) {
				x.date = moment(x.date).format('DD/MM/YYYY');
				newArray.push(x);
			}
		});
		setNewFilter({ display: [1, 15], timeKey: new Date(timeKey) });
		setDataFilter(newArray);
	}, [data]);

	const onFilterDisplay = (value) => {
		let arrDate = _.cloneDeep(newData);
		const newArray = [];
		_.map(arrDate, (x, index) => {
			if (index + 1 >= value[0] && index + 1 <= value[1]) {
				x.date = moment(x.date).format('DD/MM/YYYY');
				newArray.push(x);
			}
		});
		setDataFilter(newArray);
		setNewFilter({ ...newFilter, display: value });
	};

	const renderText = () => {
		let textFrom = `${newFilter.display[0]}/${moment(newFilter.timeKey).format(
			'MM/YYYY',
		)}`;
		let textTo = `${newFilter.display[1]}/${moment(newFilter.timeKey).format(
			'MM/YYYY',
		)}`;
		if (newFilter.display[0] < 10) {
			textFrom = `0${newFilter.display[0]}/${moment(newFilter.timeKey).format(
				'MM/YYYY',
			)}`;
		}
		if (newFilter.display[1] < 10) {
			textTo = `0${newFilter.display[1]}/${moment(newFilter.timeKey).format(
				'MM/YYYY',
			)}`;
		}
		return `${textFrom} to ${textTo}`;
	};

	const onMonthYearIdeaInfoChange = async (value) => {
		axioc
			.get(
				`dashboard/activities?month=${moment(value).format('MM')}&year=${moment(
					value,
				).format('YYYY')}`,
			)
			.then((res) => {
				let arrDate = _.cloneDeep(res?.data?.result);
				const newArray = [];
				_.map(arrDate, (x, index) => {
					if (index + 1 >= 1 && index + 1 <= 15) {
						x.date = moment(x.date).format('DD/MM/YYYY');
						newArray.push(x);
					}
				});
				setNewFilter({
					...newFilter,
					display: [1, 15],
					timeKey: value,
				});
				setDataFilter(newArray);
				setNewData(res?.data?.result);
			});
	};

	const renderPickerMonthYearInfoIdea = () => {
		return (
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: 10,
						fontFamily: 'Poppins',
					}}
				>
					<div style={{ marginRight: 20, padding: 0, width: 150 }}>
						<DatePicker
							inputFormat='MM/yyyy'
							views={['month']}
							label='Month year'
							value={newFilter.timeKey}
							onChange={(value) => {
								onMonthYearIdeaInfoChange(value);
							}}
							renderInput={(params) => (
								<TextField
									variant='standard'
									{...params}
									helperText={null}
								/>
							)}
						/>
					</div>

					<div>
						<Box
							sx={{
								maxWidth: 500,
								textAlign: 'right',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 3,
								marginBlock: '20px',
							}}
						>
							<Typography
								id='input-slider'
								gutterBottom
								textAlign={'left'}
								style={{ margin: 0 }}
							>
								Day: {newFilter.display[0]} -{newFilter.display[1]}
							</Typography>
							<Slider
								aria-label='Small steps'
								value={newFilter.display}
								onChange={(value) => {
									onFilterDisplay(value.target.value);
								}}
								sx={{ color: '#4295D1', width: 100 }}
								valueLabelDisplay='auto'
								disableSwap
								min={1}
								max={new Date(
									newFilter.timeKey.getFullYear(),
									_.toNumber(moment(newFilter.timeKey).format('MM')),
									0,
								).getDate()}
								step={1}
							/>
						</Box>
					</div>
				</div>
			</LocalizationProvider>
		);
	};

	return (
		<>
			<div
				style={{
					margin: 'auto',
					maxwidth: '100%',
					width: '600px',
					minWidth: '350px',
					margin: 'auto',
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
							paddingTop: 10,
							paddingRight: 10,
							marginBottom: 6,
						}}
					>
						{renderPickerMonthYearInfoIdea()}
					</div>
					<Chart
						className={'chart'}
						palette={'Soft Pastel'}
						dataSource={dataFilter}
					>
						<CommonSeriesSettings
							argumentField={'date'}
							type={'stackedBar'}
						/>
						{energySources.map(function (item, _) {
							return (
								<Series
									key={item.value}
									valueField={item.value}
									name={item.name}
								/>
							);
						})}

						<Margin bottom={20} />
						<ArgumentAxis
							valueMarginsEnabled={false}
							discreteAxisDivisionMode={'crossLabels'}
						>
							<Grid visible={true} />
						</ArgumentAxis>
						<Legend
							verticalAlignment={'top'}
							horizontalAlignment={'center'}
							itemTextPosition={'right'}
						/>
						<Export enabled={true} />
						<Title text={`${_.toUpper('Information idea')}`}>
							<Subtitle text={renderText()} />
							<Font color='#000' size='20' weight='700' />
						</Title>

						<Tooltip
							enabled={true}
							customizeTooltip={(e) => customizeTooltip(e)}
						/>
					</Chart>
				</Paper>
			</div>
		</>
	);
}
export default IdeaInfoChart;
