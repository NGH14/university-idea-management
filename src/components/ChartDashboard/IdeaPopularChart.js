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
import {CircularProgress} from "@mui/material";

// total
function IdeaPopularChart({timeKey, data, loading}){
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
    if(loading){
        return <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    }
    return <>
        <PieChart
            id={"pie"}
            dataSource={data}
            palette={"Bright"}
            title={`${_.toUpper("Top idea have the most comment in")} ${moment(timeKey).format("MM/YYYY")} `}
            // onClick={this.legendClickHandler}
            onPointClick={(e)=>pointClickHandler(e)}
            onLegendClick={(e)=>legendClickHandler(e)}
        >
            <Series argumentField={"idea.title"} valueField={"comment_number"}>
                <Label visible={true}>
                    <Connector visible={true} width={1} />
                </Label>
            </Series>

            {/*<Size width={500} />*/}
            <Export enabled={true} />
        </PieChart>

    </>
}
export default IdeaPopularChart;