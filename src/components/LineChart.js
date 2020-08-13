import React, {Component} from 'react';
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

import './LineChart.css'
class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerId: (this.props.containerId != null) ? this.props.containerId : 'line-container',
            containerHeight: (this.props.containerHeight != null) ? this.props.containerHeight : 150,
        }

    }

    drawTables = (param) => {


        const data = [
            { month: 'Jan', city: '理论值', temperature: 7 },
            { month: 'Jan', city: '测量值', temperature: 3.9 },
            { month: 'Feb', city: '理论值', temperature: 6.9 },
            { month: 'Feb', city: '测量值', temperature: 4.2 },
            { month: 'Mar', city: '理论值', temperature: 9.5 },
            { month: 'Mar', city: '测量值', temperature: 5.7 },
            { month: 'Apr', city: '理论值', temperature: 14.5 },
            { month: 'Apr', city: '测量值', temperature: 8.5 },
            { month: 'May', city: '理论值', temperature: 18.4 },
            { month: 'May', city: '测量值', temperature: 11.9 },
            { month: 'Jun', city: '理论值', temperature: 21.5 },
            { month: 'Jun', city: '测量值', temperature: 15.2 },
            { month: 'Jul', city: '理论值', temperature: 25.2 },
            { month: 'Jul', city: '测量值', temperature: 17 },
            { month: 'Aug', city: '理论值', temperature: 26.5 },
            { month: 'Aug', city: '测量值', temperature: 16.6 },
            { month: 'Sep', city: '理论值', temperature: 23.3 },
            { month: 'Sep', city: '测量值', temperature: 14.2 },
            { month: 'Oct', city: '理论值', temperature: 18.3 },
            { month: 'Oct', city: '测量值', temperature: 10.3 },
            { month: 'Nov', city: '理论值', temperature: 13.9 },
            { month: 'Nov', city: '测量值', temperature: 6.6 },
            { month: 'Dec', city: '理论值', temperature: 9.6 },
            { month: 'Dec', city: '测量值', temperature: 4.8 },
        ];

        const chart = new Chart({
            container: this.state.containerId,
            autoFit: true,
            height: this.state.containerHeight - 90,
            theme: 'dark',
        });

        chart.data(data);
        chart.scale({
            month: {
                range: [0, 1],
            },
            temperature: {
                nice: true,
            },
        });

        chart.tooltip({
            showCrosshairs: true,
            shared: true,
        });

        chart.axis('temperature', {
            label: {
                formatter: (val) => {
                    return val + '';
                },
            },
        });

        chart
            .line()
            .position('month*temperature')
            .color('city')
            .shape('smooth');

        chart
            .point()
            .position('month*temperature')
            .color('city')
            .shape('circle');

        chart.render();

    }


    componentDidMount(){
        this.drawTables()
    }

    render() {
        return (
            <div className={"chart-bg"}>
                <b className={"line-title"}>塔端索力图</b>
                <div className={"line-separate"}></div>
                <div id={this.state.containerId} className={"line-chart-container-bg"}>
                </div>
            </div>
        );
    }
}

export default LineChart;
