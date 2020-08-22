import React, {Component} from 'react';
import {Layout, Menu, Button, Tooltip, message, Drawer} from 'antd';

import {
    CaretDownOutlined,
    BorderOutlined,
    SearchOutlined,
    PicLeftOutlined,
    BgColorsOutlined
} from '@ant-design/icons';
import ShowModels from "../components/ShowModels";
import DashTableView from "./DashTableView"
import './OperateView.css'
const { SubMenu } = Menu;
const { Sider } = Layout;

const style = {
    menuStyle : {
        color: 'white',
        maxHeight: 350,
        overflow: 'auto',
        opacity: 0.9,
        transitionDuration: '.6s',
        transitionProperty: 'all',
        transitionTimingFunction: 'ease',
        transitionDelay: '0s'
    },
    menuStyleHide : {
        maxHeight: 0,
        overflow: 'hidden',
        opacity: 0.9,
        // backgroundColor: '#2A2759',
        transitionDuration: '0.2s',
        transitionProperty: 'all',
        transitionTimingFunction: 'ease',
        transitionDelay: '0s'
    }
}

//tips : submenus 最多三个分支
const menusConfig = [
    {
        'subject': '工程状态',
        'menus': [
            {
                'kind' : 'submenu',
                'title': '需要解决的问题',
                submenus:[
                    {kind:'item', title: '今天 (2020/08/17)'},
                    {kind:'item', title: '本周 (2020/08/17 - 2020/08/23)'},
                    {kind:'item', title: '本月 (2020/08)'},
                    {kind:'item', title: '本季度 (2020/08 - 2020/09)'},
                    {kind:'item', title: '本年度 (2020)'}
                ]
            },
            {
                'kind' : 'submenu',
                'title': '工程',
                submenus:[
                    {kind:'item', title: '总体工程进度'},
                    {kind:'item', title: '完成量'},
                    {kind:'item', title: '风险工程'}
                ]
            },
            {
                'kind' : 'submenu',
                'title': '质量',
                submenus:[
                    {kind:'item', title: '质量验收'},
                    {kind:'item', title: '设计目标'}
                ]
            },
            {
                'kind' : 'submenu',
                'title': '安全',
                submenus:[
                    {kind:'item', title: '结构安全'},
                    {kind:'item', title: '过程安全'}
                ]
            },
            {
                'kind' : 'submenu',
                'title': '合作单位',
                submenus:[
                    {kind:'item', title: '建设业主'},
                    {kind:'item', title: '总承包'},
                    {kind:'item', title: '设计'},
                    {kind:'item', title: '施工'},
                    {kind:'item', title: '监理'},
                    {kind:'item', title: '咨询服务'},
                    {kind:'submenu', title: '供应商', 'submenus': ['材料供应', '劳务合作']}
                ]
            }
        ],
    },
    {
        'subject': '建造阶段',
        'menus': [
            {
                'kind' : 'submenu',
                'title': '锚碇',
                submenus:[
                    {kind:'item', title: '南锚碇'},
                    {kind:'item', title: '北锚碇'},
                ]
            },
            {
                'kind' : 'submenu',
                'title': '桥塔',
                submenus:[
                    {kind:'submenu', title: '南塔', 'submenus': ['节段', '下横梁', '上横梁']},
                    {kind:'submenu', title: '北塔', 'submenus': ['1', '2', '3', '4']},
                ]
            },
            {
                'kind' : 'submenu',
                'title': '主缆',
                submenus:[
                    {kind:'item', title: '基准索股'},
                    {kind:'item', title: '丝股 2-135'},
                ]
            },
            {
                'kind' : 'submenu',
                'title': '加劲梁',
                submenus:[
                    {kind:'item', title: '支架段O '},
                    {kind:'item', title: '悬臂拼装段1 -67'},
                    {kind:'item', title: '合拢段68'},
                ]
            }
        ]
    },
    {
        'subject': '力学验算',
        'menus': [
            {
                'kind' : 'item',
                'title': '结构位移'
            },
            {
                'kind' : 'item',
                'title': '结构内力'
            },
            {
                'kind' : 'item',
                'title': '结构应力'
            },
            {
                'kind' : 'item',
                'title': '结构动力特性'
            },
            {
                'kind' : 'item',
                'title': '静风作用'
            },
            {
                'kind' : 'item',
                'title': '动风作用'
            },
            {
                'kind' : 'item',
                'title': '水动力'
            },
            {
                'kind' : 'item',
                'title': '特殊载荷作用'
            }
        ]
    },
    {
        'subject': '安全风险',
        'menus': [
            {
                'kind' : 'item',
                'title': '灾害敞口'
            },
            {
                'kind' : 'item',
                'title': '结构易损性'
            },
            {
                'kind' : 'item',
                'title': '风险评估'
            }
        ]
    },
    ,
    {
        'subject': '预测与措施',
        'menus': [
            {
                'kind' : 'submenu',
                'title': '环境作用',
                submenus:[
                    {kind:'item', title: '趋势'},
                    {kind:'item', title: '措施'}
                ]
            },
            {
                'kind' : 'submenu',
                'title': '几何位移',
                submenus:[
                    {kind:'item', title: '趋势'},
                    {kind:'item', title: '措施'}
                ]
            },
            {
                'kind' : 'submenu',
                'title': '力学状态',
                submenus:[
                    {kind:'item', title: '趋势'},
                    {kind:'item', title: '措施'}
                ]
            },
            {
                'kind' : 'submenu',
                'title': '合拢参数',
                submenus:[
                    {kind:'item', title: '趋势'},
                    {kind:'item', title: '措施'},
                ]
            },
            {
                'kind' : 'submenu',
                'title': '施工设备',
                submenus:[
                    {kind:'item', title: '趋势'},
                    {kind:'item', title: '措施'},
                ]
            }
        ]
    }
]


class OperateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerHeight: 500,
            showModel: false,
            drawerVisible: false,
            menuSelect: [false, false, false, false],
            loadModels:[]
        }
    }
    initMenusItems = (menus, menukey) => {
        let menu = (
            <Menu onClick={this.handleMenuClick}
                  theme="dark"
                  mode="inline"
                  inlineIndent={20}
                  onMouseLeave={() => this.menuClick(menukey, true, false)}
                  style={style.menuStyle}>
                {
                    menus.map(function(item, index){
                        if(item.kind == 'submenu'){
                            let subMenu = (
                                <SubMenu key={menukey + index}  title={'• ' + item.title} >
                                    {
                                        item.submenus.map(function(itemInner, indexInner){
                                            if(itemInner.kind == 'submenu'){
                                                let subSubMenu = (
                                                    <SubMenu key={menukey + index + indexInner}  title={'• ' + itemInner.title} style={style.menuStyle}>
                                                        {
                                                            itemInner.submenus.map(function(itemInner2, indexInner2){
                                                                let itemMenu = (
                                                                        <Menu.Item key={menukey  + '-' + index  + '-' + indexInner  + '-' + indexInner2} style={style.menuStyle}>
                                                                            <Tooltip title={itemInner2}  color={"#2db7f5"} mouseEnterDelay={1}>
                                                                            {itemInner2}
                                                                            </Tooltip>
                                                                        </Menu.Item>
                                                                )
                                                                return itemMenu
                                                            })
                                                        }
                                                    </SubMenu>
                                                )
                                                return subSubMenu
                                            }else{
                                                let itemMenu = (
                                                    <Menu.Item key={menukey  + '-' + index  + '-' + indexInner} style={style.menuStyle}>
                                                        <Tooltip title={itemInner.title} color={"#2db7f5"} mouseEnterDelay={1}>
                                                            {itemInner.title}
                                                        </Tooltip>
                                                    </Menu.Item>
                                                )
                                                return itemMenu
                                            }
                                        })
                                    }
                                </SubMenu>
                            )
                            return subMenu
                        }else{
                            let itemMenu = (
                                <Menu.Item key={menukey + '-' + index}  style={style.menuStyle}>
                                    <Tooltip title={item.title} color={"#2db7f5"} mouseEnterDelay={1}>
                                    {item.title}
                                    </Tooltip>
                                </Menu.Item>
                            )
                            return itemMenu
                        }
                    })
                }
            </Menu>
        )
        return menu;
    }

    initMenus = () => {
        const that = this;
        let items = (
            <>
            {
                menusConfig.map(function(item, index){
                    return (
                        <div className={"op-col-item-bg"} key={index}>
                            <div className={"op-col-item-container"}>
                                <div className={"op-col-item-row3"}>
                                    <Button type="primary"  icon={<SearchOutlined />} size={"small"}/>
                                    <Button type="default"  icon={<PicLeftOutlined />} size={"small"}/>
                                    <Button type="default"  icon={<BgColorsOutlined />} size={"small"}/>
                                </div>
                                <div className={"op-col-item-row2"}>
                                    <img src={"./images/sun.png"}/>
                                    <div>
                                        <b> 标题文字文字 </b>
                                        <b> 详细文字，详细 </b>
                                    </div>
                                </div>
                                <div style={that.state.menuSelect[index] ?  style.menuStyle : style.menuStyleHide }>
                                    {that.initMenusItems(item.menus, index)}
                                </div>
                                <div className={"op-col-item-row1"}
                                     onClick={() => that.menuClick(index, false, false)}>
                                    <a href={"##"}
                                       onMouseOver={() => that.menuClick(index, true, true)}>
                                        <CaretDownOutlined rotate={that.state.menuSelect[index] ? 0 : 180} />
                                        &nbsp; {item.subject}</a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </>
        )
       return items
    }

    menuClick = (kind, special, operate) => {
        var items = this.state.menuSelect;
        if (special == true){
            items[kind] = operate;
        }else{
            items[kind] = !items[kind];
        }
        this.setState({menuSelect : items})
    }

    showDrawer = () => {
        this.setState({
            drawerVisible: true,
        });
    };

    onClose = () => {
        this.setState({
            drawerVisible: false,
        });
    };

    handleMenuClick = e => {
        // console.log('click ', e.key);
        switch (e.key) {
            case '3-1':
                this.showDrawer()
                break;
            case '1-1-0-0' :
                this.loadThreeJsModel('http://engramimfiles.paralzone.com/0/Tower-1.obj', 'obj');
                break;
            case '1-1-0-1' :
                this.loadThreeJsModel('http://engramimfiles.paralzone.com/0/Tower-2.obj', 'obj');
                break;
            case '1-1-0-2' :
                this.loadThreeJsModel('http://engramimfiles.paralzone.com/0/Tower-3.obj', 'obj');
                break;
            default:
                message.info('点击的key: ' + e.key);

        }
    };

    onRef = (ref) => {
        this.showModels = ref
    }

    loadThreeJsModel = (path, kind) => {
        var arr = this.state.loadModels;
        if(arr.includes(path)){
            message.info('已经加载此模型');
        }else{
            arr.push(path)
            this.setState({
                loadModels: arr
            }, () => {
                this.showModels.loadModel(path,'obj')
            })
        }

    }

    componentDidMount(){
        let colHeight =  Math.floor(document.body.clientHeight);
        this.setState({
            containerHeight: colHeight,
            showModel: true
        })

    }

    render() {
        return (
            <div className={"op-container"}>
                {this.state.showModel ?
                    ( <ShowModels
                            onRef={this.onRef}
                            leftSlideWidth={0}
                            containerHeight = {this.state.containerHeight }
                            widthPercent = { 1.0 }
                            />
                    ) : null}
                <div className={"op-bottom-container"}>
                    {this.initMenus()}
                </div>


                <Drawer
                    title="Dash 图表"
                    placement={'left'}
                    closable={false}
                    width={800}
                    onClose={this.onClose}
                    visible={this.state.drawerVisible}
                    key={'dash-view'}
                    style={{overflow: 'auto',  position: 'fixed'}}>
                    {this.state.drawerVisible ?
                        (
                            <DashTableView />
                        ) : null}

                </Drawer>
            </div>

        );
    }
}

export default OperateView;
// 动画 https://motion.ant.design/api/animate-cn
