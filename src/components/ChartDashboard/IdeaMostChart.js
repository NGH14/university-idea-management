import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    Chart,
    PieSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import {useState} from "react";
import _ from "lodash";
import YearPicker from '@mui/lab/YearPicker';
import {Export} from "devextreme-react/pie-chart";

// total
function IdeaMostChart(){
    const chartData = [
        { idea: 'idea 1', numberComment: 222, color: "red"},
        { idea: 'idea 2', numberComment: 323, color: "#9500ae" },
        { idea: 'idea 3', numberComment: 22, color: "#4615b2" },
        { idea: 'idea 4', numberComment: 7, color: "#2a3eb1" },
        { idea: 'idea 5', numberComment: 333, color: "#00a0b2" },
        { idea: 'idea 7', numberComment: 442, color: "#00a152" },
        { idea: 'idea 6', numberComment: 2,color: "#52b202" },
        { idea: 'idea 8', numberComment: 55, color: "#8ab200" },
        { idea: 'idea 9', numberComment: 55, color: "#b28900" },
        { idea: 'idea 10', numberComment: 55, color: "#b26500" },
    ];
    const [data, setData] = useState(chartData)
    return <>
        <Paper>
            <Chart
                data={data}
            >
                <PieSeries
                    valueField="numberComment"
                    argumentField="idea"
                    innerRadius={0.6}

                    // pointComponent={(value)=>renderChart(value)}
                />
                <Title
                    text={`${_.toUpper("Chart top 10 idea popular in")} ${<YearPicker   date={"YYYY"} isDateDisabled={false}/>}`}
                />
                <Animation />

            </Chart>
        </Paper>
    </>
}
export default IdeaMostChart;