import React, {useEffect, useState} from "react";
import SelectBox from "devextreme-react/ui/select-box";
import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    Export,
    Grid,
    Legend,
    Margin,
    Title,
    Subtitle,
    Tooltip
} from "devextreme-react/ui/chart";
import _ from "lodash";
import moment from "moment";
import Box from "@mui/material/Box";
import {CircularProgress, Slider, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import {LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import Typography from "@mui/material/Typography";
import {AuthRequest} from "../../common/AppUse";

const energySources = [
    { value: "total_ideas", name: "total Idea" },
    { value: "total_comments", name: "Total Comment" },
    { value: "total_likes", name: "Total like" },
    { value: "total_dislikes", name: "Total Dislike" },
];

const customizeTooltip = (arg) => {
    return {
        text: arg.valueText
    };
}

function IdeaInfoChart({timeKey, data, loading}){

    const [newData, setNewData] = useState([])
    const [newFilter, setNewFilter] = useState({
        timeKey: new Date(timeKey),
        display: [1, 15]
    })


    useEffect(()=>{
        let arrDate = _.cloneDeep(data)
        const newArray =  []
        _.map(arrDate, (x, index) => {
            const day = _.toNumber(moment(x.date).format("DD"))
            if(day >= newFilter.display[0] && day <= newFilter.display[1]){
                x.date = moment(x.date).format("DD/MM/YYYY")
                newArray.push(x)
            }
        })
        setNewData(newArray)
    }, [data])

    const onFilterDisplay = (value) => {
        let arrDate = _.cloneDeep(data)
        const newArray =  []
        _.map(arrDate, (x, index) => {
            if(index + 1 >= value[0] && index+1 <= value[1]){
                x.date = moment(x.date).format("DD/MM/YYYY")
                newArray.push(x)
            }
        })
        setNewData(newArray)
        setNewFilter({...newFilter, display: value})
    }


    const renderText = () => {
        let textFrom = `${newFilter.display[0]}/${moment(timeKey).format("MM/YYYY")}`
        let textTo = `${newFilter.display[1]}/${moment(timeKey).format("MM/YYYY")}`
        if(newFilter.display[0] < 10){
            textFrom  = `0${newFilter.display[0]}/${moment(timeKey).format("MM/YYYY")}`
        }
        if(newFilter.display[1] < 10){
            textTo  = `0${newFilter.display[1]}/${moment(timeKey).format("MM/YYYY")}`
        }
        return `${textFrom} to ${textTo}`

    }

    const onMonthYearIdeaInfoChange = async (value) => {
        const res = await AuthRequest.get(
            `dashboard/activities?month=${moment(value).format(
                'MM',
            )}&year=${moment(value).format('YYYY')}`,
        );
        if (res?.data?.succeeded) {
            let arrDate = _.cloneDeep(res?.data?.result)
            const newArray =  []
            _.map(arrDate, (x, index) => {
                if(index + 1 >= 1 && index+1 <= 15){
                    x.date = moment(x.date).format("DD/MM/YYYY")
                    newArray.push(x)
                }
            })
            setNewFilter({ ...newFilter, display: [1, 15], timeKey: value });
            setNewData(newArray);
        }
    };


    const renderPickerMonthYearInfoIdea = () => {
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
                            inputFormat='MM/yyyy'
                            views={['month']}
                            label='Month year'
                            value={newFilter.timeKey}
                            onChange={(value) => {
                                onMonthYearIdeaInfoChange(value);
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
                                Day: {newFilter.display[0]} -{' '}
                                {newFilter.display[1]}
                            </Typography>
                            <Slider
                                aria-label='Small steps'
                                value={newFilter.display}
                                onChange={(value) => {
                                    onFilterDisplay(value.target.value)
                                }}
                                valueLabelDisplay='auto'
                                disableSwap
                                min={1}
                                max={new Date(
                                    newFilter.timeKey.getFullYear(),
                                    _.toNumber(
                                        moment(newFilter.timeKey).format(
                                            'MM',
                                        ),
                                    ),
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

    return <>
        <div style={{ marginLeft: 20, width: '100%' }}>
            <Paper>
                <div
                    style={{
                        textAlign: 'right',
                        justifyContent: 'right',
                        width: '100%',
                        display: 'flex',
                        paddingTop: 10,
                        paddingRight: 10,
                        marginBottom: 6,
                    }}>
                    {renderPickerMonthYearInfoIdea()}
                </div>
                <Chart palette={"Blue"} dataSource={newData}>
                    <CommonSeriesSettings
                        argumentField={"date"}
                        type={"line"}
                    />
                    {energySources.map(function(item, _) {
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
                        discreteAxisDivisionMode={"crossLabels"}
                    >
                        <Grid visible={true} />
                    </ArgumentAxis>
                    <Legend
                        verticalAlignment={"bottom"}
                        horizontalAlignment={"center"}
                        itemTextPosition={"bottom"}
                    />
                    <Export enabled={true} />
                    <Title text={`${_.toUpper("Information idea")}`}>
                        <Subtitle text={renderText()} />
                    </Title>
                    <Tooltip enabled={true} customizeTooltip={(e)=>customizeTooltip(e)} />
                </Chart>
            </Paper>
        </div>

    </>
}
export default IdeaInfoChart;