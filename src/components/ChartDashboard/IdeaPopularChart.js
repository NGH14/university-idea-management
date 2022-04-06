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

// total
function IdeaPopularChart({timeKey, data}){
    const dataFake = [
        { idea: 'idea 1', numberComment: 222},
        { idea: 'idea 2', numberComment: 323 },
        { idea: 'idea 3', numberComment: 22},
        { idea: 'idea 4', numberComment: 7 },
        { idea: 'idea 5', numberComment: 333},
        { idea: 'idea 7', numberComment: 442 },
        { idea: 'idea 6', numberComment: 2},
        { idea: 'idea 8', numberComment: 55 },
        { idea: 'idea 9', numberComment: 55 },
        { idea: 'idea 10', numberComment: 55},
    ];
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
    return <>
        <PieChart
            id={"pie"}
            dataSource={data && !_.isEmpty(data) ? data : dataFake}
            palette={"Bright"}
            title={`${_.toUpper("Top idea have the most comment in")} ${moment(timeKey).format("MM/YYYY")} `}
            // onClick={this.legendClickHandler}
            onPointClick={(e)=>pointClickHandler(e)}
            onLegendClick={(e)=>legendClickHandler(e)}
        >
            <Series argumentField={"idea"} valueField={"numberComment"}>
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