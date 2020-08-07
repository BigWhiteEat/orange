import React, {Component} from 'react';
import './ToolBox.css';

class ToolBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowTools: true
        };
    }

    // initJquery = (that) =>{
    //     ////******tool 点击事件
    //     $('.tools_main_click').on('click',function(){
    //         var idval = $(that).attr("id");
    //
    //         $("#tools_sub_button1").hide();
    //         $("#tools_sub_button2").hide();
    //         $("#tools_sub_button3").hide();
    //         $("#tools_sub_button4").hide();
    //         $("#tools_sub_button5").hide();
    //
    //         $("#tools_sub_button1").show(200);
    //         $("#tools_sub_button2").show(250);
    //         $("#tools_sub_button3").show(300);
    //         $("#tools_sub_button4").show(350);
    //         $("#tools_sub_button5").show(400);
    //     });
    //
    //     function showPanels(){
    //         if (this.state.isShowTools == false) {
    //             // isShowTools = true;
    //             showTools();
    //         }
    //     }
    //     function showTools() {
    //         var tools_div = document.getElementById('tools_div');
    //         $("#tools_div").fadeIn(200);
    //         // if(isPcNavi){ //电脑浏览器 tool右上角
    //         //     //window.event代表事件状态，如事件发生的元素，键盘状态，鼠标位置和鼠标按钮状.
    //         //     //clientX是鼠标指针位置相对于窗口客户区域的 x 坐标，其中客户区域不包括窗口自身的控件和滚动条。
    //         //     tools_div.style.display="block";
    //         //     tools_div.style.left = window.innerWidth - 230 + "px";//mouse.x - 100 + "px"; //鼠标目前在X轴上的位置，加10是为了向右边移动10个px方便看到内容
    //         //     tools_div.style.top = 10 + "px"; //mouse.y - 200 +"px";
    //         //     tools_div.style.position="absolute"; //必须指定这个属性，否则div3层无法跟着鼠标动
    //         // }else{
    //         //     tools_div.style.display="block";
    //         //     tools_div.style.left = window.innerWidth / 2 - 80 + "px";//mouse.x - 100 + "px"; //鼠标目前在X轴上的位置，加10是为了向右边移动10个px方便看到内容
    //         //     tools_div.style.top = window.innerHeight - 220 + "px"; //mouse.y - 200 +"px";
    //         //     tools_div.style.position="absolute"; //必须指定这个属性，否则div3层无法跟着鼠标动
    //         // }
    //     }
    //
    //     function hideTools() {
    //         // var tools_div = document.getElementById('tools_div');
    //         // tools_div.style.display="none";
    //         $("#tools_div").fadeOut(100);
    //         $("#tools_sub_button1").fadeOut(100);
    //         $("#tools_sub_button2").fadeOut(100);
    //         $("#tools_sub_button3").fadeOut(100);
    //         $("#tools_sub_button4").fadeOut(100);
    //         $("#tools_sub_button5").fadeOut(100);
    //     }
    //
    // }
    //
    // componentDidMount(){
    //     this.initJquery(this);
    // }


    render() {
        return (
            <div className="tools_div">
                <div className="tools_main">
                    <input type="image" src="./images/toolBtn1.png" id="tools_button1"
                           className="tools_main_click"/>
                    <input type="image" src="images/toolBtn2.png" id="tools_button2"
                           className="tools_main_click" />
                    <input type="image" src="/images/toolBtn3.png" id="tools_button3"
                           className="tools_main_click" />
                    <input type="image" src="/images/toolBtn4.png" id="tools_button4"
                           className="tools_main_click" />
                    <input type="image" src="/images/toolBtn5.png" id="tools_button5"
                           className="tools_main_click" />
                    <input type="image" src="/images/toolBtn6.png" id="tools_button6"
                           className="tools_main_click" />
                </div>

                <button id="tools_sub_button1"></button>
                <button id="tools_sub_button2"></button>
                <button id="tools_sub_button3"></button>
                <button id="tools_sub_button4"></button>
                <button id="tools_sub_button5"></button>

                <div id="tools_title">
                    <label id="tools_title_b">TOOLS</label>
                </div>
            </div>
        );
    }
}

export default ToolBox;
