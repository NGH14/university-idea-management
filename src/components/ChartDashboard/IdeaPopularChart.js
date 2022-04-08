import * as React from 'react';
import PieChart, {
    Series,
    Label,
    Connector,
    Size,
    Export
} from "devextreme-react/pie-chart";
import _ from "lodash";
import moment from "moment";
import Box from "@mui/material/Box";
import {CircularProgress, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import {AuthRequest} from "../../common/AppUse";
import {LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {useEffect, useState} from "react";

// total
const dataNull = {
    title: "No data",
    comment_number: 0,
    null: true
}

function IdeaPopularChart({timeKey, data}){
    const [newFilter, setNewFilter] = useState(new Date(timeKey))
    const [newData, setNewData] = useState(data)
    useEffect(()=>{
        const newArray = [];
        if(data && !_.isEmpty(data)){
            const arrData = _.cloneDeep(data)
            _.map(arrData, x => {
                const title = x.idea?.title;
                const arr = {
                    ...x, title
                }
                newArray.push(arr)
            })
        } else {
            newArray.push(dataNull)
        }
        setNewFilter(new Date(timeKey))
        setNewData(newArray)

    }, [data])

    const pointClickHandler = (e) => {
        toggleVisibility(e?.target);
    }


    const legendClickHandler = (e) => {
        let arg = e?.target;
        let item = e?.component?.getAllSeries()[0].getPointsByArg(arg)[0];
        toggleVisibility(item);
    }

    const toggleVisibility = (item) => {
        item?.isVisible() ? item?.hide() : item.show();
    }

    const onMonthYearChange = async (value) => {
        const res = await AuthRequest.get(
            `dashboard/top-ideas?month=${moment(value).format(
                'MM',
            )}&year=${moment(value).format('YYYY')}`,
        );
        if (res?.data?.succeeded) {
            const newArray = [];
            const arrData = _.cloneDeep(res?.data?.result)
            if(arrData && !_.isEmpty(arrData)){
                _.map(arrData, x => {
                    const title = x.idea?.title;
                    const arr = {
                        ...x, title
                    }
                    newArray.push(arr)
                })
            } else {
                newArray.push(dataNull)
            }
            setNewFilter(new Date(value));
            setNewData(newArray);
        }
    };

    const renderPickerMonthYearIdea = () => {
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div style={{ width: 150 }}>
                    <DatePicker
                        inputFormat='MM/yyyy'
                        views={['month']}
                        label='Month year'
                        value={newFilter}
                        onChange={(value) => {
                            onMonthYearChange(value);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} helperText={null} />
                        )}
                    />
                </div>
            </LocalizationProvider>
        );
    };
    return <>
        <div style={{ marginRight: 20, width: '100%', height: 300 }}>
            <Paper>
                <div
                    style={{
                        textAlign: 'right',
                        justifyContent: 'right',
                        width: '100%',
                        display: 'flex',
                        paddingTop: 10,
                        paddingRight: 10,
                        marginBottom: 10,
                    }}>
                    {renderPickerMonthYearIdea()}
                </div>
                <PieChart
                    id={"pie"}
                    dataSource={newData}
                    palette={"Bright"}
                    title={`${_.toUpper("Top idea have the most comment in")} ${moment(newFilter).format("MM/YYYY")} `}
                    // onClick={this.legendClickHandler}
                    onPointClick={(e)=>pointClickHandler(e)}
                    onLegendClick={(e)=>legendClickHandler(e)}
                >
                    <Series argumentField={"title"} valueField={"comment_number"} color={newData[0]?.null ? "darkGray" : ""}>
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
}
export default IdeaPopularChart;