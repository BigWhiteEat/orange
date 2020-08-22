import React, {Component} from 'react';
import { Progress } from 'antd';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

// import Stats from 'three/examples/jsm/libs/stats.module.js';
import './ShowModels.css';


//three.js
var container, stats, orbitControl, transformControl;
var camera, scene, renderer, globalModel;
var raycaster = new THREE.Raycaster();
//动画
var clock = new THREE.Clock();
var mixer;
//鼠标控制
var mouse = new THREE.Vector2(), INTERSECTED;
var isShowTools = false;
var isShouldResetSelectModel = true;
var isSelectModel = false;
var isPcNavi = true;
var domwidth = 500;
var domheight = 500;

class ShowModels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headHeight: 64,
            contentPadding: 30,
            showLoading: false,
            loadingPercent: 0,
            widthPercent: (this.props.widthPercent != null) ? this.props.widthPercent : 1,
            leftSlideWidth: (this.props.leftSlideWidth != null) ? this.props.leftSlideWidth : 0,
            containerHeight: (this.props.containerHeight != null) ? this.props.containerHeight : 300,
        };
    }
    /**
     * 移动端还是PC
     *
     * ***/
    browserRedirect = () => {
        var sUserAgent = navigator.userAgent.toLowerCase();
        if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
            isPcNavi = false;
        }
    }

    /**
     * threejs 场景
     * **/
    initContainer = () => {
        container = document.getElementById('canvas-frame')
    }

    initScene = () => {
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x161616);
        scene.fog = new THREE.Fog( 0x161616, 200, 1000 );
    }


    initCamera = () => {
        camera = new THREE.PerspectiveCamera( 45, domwidth / domheight, 1, 2000 );
        camera.position.set( 10, 10, 20 );
        camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
    }

    initLight =() => {
        var light = new THREE.SpotLight( 0xffffff, 1.5 );
        light.position.set( -500, 500, 500);
        light.angle = Math.PI / 9;

        light.castShadow = true;
        light.shadow.camera.near = 1000;
        light.shadow.camera.far = 4000;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        scene.add( light );

        var light2 = new THREE.DirectionalLight(0xffffff, 0.99);
        light2.position.set( 200, 200, 200 ).normalize();
        light2.castShadow = true;
        light2.shadow.camera.top = 180;
        light2.shadow.camera.bottom = - 100;
        light2.shadow.camera.left = - 120;
        light2.shadow.camera.right = 120;
        scene.add(light2);

        var light3 = new THREE.SpotLight( 0xffffff, 1.5 );
        light3.position.set( -500, -500, 500);
        light3.angle = Math.PI / 9;

        light3.castShadow = true;
        light3.shadow.camera.near = 1000;
        light3.shadow.camera.far = 4000;
        light3.shadow.mapSize.width = 1024;
        light3.shadow.mapSize.height = 1024;
        scene.add( light3 );
    }

    addGround = () => {
        // ground
        var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x161616, depthWrite: false } ) );
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add(mesh);

        var grid = new THREE.GridHelper( 500, 100, 0xffffff, 0xffffff);
        grid.material.opacity = 0.1;
        grid.material.transparent = true;
        scene.add(grid);

        // var axisHelper = new THREE.AxesHelper(100);
        // axisHelper.position.set( 0, 0, 0 );
        // scene.add(axisHelper);
    }


    initRenderer = () => {
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(domwidth, domheight);
        renderer.shadowMap.enabled = true;
        container.appendChild( renderer.domElement );
    }

    /*****
     *
     *
     * 模型的控制
     *
     * ***/

    ressetColor = (object) => {
        var materialObj  =  new THREE.MeshStandardMaterial({color:0xffffff, metalness: 0.9, roughness: 0.9});//new THREE.MeshNormalMaterial({flatShading: false});
        object.traverse(function(child){
            if(child instanceof THREE.Mesh){
                child.material = materialObj;
            }
        });
    }


    addSceneControllers = () =>  {
        orbitControl = new OrbitControls(camera, renderer.domElement );
        orbitControl.target.set( 0, 0, 0 );
        orbitControl.maxPolarAngle = Math.PI;//Math.PI / 2;
        orbitControl.update();
    }

    onContainerMouseMove = (event) =>  {
        event.preventDefault();
        isShouldResetSelectModel = false;
        if(event.changedTouches){
            mouse.x=(event.changedTouches[0].pageX/domwidth)*2-1;
            mouse.y=-(event.changedTouches[0].pageY/domheight)*2+1;
        }else{
            mouse.x=(event.clientX/window.innerWidth)*2-1;
            mouse.y=-(event.clientY/window.innerHeight)*2+1;
        }
        // mouse.x = event.clientX;
        // mouse.y = event.clientY;
        // console.log("onContainerMouseMove");
    }

    onContainerMouseDown = () => {
        isShouldResetSelectModel = true;
    }


    onContainerMouseUp = (event) =>  {
        event.preventDefault();
        this.chooseModel(event);
    }


    onWindowResize  = () =>{
        camera.aspect = domwidth / domheight;
        camera.updateProjectionMatrix();
        renderer.setSize(domwidth, domheight);
    }

    chooseModel = (event) => {
        console.log('aaaa = ' + isShouldResetSelectModel)
        // var mouse_x = (event.clientX / window.innerWidth) * 2 - 1;
        // var mouse_y = -(event.clientY / window.innerHeight) * 2 + 1;
        if(event.changedTouches){
            mouse.x=(event.changedTouches[0].pageX / domwidth)*2-1;
            mouse.y=-(event.changedTouches[0].pageY / domheight)*2+1;
        }else{
            mouse.x=(event.clientX/domwidth)*2-1;
            mouse.y=-(event.clientY/domheight)*2+1;
        }

        var vector = new THREE.Vector3(mouse.x, mouse.y, 0.8).unproject(camera);
        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

        //射线和模型求交，选中一系列直线
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(globalModel.children, true);
        if (isShouldResetSelectModel && isSelectModel){
            isSelectModel = false;
            this.ressetColor(globalModel);

            isShowTools = false;
            // hideTools();
        }
        if (intersects.length > 0) {
            var intersected = intersects[0].object;
            this.ressetColor(globalModel);
            if(intersected instanceof THREE.Mesh){
                intersected.material = new THREE.MeshStandardMaterial({color:0xf15656, metalness: 0.2, roughness: 0.9});
                isSelectModel = true;
            }
            // showPanels();
        }

    }

    animate = () =>{
        requestAnimationFrame(this.animate);
        var delta = clock.getDelta();
        if ( mixer ) mixer.update( delta );
        this.renderModel()
        // renderer.render( scene, camera );
        // stats.update();
    }

    renderModel = () => {
        renderer.render( scene, camera );
    }

    // addListener = () => {
    //     //scene 监听
    //     window.addEventListener( 'resize', this.onWindowResize, false );
    //     //下面三个电脑端有效 鼠标点击
    //     container.addEventListener('mousedown', this.onContainerMouseDown, false);
    //     container.addEventListener('mouseup', this.onContainerMouseUp, false);
    //     container.addEventListener('mousemove', this.onContainerMouseMove, false );
    //
    //     //手势
    //     container.addEventListener('touchstart',this.onContainerMouseDown);
    //     container.addEventListener('touchend',this.onContainerMouseUp);
    //     container.addEventListener('touchmove',this.onContainerMouseMove);
    // }

    /*****
     *
     * 模型的加载
     *
     * ***/
    loadFbxModel = (modelpath) => {
        // model
        let fbxLoader = new FBXLoader();
        fbxLoader.load( modelpath, function ( object ) {
            globalModel = object;
            this.processModel(object);
            this.modelTransformControllers(object);
        }, function (progress) {
            // console.log("模型读取进度： " + progress.loaded / progress.total * 100 + "%");
            this.loadingTips(progress.loaded / progress.total * 100)
        }, function (errors) {
            console.log("出错： " + errors);
            this.loadingTips(100)
        });
    }

    loadObjModel = (modelpath) => { //
        console.log("url = " + modelpath)
        let objLoader = new OBJLoader();
        objLoader.load(modelpath, (object) => {
            globalModel = object;
            this.processModel(object);
            this.modelTransformControllers(object);
        }, (progress) => {
            console.log("模型读取进度： " + progress.loaded / progress.total * 100 + "%");
            this.loadingTips(progress.loaded / progress.total * 100)
        }, (errors) => {
            console.log("出错： " + errors);
            this.loadingTips(100)
        })
    }

    loadMtlModel = (modelpath) => {
        let mtlLoader = new MTLLoader();
        mtlLoader.load(modelpath, (object) => {
            globalModel = object;
            this.processModel(object);
            this.modelTransformControllers(object);
        }, (progress) => {
            // console.log("模型读取进度： " + progress.loaded / progress.total * 100 + "%");
            this.loadingTips(progress.loaded / progress.total * 100)
        }, (errors) => {
            console.log("出错： " + errors);
            this.loadingTips(100)
        })

    }

    processModel = (object) => {
        //模型 旋转 尺寸 位置
        // object.rotation.x = 90 * Math.PI / 180;
        // object.scale.set( 0.1, 0.1, 0.1);
        // object.rotation.x = 3 * Math.PI / 2;
        object.rotation.x = 2 * Math.PI;
        object.scale.set( 0.00005, 0.00005, 0.00005);
        object.position.set( 0, 0, 0 );
        this.ressetColor(object);
        scene.add(object);
    }

    modelTransformControllers = (object) => {
        transformControl = new TransformControls(camera, renderer.domElement );
        transformControl.addEventListener('change', this.renderModel );
        transformControl.addEventListener('dragging-changed', function ( event ) {
            orbitControl.enabled = ! event.value;
        } );
        transformControl.attach(object);
        scene.add(transformControl);
    }


    loadingTips = (percent) => {
        let value = Math.floor(percent)
        this.setState({loadingPercent: value}, ()=> {
            if (percent >= 99.99){
                this.setState({showLoading: false})
            }
        })
    }

    loadModel = (path, kind) => {
        this.setState({showLoading: true, loadingPercent: 0}, () => {
            if(kind == 'obj'){
                this.loadObjModel(path);
            }
        })

    }

    initThreeJs = () => {
        this.browserRedirect();
        this.initContainer();
        this.initScene();
        this.initCamera();
        this.initLight();
        this.addGround();


        this.initRenderer();
        this.addSceneControllers();
        this.animate()

        // loadFbxModel();
        // loadObjModel();
        // loadMtlModel();
        //  stats
        // stats = new Stats();
        // container.appendChild(stats.dom);
    }


    /**
     * 开始Three
     *
     * @memberof ThreeBim
     */
    componentDidMount(){
        this.props.onRef(this)
        let leftSlideWidth = Math.floor((document.body.clientWidth - this.state.leftSlideWidth) / this.state.widthPercent) - 20;
        domwidth = leftSlideWidth;
        domheight = this.state.containerHeight - 10;
        this.initThreeJs();
        // this.loadModel('./models/Tower-1.obj', 'obj')

        // this.addListener();
        // this.initThree(leftSlideWidth, this.state.containerHeight - 10, );
    }


    render() {
        return (
            <div className={"show-container"}>
                <div
                    className={"model-bg"}
                     id={"canvas-frame"}
                     onMouseDown = {this.onContainerMouseDown}
                     onMouseMove = {this.onContainerMouseMove}
                     onMouseUp = {this.onContainerMouseUp}>
                </div>

                {this.state.showLoading ?
                    ( <div className={"loading-bg"} >
                        <Progress style={{width: 200}} showInfo={false} percent={this.state.loadingPercent} />
                        <h3>加载模型中</h3>
                    </div>) : null
                }

            </div>

        );
    }
}

export default ShowModels;
