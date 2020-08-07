import React, {Component} from 'react';
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

import './DouAreaChart.css'
class DouAreaChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerId: (this.props.containerId != null) ? this.props.containerId : 'line-container',
        }

    }

    drawTables = (param) => {

        const data = [
            { Date: '22 February', 测量值: 50000, 理论值: 125000},
            { Date: '28 February', 测量值: 60000, 理论值: 150000 },
            { Date: '3 March', 测量值: 100000, 理论值: 250000 },
            { Date: '20 March', 测量值: 200000, 理论值: 500000 },
            { Date: '7 April', 测量值: 250000, 理论值: 625000 },
            { Date: '13 June', 测量值: 210000, 理论值: 525000 },
        ];

        const chart = new Chart({
            container: this.state.containerId,
            autoFit: true,
            height: 200,
            width: 500,
            padding: 0,
        });

        chart.scale('Date', {
            range: [0, 1],
            tickCount: 10,
            type: 'timeCat',
            mask: 'MM-DD',
        });
        chart.scale({
            range: {
                nice: true,
                sync: true,
            },
            value: {
                nice: true,
                sync: true,
            }
        });
        chart.axis('value', {
            label: {
                formatter: (text) => {
                    return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                },
            },
        });
        chart.tooltip({
            showCrosshairs: true,
            shared: true,
        });

        const ds = new DataSet();

// view1
        const dv = ds
            .createView()
            .source(data)
            .transform({
                type: 'map',
                callback(row) {
                    row.range = [row.测量值, row.理论值];
                    return row;
                },
            });
        const view1 = chart.createView({
            padding: [8, 8, 48, 64],
        });
        view1.data(dv.rows);
        view1.axis(false);
        view1.tooltip(false);
        view1.area()
            .position('Date*range')
            .color('#8d8d8d')
            .style({
                fillOpacity: 0.3,
            });


// view2
        const dv2 = ds
            .createView()
            .source(data)
            .transform({
                type: 'fold',
                fields: ['测量值', '理论值'],
                key: 'type',
                value: 'value',
                retains: ['Date'],
            });
        const view2 = chart.createView({
            padding: [8, 8, 48, 64],
        });
        view2.data(dv2.rows);
        view2
            .line()
            .position('Date*value')
            .color('type');
        view2
            .point()
            .position('Date*value')
            .color('type')
            .shape('circle');

        chart.removeInteraction('legend-filter'); // 关闭图例过滤交互

        chart.render();
    }


    componentDidMount(){
        this.drawTables()
    }

    render() {
        return (
            <>
                <div className={"dou-area-chart-bg"}>
                    <p className={"line-title"}>这是关于图表的描述</p>
                    <div id={this.state.containerId} className={"line-chart-container-bg"}>
                    </div>
                </div>
            </>
        );
    }
}

export default DouAreaChart;
