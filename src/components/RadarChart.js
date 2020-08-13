import React, {Component} from 'react';
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import './RadarChart.css'


class RadarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerId: (this.props.containerId != null) ? this.props.containerId : 'radar-container',
            containerHeight: (this.props.containerHeight != null) ? this.props.containerHeight : 150,
        }

    }
    drawTables = (param) => {
        const { DataView } = DataSet;

        const data = [
            { item: '0:00', a: 70, b: 30 },
            { item: '3:00', a: 60, b: 70 },
            { item: '6:00', a: 50, b: 60 },
            { item: '9:00', a: 40, b: 50 },
            { item: '12:00', a: 60, b: 70 },
            { item: '15:00', a: 70, b: 50 },
            { item: '18:00', a: 50, b: 40 },
            { item: '21:00', a: 30, b: 40 }
        ];
        const dv = new DataView().source(data);
        dv.transform({
            type: 'fold',
            fields: ['a', 'b'], // 展开字段集
            key: 'user', // key字段
            value: 'score', // value字段
        });
        const chart = new Chart({
            container: this.state.containerId,
            autoFit: true,
            height: this.state.containerHeight - 50,
            theme: 'dark',
        });
        chart.data(dv.rows);
        chart.scale('score', {
            min: 0,
            max: 80,
        });
        chart.coordinate('polar', {
            radius: 0.8,
        });
        chart.axis('item', {
            line: null,
            tickLine: null,
            grid: {
                line: {
                    style: {
                        lineDash: null,
                    },
                },
            },
        });
        chart.axis('score', {
            line: null,
            tickLine: null,
            grid: {
                line: {
                    type: 'circle',
                    style: {
                        lineDash: null,
                    },
                },
                alternateColor: 'rgba(0, 0, 0, 0.04)',
            },
        });

        chart
            .point()
            .position('item*score')
            .color('user')
            .shape('circle')
            .size(4)
            .style({
                stroke: '#fff',
                lineWidth: 1,
                fillOpacity: 1,
            });
        chart
            .line()
            .position('item*score')
            .color('user')
            .size(2);
        chart.render();

    }

    componentDidMount(){
        this.drawTables()
    }

    render() {
        return (
            <div className={"chart-bg"}>
                <b className={"line-title"}>桥塔稳定</b>
                <div id={this.state.containerId} className={"radar-chart-bg"}>
                </div>
            </div>
        );
    }
}

export default RadarChart;
