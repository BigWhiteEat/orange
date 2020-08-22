import React, {Component} from 'react';
import {Layout, Menu, Row, Col} from 'antd';
import {
    MenuUnfoldOutlined, MenuFoldOutlined, DotChartOutlined,
    RadiusSettingOutlined, RiseOutlined, BarChartOutlined,
    AppstoreOutlined, BuildOutlined, ApartmentOutlined
} from '@ant-design/icons';

import TablesView from "./components/TablesView"
import Overview from "./components/Overview";
import Intro from "./components/Intro";

import './App.css';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            leftSlideWidth: 80,
            colBgHeight: 100,
            showCols: false,
            pageIndex: "1",
            currentMenu: "0"
        }
        // this.renderDetails = this.renderDetails.bind(this);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({ currentMenu: e.key }, ()=>{
            if (this.state.currentMenu === "0"){
                var gap = 80;
                if(this.state.collapsed){
                    gap = 200;
                }
                this.setState({
                    collapsed: !this.state.collapsed,
                    leftSlideWidth: gap
                });
            }else{
                let _pageIndex =  this.state.currentMenu;
                this.setState({pageIndex: _pageIndex})
            }
        });
    };


    /**
     * 开始Three
     *
     * @memberof ThreeBim
     */
    componentDidMount(){
        // let colHeight =  Math.floor((document.body.clientHeight - 64) / 3);
        // // console.log('colHeight =   ', colHeight);
        // this.setState({
        //     colBgHeight: colHeight,
        //     showCols: true
        // })

    }


    renderDetails = () => {
        let colHeight =  Math.floor((document.body.clientHeight - 64) / 3);
        if (this.state.pageIndex === "1") {
            console.log("111111")
            return (
                <Overview containerHeight={colHeight}/>
            );
        } else  if (this.state.pageIndex === "2") {
            console.log("222222")
            return (
                <TablesView leftSlideWidth={this.state.leftSlideWidth} colBgHeight={colHeight}/>
            );

            // {this.state.showCols ?
            //         (
            //      <TablesView leftSlideWidth={this.state.leftSlideWidth} colBgHeight={this.state.colBgHeight}/>
            //      ) : null}
        }else  if (this.state.pageIndex === "3"){
            return (
                 <Intro />
            );
        }

    }

    render() {
        return (
            <Layout className={"container"}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}
                       width={200}  collapsedWidth={80}
                       style={{
                           overflow: 'auto',
                           height: '100vh',
                           position: 'fixed',
                           left: 0,
                       }}
                       >
                    <div className="logo" >
                        <img src={"logo192.png"}/>
                        {!this.state.collapsed ? (
                            <b>斜拉桥数字化平台</b>
                        ) : null}
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<DotChartOutlined />}>
                            当前状态
                        </Menu.Item>

                        <SubMenu key="7" icon={<ApartmentOutlined />} title="工作团队">
                            <Menu.Item key="71" >
                                团队1
                            </Menu.Item>
                            <Menu.Item key="71" >
                                团队2
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="项目信息">
                            <Menu.Item key="5" icon={<AppstoreOutlined />}>
                                项目信息
                            </Menu.Item>
                            <Menu.Item key="6" icon={<BuildOutlined />}>
                                结构信息
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="2" icon={<RadiusSettingOutlined />}>
                            施工仿真
                        </Menu.Item>
                        <Menu.Item key="3" icon={<RiseOutlined />}>
                            超前预测
                        </Menu.Item>


                    </Menu>
                </Sider>
                <Layout className="site-layout"  style={{ marginLeft: this.state.leftSlideWidth}}>
                    <Header className="site-layout-background-header" style={{ padding: 0 }}>
                        <Menu onClick={this.handleClick} selectedKeys={[this.state.currentMenu]} mode="horizontal">
                            <Menu.Item key="0" className={'trigger'} icon={this.state.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}>
                            </Menu.Item>
                            <Menu.Item key="1"  icon={<DotChartOutlined />}>
                                Bridge
                            </Menu.Item>
                            <Menu.Item key="2" icon={<RadiusSettingOutlined />}>
                                Safety
                            </Menu.Item>
                            <Menu.Item key="3" icon={<RiseOutlined />}>
                                Information
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content  className={"water-fall"}>
                        {this.renderDetails()}
                    </Content>
                    <Footer className={"footer"} ><b>Design ©2018 Created by SWJTU</b></Footer>
                </Layout>
            </Layout>
        );
    }
}

export default App;

//  打包时加上这句
//  "homepage": "https://bigwhiteea.github.io/orange",
