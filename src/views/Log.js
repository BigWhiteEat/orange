import React, {Component} from 'react';
import { Input , Button} from 'antd';
import {Link} from 'react-router-dom'

import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import "./Log.css"

class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginFlag:false
        };
        this.login = this.login.bind(this);
    }

    login() {
        console.log("jjjj")
        // this.props.history.push('./App')
    }

    render() {
        return (
            <div className={"log-container"}>
                <div className={"log-bg"}>
                    <div className="login" >
                        <img src={"logo192.png"}/>
                        <b>桥梁运营养护数字化平台</b>
                        <br/>
                    </div>
                    <br />
                    <Input className={"account"} size="large" placeholder="用户名" prefix={<UserOutlined />} />
                    <Input className={"pwd"}  size="large" placeholder="密码" prefix={<KeyOutlined  />} />

                    <Link to={"/Main"}>
                        <Button size={"large"} type="primary" block>
                            登录
                        </Button>
                    </Link>

                </div>

            </div>
        );
    }
}
export default Log;
