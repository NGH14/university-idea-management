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

const energySources = [
    { value: "comment", name: "Comment" },
    { value: "disLike", name: "DisLike" },
    { value: "like", name: "like" },

];


function IdeaInfoChart({timeKey, data, display}){
    const dataFake = [
        { idea: 'Like', numberComment: 222},
        { idea: 'Dislike', numberComment: 323 },
        { idea: 'Comment', numberComment: 22},
    ];
    const [newData, setNewData] = useState([])
    useEffect(()=>{
        const newArray =  []
        _.map(data, (x, index) => {
            const day = _.toNumber(moment(x.timeDay).format("DD"))
            if(day >= display[0] && day <= display[1]){
                newArray.push(x)
            }
        })
        setNewData(newArray)
    }, [display])
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

    return <>
        <Chart palette={"Blue"} dataSource={newData}>
            <CommonSeriesSettings
                argumentField={"timeDay"}
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