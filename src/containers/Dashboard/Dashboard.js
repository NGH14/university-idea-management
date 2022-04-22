/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import Card from '@mui/material/Card';
import axios from 'axios';
import { API_PATHS, axioc } from 'common';
import ActivitiesChart from 'components/ChartDashboard/ActivitiesChart';
import IdeaPopularChart from 'components/ChartDashboard/IdeaPopularChart';
import TotalSubmissionChart from 'components/ChartDashboard/TotalSubmissionChart';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { BsFileRichtext } from 'react-icons/bs';
import { CgArrowDownR, CgArrowUpR } from 'react-icons/cg';
import { TiLightbulb } from 'react-icons/ti';

export default function Dashboard() {
	const [data, setData] = useState({
		total: {},
		subsCountEachMonth: [],
		topIdeas: [],
		activities: [],
	});

	const [display] = useState({
		subsCountInRangeMonths: [1, 6],
		activitiesInRangeMonths: [1, 15],
	});

	let today = new Date();
	const [filter, setFilter] = useState({
		year: new Date(today.getFullYear(), 0, 1),
		monthYearTopIdeas: new Date(today.getFullYear(), 0, 1),
		monthYearActivities: new Date(today.getFullYear(), 0, 1),
	});

	useEffect(() => loadData(), [filter]);

	const loadData = async () => {
		const year = moment(filter.year).format('YYYY');
		const monthTopIdeas = moment(filter.monthYearTopIdeas).format('MM');
		const monthActivities = moment(filter.monthYearActivities).format('MM');

		axios
			.all([
				axioc.get(API_PATHS.ADMIN.DASHBOAD.TOTAL),
				axioc.get(API_PATHS.ADMIN.DASHBOAD.SUBS_COUNT, {
					params: {
						year,
					},
				}),
				axioc.get(API_PATHS.ADMIN.DASHBOAD.TOP_IDEAS, {
					params: { month: monthTopIdeas, year },
				}),
				axioc.get(API_PATHS.ADMIN.DASHBOAD.ACTIVITIES, {
					params: { month: monthActivities, year },
				}),
			])
			.then(
				axios.spread((resTotal, resSubsCount, resTopIdeas, resActivities) =>
					setData({
						...data,
						total: resTotal?.data?.result,
						topIdeas: resTopIdeas?.data?.result,
						activities: resActivities?.data?.result,
						subsCountEachMonth: resSubsCount?.data?.result,
					}),
				),
			);
	};

	const dataCardItems = [
		{
			name: 'Total Up Vote',
			value: data?.total?.total_likes ?? 0,
			icon: <CgArrowUpR className='dataCardItems' />,
		},
		{
			name: 'Total Down Vote',
			value: data?.total?.total_dislikes ?? 0,
			icon: <CgArrowDownR className='dataCardItems' />,
		},
		{
			name: 'Total Submissions',
			value: data?.total?.total_submissions ?? 0,
			icon: <BsFileRichtext className='dataCardItems' />,
		},
		{
			name: 'Total Ideas',
			value: data?.total?.total_ideas ?? 0,
			icon: <TiLightbulb className='dataCardItems' />,
		},
		{
			name: 'Total Comments',
			value: data?.total?.total_comments ?? 0,
			icon: <AiOutlineComment className='dataCardItems' />,
		},
		{
			name: 'Total Views',
			value: data?.total?.total_views ?? 0,
			icon: <AiOutlineComment className='dataCardItems' />,
		},
	];

	const renderChartSubmissionTotal = () => {
		return (
			<TotalSubmissionChart
				filter={filter}
				setFilter={setFilter}
				data={data.subsCountEachMonth}
				loadData={loadData}
			/>
		);
	};

	const renderPopularIdea = () => {
		return (
			<IdeaPopularChart timeKey={filter.monthYearTopIdeas} data={data?.topIdeas} />
		);
	};

	const renderActivites = () => {
		return (
			<ActivitiesChart
				timeKey={filter.monthYearTopIdeas}
				data={data.activities}
				display={display.activitiesInRangeMonths}
			/>
		);
	};

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
			{renderChartSubmissionTotal()}
			<div
				style={{
					display: 'flex',
					width: '100%',
					marginTop: 20,
					justifyContent: 'space-between',
					alignContent: 'center',
					flexWrap: 'wrap-reverse',
					gap: 15,
				}}
			>
				{renderPopularIdea()}
				{renderActivites()}
			</div>
		</div>
	);
}
