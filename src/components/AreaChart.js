import React, {Component} from 'react';
import { Chart } from '@antv/g2';
import { Button, Popover, Space } from 'antd';
import Weather from "./Weather";
import './AreaChart.css'

class AreaChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            containerId: (this.props.containerId != null) ? this.props.containerId : 'area-container',
            showWeathers:  (this.props.showWeathers != null) ? this.props.showWeathers : false
        }

    }
    drawTables = (param) => {
        let data = [
            {
                "Data": "Feb 15 01",
                "sales": 12
            },{
                "Data": "Feb 15 02",
                "sales": 11
            },{
                "Data": "Feb 15 03",
                "sales": 11
            },{
                "Data": "Feb 15 04",
                "sales": 11
            },{
                "Data": "Feb 15 05",
                "sales": 10
            },{
                "Data": "Feb 15 06",
                "sales": 8
            },{
                "Data": "Feb 15 07",
                "sales": 6
            },{
                "Data": "Feb 15 08",
                "sales": 5
            },{
                "Data": "Feb 15 09",
                "sales": 3
            },{
                "Data": "Feb 15 10",
                "sales": 3
            },{
                "Data": "Feb 16 01",
                "sales": 4
            },{
                "Data": "Feb 16 02",
                "sales": 6
            },{
                "Data": "Feb 16 03",
                "sales": 7
            },{
                "Data": "Feb 16 04",
                "sales": 8
            },{
                "Data": "Feb 16 05",
                "sales": 6
            },{
                "Data": "Feb 16 06",
                "sales": 5
            },{
                "Data": "Feb 16 07",
                "sales": 6
            },{
                "Data": "Feb 16 08",
                "sales": 4
            },{
                "Data": "Feb 16 09",
                "sales": 3
            },{
                "Data": "Feb 16 10",
                "sales": 4
            },{
                "Data": "Feb 17 01",
                "sales": 5
            },{
                "Data": "Feb 17 02",
                "sales": 6
            },{
                "Data": "Feb 17 03",
                "sales": 7
            },{
                "Data": "Feb 17 04",
                "sales": 8
            },{
                "Data": "Feb 17 05",
                "sales": 6
            },{
                "Data": "Feb 17 06",
                "sales": 6
            },{
                "Data": "Feb 17 07",
                "sales": 5
            },{
                "Data": "Feb 17 08",
                "sales": 5
            },{
                "Data": "Feb 17 09",
                "sales": 4
            },{
                "Data": "Feb 17 10",
                "sales": 4
            }
        ]

        const chart = new Chart({
            container: this.state.containerId,
            height: 200,
            width: 600,
        });
        chart.data(data);
        chart.scale('Data', {
            tickCount: 3,
            formatter: val => {
                return val.substr(0, val.length - 2)
            }
        });

        chart.scale('sales', {
            nice: true,
            max: 20,
            min: 0
        });

        chart.axis('sales', {
            label: {
                formatter: text => {
                    return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                }
            }
        });
        // chart.tooltip({
        //     showCrosshairs: true,
        // });

        // chart.annotation().dataMarker({
        //     position: ['2014-01', 1750],
        //     top: true,
        //     text: {
        //         content: '说明标签',
        //         style: {
        //             fontSize: 10,
        //         }
        //     },
        //     line: {
        //         length: 30,
        //     },
        // });

        chart.line().position('Data*sales');
        chart.area().position('Data*sales');
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
            <div className={"line-chart-bg"}>
                {this.state.showWeathers ? (
                    <Weather/>
                ) : null}

                <p className={"line-title"}>这是关于图表的描述</p>
                <div id={this.state.containerId} className={"line-chart-container-bg"}>
                </div>

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
            </div>

        );
    }
}

export default AreaChart;
