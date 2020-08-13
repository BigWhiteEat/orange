import React, {Component} from 'react';

import { Table, Menu, Divider} from 'antd';
import './Intro.css';


const { SubMenu } = Menu;

//**************模拟数据
const columns = [
    {
        title: '项目简介',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '详细说明',
        dataIndex: 'detail',
        key: 'detail'
    }
];

const intro_data = [
    {
        key: '1',
        name: '中文名',
        detail: '沪通长江大桥'
    }, {
        key: '2',
        name: '外文名',
        detail: 'Shanghai-Nantong Yangtze River Bridge'
    }, {
        key: '3',
        name: '始建日期',
        detail: '2014年3月1日'
    }, {
        key: '4',
        name: '投用日期',
        detail: '暂未投用'
    }, {
        key: '5',
        name: '所属地区',
        detail: '中国江苏省'
    }, {
        key: '6',
        name: '类型',
        detail: '公路铁路两用桥、大桥、斜拉桥'
    }, {
        key: '7',
        name: '长度',
        detail: '11.072千米'
    }, {
        key: '8',
        name: '车道规模',
        detail: '双向六车道'
    }, {
        key: '9',
        name: '轨道类型',
        detail: '四线轨道'
    }, {
        key: '10',
        name: '设计速度',
        detail: '100千米/小时（公路）、200-250千米/小时（铁路）'
    }, {
        key: '11',
        name: '途经线路',
        detail: '通锡高速铁路、沪通铁路'
    }
];

const struct_data = [
    {
        key: '1',
        name: '结构体系',
        detail: '斜拉桥'
    }, {
        key: '2',
        name: '跨度',
        detail: '140+462+1092+462+140m'
    }, {
        key: '3',
        name: '桥塔',
        detail: '倒Y型'
    }, {
        key: '4',
        name: '桥塔高度',
        detail: '325m'
    }, {
        key: '5',
        name: '基础',
        detail: '刚性沉井'
    }, {
        key: '6',
        name: '斜拉索',
        detail: '平行钢丝，7nm / 2000MPa'
    }, {
        key: '7',
        name: '桥面',
        detail: '塔梁分离、塔墩固结'
    }, {
        key: '8',
        name: '加劲梁',
        detail: '正交异性桥面-钢桁组合'
    }, {
        key: '9',
        name: '加劲梁',
        detail: '三主桁（宽35m，高16m，节间14m）'
    }, {
        key: '10',
        name: '结构钢',
        detail: 'Q370qE，Q420qE，Q500qE'
    }, {
        key: '11',
        name: '设计活载',
        detail: '中活载、ZK活载。公路-I级'
    }
];



class Intro extends Component {
    render() {
        const scroll = {};
        scroll.x = '450px';


        return (
            <div className={"intro-bg"}>

                <Divider  plain>结构信息</Divider>

                <Table className={"table-intro"}
                       columns={columns} dataSource={struct_data}
                       bordered size={"small"}
                       showSorterTooltip={false} pagination={false}
                       showHeader={false}
                       scroll={scroll}
                />

                <Divider  plain>项目信息</Divider>

                <Table className={"table-intro"}
                       columns={columns} dataSource={intro_data}
                       bordered size={"small"}
                       showSorterTooltip={false} pagination={false}
                       showHeader={false}
                       scroll={scroll}
                />



            </div>
        );
    }
}

export default Intro;
