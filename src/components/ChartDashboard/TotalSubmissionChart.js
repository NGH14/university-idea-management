import React, {useEffect, useState} from 'react';

import { Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Export, Tooltip } from 'devextreme-react/chart';
import _ from "lodash";
import moment from "moment";
const palette = ["red", "orange", "yellow", "green", "blue"];




function TotalSubmissionChart({timeKey, data, display}){
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
    }, [display])
    return <Chart
        id={'chart'}
        title={`${_.toUpper("Total submission in year")} ${moment(timeKey).format("YYYY")}`}
        dataSource={newData}
        // palette={palette}
    >
        <CommonSeriesSettings argumentField={'month'} type={'stackedBar'} />
        <Series
            valueField={'submissionDeActive'}
            name={'Disable Active'}
        />
        <Series
            valueField={'submissionActivity'}
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
