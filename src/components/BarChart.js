import React, {Component} from 'react';
import { Chart } from '@antv/g2';

import './BarChart.css'

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerId: (this.props.containerId != null) ? this.props.containerId : 'bar-container',
            containerHeight: (this.props.containerHeight != null) ? this.props.containerHeight : 150,
            chart: null
        }
    }
    drawTables = (param) => {
        const data = [
            { year: 'SJ51', value: 38 },
            { year: 'SJ52', value: 52 },
            { year: 'SJ56', value: 61 },
            { year: 'SJ57', value: 145 },
            { year: 'SJ58', value: 48 },
            { year: 'SJ59', value: 38 },
            { year: 'SJ60', value: 38 },
            { year: 'SJ62', value: 38 },
        ];
        this.state.chart  = new Chart({
            container: this.state.containerId,
            autoFit: true,
            height: this.state.containerHeight - 80,
            theme: 'dark',
        });


        this.state.chart.data(data);
        this.state.chart.scale('value', {
            nice: true,
        });

        this.state.chart.tooltip({
            showMarkers: false
        });
        this.state.chart.interaction('active-region');
        this.state.chart.interval().position('year*value');
        this.state.chart.render();
    }

    componentDidMount(){
        this.drawTables()
        // this.props.onRef(this)
    };

    // freshTable = () => {
    //     console.log("freshTablefreshTable");
    //     this.state.chart.interaction('active-region');
    //     this.state.chart.interval().position('year*value');
    //     this.state.chart.render();
    // };

    render() {
        return (
            <div className={"chart-bg"}>
                <b className={"line-title"}>Cable Force Error</b>
                <div className={"line-separate"}></div>
                <div id={this.state.containerId} className={"bar-chart-container-bg"}>
                </div>
            </div>
        );
    }
}

export default BarChart;
