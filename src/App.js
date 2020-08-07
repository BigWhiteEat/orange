import React, {Component} from 'react';
import { Layout, Menu } from 'antd';
import Intro from "./components/Intro";
import ShowModels from "./components/ShowModels"
import ToolBox from "./components/ToolBox"
import AreaChart from "./components/AreaChart"
import BarChart from "./components/BarChart"
import DouAreaChart from "./components/DouAreaChart"
import RadarChart from "./components/RadarChart"

import {
    MenuUnfoldOutlined, MenuFoldOutlined, DotChartOutlined, RadiusSettingOutlined, RiseOutlined, BarChartOutlined
} from '@ant-design/icons';

import 'antd/dist/antd.css'
import './App.css';
const { Header, Sider, Content } = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            leftSlideWidth: 320,
            currentMenu: 1
        }
    }
    handleClick = e => {
        console.log('click ', e);
        this.setState({ currentMenu: e.key }, ()=>{
            if (this.state.currentMenu === "0"){
                var gap = 320;
                if(this.state.leftSlideWidth > 0){
                    gap = 0;
                }
                this.setState({
                    collapsed: !this.state.collapsed,
                    leftSlideWidth: gap
                });
            }else{

            }
        });
    };

    render() {
        return (
            <Layout className={"container"}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}
                       width={320}  collapsedWidth={0}
                       theme={"light"}
                       style={{
                           overflow: 'auto',
                           height: '100vh',
                           position: 'fixed',
                           left: 0,
                       }}>
                    <Intro/>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: this.state.leftSlideWidth }}>
                    <Header className="site-layout-background-header" style={{ padding: 0 }}>
                        <Menu onClick={this.handleClick} selectedKeys={[this.state.currentMenu]} mode="horizontal">
                            <Menu.Item key="0" className={'trigger'} icon={this.state.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}>
                            </Menu.Item>
                            <Menu.Item key="1" icon={<DotChartOutlined />}>
                                几何模型
                            </Menu.Item>
                            <Menu.Item key="2" icon={<RadiusSettingOutlined />}>
                                施工仿真
                            </Menu.Item>
                            <Menu.Item key="3" icon={<RiseOutlined />}>
                                超前预测
                            </Menu.Item>
                            <Menu.Item key="4" icon={<BarChartOutlined />}>
                                当前状态
                            </Menu.Item>
                        </Menu>
                    </Header>

                    <Content  className={"site-layout-background"}>
                        <h6 className={"title-tips cuIcon-tag"}> 建筑模型展示</h6>
                        <ShowModels leftSlideWidth={this.state.leftSlideWidth} />
                        <h6 className={"title-tips cuIcon-similar"}> 图表展示</h6>
                        <AreaChart containerId={'area-container-1'} showWeathers={true}/>
                        <h6 className={"title-tips cuIcon-similar"}> 图表展示</h6>
                        <BarChart  containerId={'bar-container'}/>
                        <h6 className={"title-tips cuIcon-similar"}> 图表展示</h6>
                        <DouAreaChart containerId={'dou-area-container'}/>
                        <h6 className={"title-tips cuIcon-similar"}> 图表展示</h6>
                        <RadarChart containerId={'radar-container'}/>
                        <ToolBox/>

                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;
