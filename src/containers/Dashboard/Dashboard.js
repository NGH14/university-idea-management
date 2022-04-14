import './style.css';

import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { axiocRequests } from 'common';
import { DEV_CONFIGS } from 'common/env';
import IdeaInfoChart from 'components/ChartDashboard/IdeaInfoChart';
import IdeaPopularChart from 'components/ChartDashboard/IdeaPopularChart';
import TotalSubmissionChart from 'components/ChartDashboard/TotalSubmissionChart';
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BsFileRichtext } from 'react-icons/bs';
import { CgArrowDownR, CgArrowUpR } from 'react-icons/cg';
import { TiLightbulb } from 'react-icons/ti';

import { fake_activities, fake_subTotal, fake_topIdeas } from './FakeData';

export default function Dashboard() {
	const [data, setData] = useState({
		totalSub: [],
		topIdea: [],
		infoData: [],
	});
	const [loading, setLoading] = useState(false);
	const [display, setDisplay] = useState({
		sub: [1, 6],
		ideaInfo: [1, 15],
	});
	let today = new Date();
	const [filter, setFilter] = useState({
		year: new Date(today.getFullYear(), 0, 1),
		monthYearIdea: new Date(today.getFullYear(), 0, 1),
		monthYearIdeaInfo: new Date(today.getFullYear(), 0, 1),
	});

	useEffect(() => {
		if (DEV_CONFIGS.IS_OFFLINE_DEV) {
			setData({
				...data,
				totalSub: fake_subTotal,
				topIdea: fake_topIdeas,
				infoData: fake_activities,
			});
			return;
		}

		loadData();
	}, [filter]);

	const dataCardItems = [
		{
			name: 'Total Up Vote',
			value: 500,
			icon: <CgArrowUpR className='dataCardItems' />,
		},
		{
			name: 'Total Down Vote',
			value: 500,
			icon: <CgArrowDownR className='dataCardItems' />,
		},
		{
			name: 'Total Submission',
			value: 500,
			icon: <BsFileRichtext className='dataCardItems' />,
		},
		{
			name: 'Total Submiss',
			value: 500,
			icon: <TiLightbulb className='dataCardItems' />,
		},
	];
	const loadData = async () => {
		const year = moment(filter.year).format('YYYY');
		const monthIdea = moment(filter.monthYearIdea).format('MM');
		const monthInfo = moment(filter.monthYearIdeaInfo).format('MM');
		axios
			.all([
				axiocRequests.get(`dashboard/sum-submissions?year=${year}`),
				axiocRequests.get(`dashboard/top-ideas?month=${monthIdea}&year=${year}`),
				axiocRequests.get(`dashboard/activities?month=${monthInfo}&year=${year}`),
			])
			.then(
				axios.spread(function (resSub, resIdeas, resAct) {
					setData({
						...data,
						totalSub: resSub?.data?.result,
						topIdea: resIdeas?.data?.result,
						infoData: resAct?.data?.result,
					});
				}),
			);
		//api load Data
	};

	const renderChartSubmissionTotal = () => {
		return (
			<TotalSubmissionChart
				filter={filter}
				setFilter={setFilter}
				data={data.totalSub}
				loadData={loadData}
			/>
		);
	};

	const renderPopularIdea = () => {
		return <IdeaPopularChart timeKey={filter.monthYearIdea} data={data?.topIdea} />;
	};

	const renderIdeaInfo = () => {
		return (
			<IdeaInfoChart
				timeKey={filter.monthYearIdea}
				data={data.infoData}
				display={display.ideaInfo}
			/>
		);
	};
	const Item = styled(Paper)(({ theme }) => ({
		// backgroundColor: theme.palette.mode === '#ffc107' ? '#ffc107' : '#ffc107',
		...theme.typography.body2,
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));
	console.log(data);
	const renderTop = () => {
		return (
			<>
				<div className='dashboard_title'>
					<div className='dashboard_heading'>
						<h2>Dashboard</h2>
						<i
							style={{
								fontWeight: 600,
								fontSize: 14,
								color: '#999',
								opacity: '0.7',
							}}
						>
							UIM Card
						</i>
					</div>
				</div>

				<div className='dashgrid_collection'>
					{dataCardItems.map((item, _) => {
						return (
							<div className='dashgrid_item'>
								<Card
									elevation={3}
									sx={{
										padding: '20px',
										width: '200px',
										height: '170px',
										display: 'flex',
										gap: '20px',
										justifyContent: 'center',
										alignItems: 'flex-start',
										flexDirection: 'column',
										borderRadius: '15px',
									}}
								>
									{item.icon}
									<p className='dashboard_textname'>{item.name}</p>
									<strong className='value'>{item.value}</strong>
								</Card>
							</div>
						);
					})}
				</div>
			</>
		);
	};

	return (
		<div>
			{renderTop()}
			<div className='dashboard_title'>
				<div className='dashboard_heading'>
					<i
						style={{
							fontWeight: 600,
							fontSize: 14,
							color: '#999',
							opacity: '0.7',
							marginTop: '30px',
						}}
					>
						UIM Chart
					</i>
				</div>
			</div>
			{renderIdeaInfo()}
			<div
				style={{
					display: 'flex',
					width: '100%',
					marginTop: 20,
					justifyContent: 'center',
					alignContent: 'center',
				}}
			>
				{renderPopularIdea()}
				{renderChartSubmissionTotal()}
			</div>
		</div>
	);
}
