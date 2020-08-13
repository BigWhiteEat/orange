import React, {Component} from 'react';
import { Chart } from '@antv/g2';

import { Button, Popover, Space } from 'antd';
import './AreaChart.css'

class AreaChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            containerId: (this.props.containerId != null) ? this.props.containerId : 'area-container',
            containerHeight: (this.props.containerHeight != null) ? this.props.containerHeight : 150,
            showSurplus: (this.props.showSurplus != null) ? this.props.showSurplus : false,
        }

    }
    drawTables = (param) => {
        let data = [
            {
                "Data": "Feb 15 01",
                "降雨": 12
            },{
                "Data": "Feb 15 02",
                "降雨": 11
            },{
                "Data": "Feb 15 03",
                "降雨": 11
            },{
                "Data": "Feb 15 04",
                "降雨": 11
            },{
                "Data": "Feb 15 05",
                "降雨": 10
            },{
                "Data": "Feb 15 06",
                "降雨": 8
            },{
                "Data": "Feb 15 07",
                "降雨": 6
            },{
                "Data": "Feb 15 08",
                "降雨": 5
            },{
                "Data": "Feb 15 09",
                "降雨": 3
            },{
                "Data": "Feb 15 10",
                "降雨": 3
            },{
                "Data": "Feb 16 01",
                "降雨": 4
            },{
                "Data": "Feb 16 02",
                "降雨": 6
            },{
                "Data": "Feb 16 03",
                "降雨": 7
            },{
                "Data": "Feb 16 04",
                "降雨": 8
            },{
                "Data": "Feb 16 05",
                "降雨": 6
            },{
                "Data": "Feb 16 06",
                "降雨": 5
            },{
                "Data": "Feb 16 07",
                "降雨": 6
            },{
                "Data": "Feb 16 08",
                "降雨": 4
            },{
                "Data": "Feb 16 09",
                "降雨": 3
            },{
                "Data": "Feb 16 10",
                "降雨": 4
            },{
                "Data": "Feb 17 01",
                "降雨": 5
            },{
                "Data": "Feb 17 02",
                "降雨": 6
            },{
                "Data": "Feb 17 03",
                "降雨": 7
            },{
                "Data": "Feb 17 04",
                "降雨": 8
            },{
                "Data": "Feb 17 05",
                "降雨": 6
            },{
                "Data": "Feb 17 06",
                "降雨": 6
            },{
                "Data": "Feb 17 07",
                "降雨": 5
            },{
                "Data": "Feb 17 08",
                "降雨": 5
            },{
                "Data": "Feb 17 09",
                "降雨": 4
            },{
                "Data": "Feb 17 10",
                "降雨": 4
            }
        ]

        const chart = new Chart({
            container: this.state.containerId,
            height: this.state.containerHeight - 80,
            theme: 'dark',
            autoFit: true
        });
        chart.data(data);
        chart.scale('Data', {
            tickCount: 3,
            formatter: val => {
                return val.substr(0, val.length - 2)
            }
        });

        chart.scale('降雨', {
            nice: true,
            max: 20,
            min: 0
        });

        chart.axis('降雨', {
            label: {
                formatter: text => {
                    return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                }
            }
        });
        chart.tooltip({
            showCrosshairs: true,
        });

        chart.annotation().dataMarker({
            position: ['2014-01', 1750],
            top: true,
            text: {
                content: '说明标签',
                style: {
                    fontSize: 10,
                }
            },
            line: {
                length: 30,
            },
        });

        chart.line().position('Data*降雨');
        chart.area().position('Data*降雨');
        chart.render();
    }

    componentDidMount(){
        this.drawTables()
    }
    render() {
        const content = (
            <div>
                <p>详细显示的内容</p>
            </div>
        );

        return (
            <div className={"chart-bg"}>
                <b className={"line-title"}>雨量统计</b>
                <div className={"line-separate"}></div>
                <div id={this.state.containerId} className={"area-chart-container-bg"}>
                </div>

                {
                    this.state.showSurplus?(
                        <Space className={"bottom-bg"}>
                            <Popover content={content} title="详情" trigger="hover">
                                <Button><b style={{color: '#aaaaaa'}}>Low: </b>2 mph</Button>
                            </Popover>
                            <Popover content={content} title="详情" trigger="hover">
                                <Button><b style={{color: '#aaaaaa'}}>Average: </b>10 mph</Button>
                            </Popover>
                            <Popover content={content} title="详情" trigger="hover">
                                <Button><b style={{color: '#aaaaaa'}}>High: </b>22 mph</Button>
                            </Popover>
                        </Space>
                    ):null
                }
            </div>

        );
    }
}

export default AreaChart;
