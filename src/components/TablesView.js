import React, {Component} from 'react';
import Weather from "./Weather";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import LineChart from "./LineChart";
import RadarChart from "./RadarChart";
import ShowModels from "./ShowModels";

import "./TablesView.css"
class TablesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftSlideWidth: (this.props.leftSlideWidth != null) ? this.props.leftSlideWidth : 200,
            colBgHeight: (this.props.colBgHeight != null) ? this.props.colBgHeight : 100
        }
    }

    render() {
        return (
            <div>
                <div className={"water-fall-row"}>
                    <div className={"coll-small"}  style={{height: this.props.colBgHeight}}>
                        <Weather />
                    </div>
                    <div className={"coll-small"} style={{height: this.props.colBgHeight}}>
                        <BarChart  containerId={'bar-container'} containerHeight = {this.props.colBgHeight}  />
                    </div>
                    <div className={"coll-small"} style={{height: this.props.colBgHeight}}>
                        <AreaChart containerId={'area-container-1'} containerHeight = {this.props.colBgHeight}/>
                    </div>
                </div>
                <div className={"water-fall-row2"}>
                    <div className={"coll-small-left"}>
                        <div className={"coll-small-left-item"} style={{height: this.props.colBgHeight}}>
                            <LineChart containerId={'dou-area-container'} containerHeight = {this.props.colBgHeight}/>
                        </div>
                        <div className={"coll-small-left-item"} style={{height: this.props.colBgHeight}}>
                            <RadarChart containerId={'radar-container'} containerHeight = {this.props.colBgHeight}/>
                        </div>
                    </div>
                    <div className={"coll-small-right"} style={{height: this.props.colBgHeight * 2}}>
                        <ShowModels leftSlideWidth={this.props.leftSlideWidth} containerHeight = {this.props.colBgHeight * 2} widthPercent={ 0.66} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TablesView;
