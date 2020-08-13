import React, {Component} from 'react';
import {Chart, registerTheme} from "@antv/g2";

import "./PieChart.css"



class PieChart extends Component {
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
            { item: 'Bridge Good', count: 40, percent: 0.4 },
            { item: 'Bridge Fair', count: 21, percent: 0.21 },
            { item: 'Bridge Poor', count: 17, percent: 0.17 }
        ];

        const chart = new Chart({
            container: this.state.containerId,
            height: this.state.containerHeight,
            theme: 'dark',
            autoFit: true,
        });

        chart.coordinate('theta', {
            radius: 0.75,
        });

        chart.data(data);

        chart.scale('percent', {
            formatter: (val) => {
                val = val * 100 + '%';
                return val;
            },
        });

        chart.tooltip({
            showTitle: false,
            showMarkers: false,
        });

        chart
            .interval()
            .position('percent')
            .color('item')
            .label('percent', {
                content: (data) => {
                    return `${data.item}: ${data.percent * 100}%`;
                },
            })
            .adjust('stack');

        chart.interaction('element-active');


        chart.render();
    }

    componentDidMount(){
        this.drawTables()
    };

    render() {
        return (
            <div className={"chart-bg"}>
                <b className={"line-title"}>Bridges Conditions</b>
                <div className={"line-separate"}></div>
                <div id={this.state.containerId} className={"pie-chart-container-bg"}>
                </div>
            </div>
        );
    }
}

export default PieChart;
