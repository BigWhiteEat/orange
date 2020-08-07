import React, {Component} from 'react';
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

import './Teams.css';

class Teams extends Component {
    constructor(props) {
        super(props);
    }
    drawTables = (param) => {
        var colors = {
            主管 : 'purple',
            部门一 : '#1890ff',
            部门二 : '#13c2c2',
            部门三 : '#ffc53d',
            部门四 : '#73d13d',
        }
        var manager = [
            { type: '主管', value: 1 },
        ];
        var departments = [
            { type: '部门一', value: 31 },
            { type: '部门二', value: 28 },
            { type: '部门三', value: 20 },
            { type: '部门四', value: 21 },
        ];
        var teams = [
            { name: '1', type: '部门一', value: 11 },
            { name: '2', type: '部门一', value: 10 },
            { name: '3', type: '部门一', value: 10 },
            { name: '4', type: '部门二', value: 14 },
            { name: '5', type: '部门二', value: 7 },
            { name: '6', type: '部门二', value: 7 },
            { name: '7', type: '部门三', value: 14 },
            { name: '8', type: '部门三', value: 3 },
            { name: '9', type: '部门三', value: 3 },
            { name: '10', type: '部门四', value: 11 },
            { name: '11', type: '部门四', value: 5 },
            { name: '12', type: '部门四', value: 5 },
        ];


        const ds = new DataSet();
        const dv = ds.createView();
        dv.source(manager).transform({
            type: 'percent',
            field: 'value',
            dimension: 'type',
            as: 'percent',
        });
        const chart = new Chart({
            container: 'container',
            autoFit: true,
            height: 400,
        });
        chart.data(dv.rows);
        chart.legend(false);
        chart.coordinate('theta', {
            radius: 0.17,
            innerRadius: 0.0,
        });
        chart.tooltip({
            showMarkers: false
        });
        chart.interval()
            .adjust('stack')
            .position('percent')
            .color('type', (type) => colors[type] )
            .style({
                stroke: 'white',
                lineWidth: 1,
            })
            .label('type', {
                offset: -20,
                style: {
                    fill: 'white',
                    shadowBlur: 2,
                    shadowColor: 'rgba(0, 0, 0, .45)',
                },
            });


        const ds2 = new DataSet();
        const dv2 = ds2.createView();
        dv2.source(departments).transform({
            type: 'percent',
            field: 'value',
            dimension: 'type',
            as: 'percent',
        });
        const outterView = chart.createView();
        outterView.data(dv2.rows);
        outterView.coordinate('theta', {
            innerRadius:  0.3,
            radius: 0.6,
        });
        outterView
            .interval()
            .adjust('stack')
            .position('percent')
            .color('type', (type) => colors[type] )
            .style({
                stroke: 'white',
                lineWidth: 1,
            })
            .label('type', {
                offset: -10,
                style: {
                    fill: 'white',
                    shadowBlur: 2,
                    shadowColor: 'rgba(0, 0, 0, .45)',
                },
            });


        const ds3 = new DataSet();
        const dv3 = ds3.createView();
        dv3.source(teams).transform({
            type: 'percent',
            field: 'value',
            dimension: 'name',
            as: 'percent',
        });
        const outterView2 = chart.createView();
        outterView2.data(dv3.rows);
        outterView2.coordinate('theta', {
            innerRadius: 0.75,
            radius: 0.8,
        });
        outterView2
            .interval()
            .adjust('stack')
            .position('percent')
            .color('type', (type) => colors[type] )
            .style({
                stroke: 'white',
                lineWidth: 1,
            })
            .label('name', {
                offset: -10,
                style: {
                    fill: 'white',
                    shadowBlur: 2,
                    shadowColor: 'rgba(0, 0, 0, .45)',
                },
            });
        chart.interaction('element-active')
        chart.render();
    };

    componentDidMount(){
        this.drawTables()
    }

    render() {
        return (
            <div id="container">

            </div>
        );
    }
}

export default Teams;
