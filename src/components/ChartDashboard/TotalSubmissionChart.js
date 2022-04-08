import React, {useEffect, useState} from 'react';

import { Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Export, Tooltip } from 'devextreme-react/chart';
import _ from "lodash";
import moment from "moment";
import Box from "@mui/material/Box";
import {CircularProgress, Slider, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import {LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import Typography from "@mui/material/Typography";
const palette = ["red", "orange", "yellow", "green", "blue"];


const customizeTooltip = (arg) => {
    return {
        text: `${arg.value}`
    };
}

function TotalSubmissionChart({ data, loading, setFilter, filter}){

    const [newData, setNewData] = useState([])
    const [filterDisplay, setFilterDisplay] = useState([1, 6])

    useEffect(()=>{
        const newArray =  []
        _.map(data, (x, index) => {
            if(index + 1 >= filterDisplay[0] && index+1 <= filterDisplay[1]){
                newArray.push(x)
            }
        })

        setNewData(newArray)
    }, [data])

    const onFilterDisplay = (value) => {
        const newArray =  []
        _.map(data, (x, index) => {
            if(index + 1 >= value[0] && index+1 <= value[1]){
                newArray.push(x)
            }
        })
        setNewData(newArray)
        setFilterDisplay(value);
    }

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
                        justifyContent: 'right',
                    }}>
                    <div style={{ marginRight: 20, padding: 0, width: 150 }}>
                        <DatePicker
                            inputFormat='yyyy'
                            views={['year']}
                            label='Year'
                            value={filter?.year}
                            onChange={(value) => {
                                onYearChange(value);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} />
                            )}
                        />
                    </div>

                    <div>
                        <Box sx={{ width: 250, textAlign: 'right', margin: 0 }}>
                            <Typography
                                id='input-slider'
                                gutterBottom
                                textAlign={'left'}
                                style={{ margin: 0 }}>
                                Month: {filterDisplay[0]} - {filterDisplay[1]}
                            </Typography>
                            <Slider
                                aria-label='Small steps'
                                value={filterDisplay}
                                onChange={(value) => onFilterDisplay(value?.target?.value)}
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
    return <Paper>
        <div
            style={{
                textAlign: 'right',
                justifyContent: 'right',
                width: '100%',
                display: 'flex',
                paddingTop: 10,
                paddingRight: 10,
            }}>
            {renderPickerYear()}
        </div>
        <Chart
            id={'chart'}
            title={`${_.toUpper("Total submission in year")} ${moment(filter).format("YYYY")}`}
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
    </Paper>

}

export default TotalSubmissionChart;
