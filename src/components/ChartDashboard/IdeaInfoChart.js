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
import {CircularProgress} from "@mui/material";

const energySources = [
    { value: "total_ideas", name: "total_ideas" },
    { value: "total_comments", name: "total_comments" },
    { value: "total_likes", name: "total_comments" },
    { value: "total_dislikes", name: "total_comments" },
];


function IdeaInfoChart({timeKey, data, display, loading}){

    const [newData, setNewData] = useState([])
    useEffect(()=>{
        const newArray =  []
        _.map(data, (x, index) => {
            const day = _.toNumber(moment(x.date).format("DD"))
            if(day >= display[0] && day <= display[1]){
                x.date = moment(x.date).format("DD/MM/YYYY")
                newArray.push(x)
            }
        })
        setNewData(newArray)
    }, [data,display])

    const customizeTooltip = (arg) => {
        return {
            text: arg.valueText
        };
    }

    const renderText = () => {
        let textFrom = `${display[0]}/${moment(timeKey).format("MM/YYYY")}`
        let textTo = `${display[1]}/${moment(timeKey).format("MM/YYYY")}`
        if(display[0] < 10){
            textFrom  = `0${display[0]}/${moment(timeKey).format("MM/YYYY")}`
        }
        if(display[1] < 10){
            textTo  = `0${display[1]}/${moment(timeKey).format("MM/YYYY")}`
        }
        return `${textFrom} to ${textTo}`

    }
    if(loading){
        return <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    }

    return <>
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
    </>
}
export default IdeaInfoChart;