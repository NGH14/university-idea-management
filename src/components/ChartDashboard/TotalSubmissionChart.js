import React, {useEffect, useState} from 'react';

import { Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Export, Tooltip } from 'devextreme-react/chart';
import _ from "lodash";
import moment from "moment";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
const palette = ["red", "orange", "yellow", "green", "blue"];




function TotalSubmissionChart({timeKey, data, display, loading}){
    console.log(data, 12312)
    const customizeTooltip = (arg) => {
        return {
            text: `${arg.value}`
        };
    }
    const [newData, setNewData] = useState([])

    useEffect(()=>{
        const newArray =  []
        _.map(data, (x, index) => {
            if(index + 1 >= display[0] && index+1 <= display[1]){
                newArray.push(x)
            }
        })
        setNewData(newArray)
    }, [data || display])

    if(loading){
        return <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    }
    return <Chart
        id={'chart'}
        title={`${_.toUpper("Total submission in year")} ${moment(timeKey).format("YYYY")}`}
        dataSource={newData}
        // palette={palette}
    >
        <CommonSeriesSettings argumentField={'month'} type={'stackedBar'} />
        <Series
            valueField={'active_submissions'}
            name={'Disable Active'}
        />
        <Series
            valueField={'inactive_submissions'}
            name={'Active'}
        />
        <ValueAxis position={'left'}>
            <Title text={'Total'} />
        </ValueAxis>
        <Legend
            verticalAlignment={'bottom'}
            horizontalAlignment={'center'}
            itemTextPosition={'top'}
        />
        <Export enabled={true} />
        <Tooltip
            enabled={true}
            location={'edge'}
            customizeTooltip={(e)=>customizeTooltip(e)}
        />
    </Chart>
}

export default TotalSubmissionChart;
