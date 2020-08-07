import React, {Component} from 'react';
import { Chart } from '@antv/g2';

import './BarChart.css'

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerId: (this.props.containerId != null) ? this.props.containerId : 'bar-container',
        }
    }

    drawTables = (param) => {
        const data = [
            { type: '11', value: 654, percent: 0.02 },
            { type: '22', value: 654, percent: 0.02 },
            { type: '333', value: 4400, percent: 0.2 },
            { type: '444', value: 5300, percent: 0.24 },
            { type: '555', value: 6200, percent: 0.28 },
            { type: '666', value: 3300, percent: 0.14 },
            { type: '777', value: 1500, percent: 0.06 },
        ];

        const chart = new Chart({
            container: this.state.containerId,
            autoFit: true,
            height: 200,
            padding: [50, 20, 50, 20],
        });
        chart.data(data);
        chart.scale('value', {
            alias: '显示详情',
        });

        chart.axis('type', {
            tickLine: {
                alignTick: false,
            },
        });
        chart.axis('value', false);

        chart.tooltip({
            showMarkers: false,
        });
        chart.interval().position('type*value');
        chart.interaction('element-active');

// 添加文本标注
        data.forEach((item) => {
            chart
                .annotation()
                .text({
                    position: [item.type, item.value],
                    content: item.value,
                    style: {
                        textAlign: 'center',
                    },
                    offsetY: -30,
                })
                .text({
                    position: [item.type, item.value],
                    content: (item.percent * 100).toFixed(0) + '%',
                    style: {
                        textAlign: 'center',
                    },
                    offsetY: -12,
                });
        });
        chart.render();
    }

    componentDidMount(){
        this.drawTables()
    }

    render() {
        return (
            <>
                <div className={"bar-chart-bg"}>
                    <p className={"line-title"}>这是关于图表的描述</p>
                    <div id={this.state.containerId} className={"line-chart-container-bg"}>
                    </div>
                </div>
            </>
        );
    }
}

export default BarChart;
