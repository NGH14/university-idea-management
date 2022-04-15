/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import PieChart, {
	Connector,
	Export,
	Font,
	Label,
	Series,
	Title,
} from 'devextreme-react/pie-chart';
import { AdaptiveLayout } from 'devextreme-react/polar-chart';
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { axioc } from 'common';

const dataNull = {
	title: 'No data',
	comment_number: 0,
	null: true,
};

function IdeaPopularChart({ timeKey, data }) {
	const [newFilter, setNewFilter] = useState(new Date(timeKey));
	const [newData, setNewData] = useState(data);

	useEffect(() => {
		const newArray = [];
		if (data && !_.isEmpty(data)) {
			const arrData = _.cloneDeep(data);
			_.map(arrData, (x) => {
				const title = x.idea?.title;
				const arr = {
					...x,
					title,
				};
				newArray.push(arr);
			});
		} else {
			newArray.push(dataNull);
		}
		setNewFilter(new Date(timeKey));
		setNewData(newArray);
	}, [data]);

	const pointClickHandler = (e) => {
		toggleVisibility(e?.target);
	};

	const legendClickHandler = (e) => {
		let arg = e?.target;
		let item = e?.component?.getAllSeries()[0].getPointsByArg(arg)[0];
		toggleVisibility(item);
	};

	const toggleVisibility = (item) => {
		item?.isVisible() ? item?.hide() : item.show();
	};

	const onMonthYearChange = async (value) => {
		axioc.dash
			.getTopIdeas(
				moment(value).format('MM'),
				moment(value).format('YYYY'),
			)
			.then((res) => {
				const newArray = [];
				const arrData = _.cloneDeep(res?.data?.result);
				if (arrData && !_.isEmpty(arrData)) {
					_.map(arrData, (x) => {
						const title = x.idea?.title;
						const arr = {
							...x,
							title,
						};
						newArray.push(arr);
					});
				} else {
					newArray.push(dataNull);
				}
				setNewFilter(new Date(value));
				setNewData(newArray);
			});
	};

	const renderPickerMonthYearIdea = () => {
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
					}}>
					<DatePicker
						inputFormat='MM/yyyy'
						views={['month']}
						label='Month year'
						value={newFilter}
						onChange={(value) => {
							onMonthYearChange(value);
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
			</LocalizationProvider>
		);
	};
	return (
		<>
			<div style={{ marginRight: 20, width: '100%', height: 300 }}>
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
							paddingRight: 10,
							marginBottom: 10,
							maxHeight: '300px',
						}}>
						{renderPickerMonthYearIdea()}
					</div>
					<PieChart
						className={'chart'}
						dataSource={newData}
						palette={'Soft Pastel'}
						// onClick={this.legendClickHandler}
						onPointClick={(e) => pointClickHandler(e)}
						onLegendClick={(e) => legendClickHandler(e)}>
						<Title
							text={`${_.toUpper(
								'Top idea have the most comment in',
							)} ${moment(newFilter).format('MM/YYYY')} `}>
							<Font color='#000' size='20' weight='700' />
						</Title>
						<AdaptiveLayout
							height={150}
							width={0}
							keepLabels={false}
						/>

						<Series
							argumentField={'title'}
							valueField={'comment_number'}
							color={newData[0]?.null ? 'darkGray' : ''}>
							<Label visible={true}>
								<Connector visible={true} width={1} />
							</Label>
						</Series>

						{/*<Size width={500} />*/}
						<Export enabled={true} />
					</PieChart>
				</Paper>
			</div>
		</>
	);
}
export default IdeaPopularChart;
