import React, {Component} from 'react';

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
var camera, scene, renderer, globalModel, light;
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

class ShowModels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headHeight: 64,
            contentPadding: 30,
            leftSlideWidth: this.props.leftSlideWidth,
            leftOffset:  this.props.leftSlideWidth
        };
    }
    initThree = (domwidth, domheight) =>{
        init();
        animate();
        /**
         * 移动端还是PC
         *
         * ***/
        function browserRedirect() {
            var sUserAgent = navigator.userAgent.toLowerCase();
            if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
                isPcNavi = false;
            }
        }

        /**
         * threejs 场景
         * **/
        function initContanier() {
            container = document.getElementById('canvas-frame')
            // container = document.createElement( 'div' );
            // container.setAttribute('id','model_canvas');
            // container.setAttribute('width','100%');
            // container.setAttribute('height','100%');

            // document.getElementById('canvas-frame').appendChild(container);
        }

        function initScene() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xfafafa);
            scene.fog = new THREE.Fog( 0xffffff, 200, 1000 );
        }


        function initCamera() {
            camera = new THREE.PerspectiveCamera( 45, domwidth / domheight, 1, 2000 );
            camera.position.set( 10, 10, 20 );
            camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
        }

        function initLight() {
            light = new THREE.SpotLight( 0x999999, 1.5 );
            light.position.set( -500, 500, 500);
            light.angle = Math.PI / 9;

            light.castShadow = true;
            light.shadow.camera.near = 1000;
            light.shadow.camera.far = 4000;
            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;
            scene.add( light );

            light = new THREE.DirectionalLight(0x999999, 0.99);
            light.position.set( 200, 200, 200 ).normalize();
            light.castShadow = true;
            light.shadow.camera.top = 180;
            light.shadow.camera.bottom = - 100;
            light.shadow.camera.left = - 120;
            light.shadow.camera.right = 120;
            scene.add(light);
        }

        function addGround() {
            // ground
            var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0xffffff, depthWrite: false } ) );
            mesh.rotation.x = - Math.PI / 2;
            mesh.receiveShadow = true;
            scene.add(mesh);

            var grid = new THREE.GridHelper( 500, 100, 0x000000, 0x000000 );
            grid.material.opacity = 0.5;
            grid.material.transparent = true;
            scene.add(grid);

            // var axisHelper = new THREE.AxesHelper(100);
            // axisHelper.position.set( 0, 0, 0 );
            // scene.add(axisHelper);
        }
        /*****
         *
         * 模型的加载
         *
         * ***/
        function loadFbxModel() {
            // model
            let loader = new FBXLoader();
            loader.load( '/fbx/tower.fbx', function ( object ) {
                globalModel = object;
                processModel(object);
                modelTransformControllers(object);
                // console.log("%j", object);
            }, function (progress) {
                console.log("模型读取进度： " + progress.loaded / progress.total * 100 + "%");
            }, function (errors) {
                console.log("出错： " + errors);
            });
        }

        function  loadObjModel() {
            let loader = new OBJLoader();
            loader.load('/fbx/tatara-tower.obj', (object) => {
                globalModel = object;
                processModel(object);
                 modelTransformControllers(object);
            }, (progress) => {
                console.log("模型读取进度： " + progress.loaded / progress.total * 100 + "%");
            }, (errors) => {
                console.log("出错： " + errors);
            })
        }

        function loadMtlModel() {
            let loader = new MTLLoader();
            loader.load('/fbx/tatara-tower.mtl', (object) => {
                globalModel = object;
                processModel(object);
                modelTransformControllers(object);
            }, (progress) => {
                console.log("模型读取进度： " + progress.loaded / progress.total * 100 + "%");
            }, (errors) => {
                console.log("出错： " + errors);
            })

        }

        function processModel(object) {
            //模型 旋转 尺寸 位置
            object.rotation.x = 90 * Math.PI / 180;
            object.scale.set( 0.1, 0.1, 0.1);
            object.position.set( 0, 0, 0 );
            ressetColor(object);

            scene.add(object);
        }



        function initRenderer() {
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

        function ressetColor(object){
            var materialObj  =  new THREE.MeshStandardMaterial({color:0x666666, metalness: 0.1, roughness: 0.9});//new THREE.MeshNormalMaterial({flatShading: false});
            object.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    child.material = materialObj;
                }
            });
        }


        function modelTransformControllers(object) {
            transformControl = new TransformControls(camera, renderer.domElement );
            transformControl.addEventListener('change', render );
            transformControl.addEventListener('dragging-changed', function ( event ) {
                orbitControl.enabled = ! event.value;
            } );
            transformControl.attach(object);
            scene.add(transformControl);
        }

        function addSceneControllers() {
            orbitControl = new OrbitControls(camera, renderer.domElement );
            orbitControl.target.set( 0, 0, 0 );
            orbitControl.maxPolarAngle = Math.PI / 2;
            orbitControl.update();
        }

        function onContainerMouseMove( event ) {
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

        function onContainerMouseDown() {
            isShouldResetSelectModel = true;
        }


        function onContainerMouseUp(event) {
            event.preventDefault();
            chooseModel(event);
        }


        function onWindowResize() {
            camera.aspect = domwidth / domheight;
            camera.updateProjectionMatrix();
            renderer.setSize(domwidth, domheight);
        }

        function chooseModel(event) {
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
                ressetColor(globalModel);

                isShowTools = false;
                // hideTools();
            }
            if (intersects.length > 0) {
                var intersected = intersects[0].object;
                // console.table("选中模型 %j", intersected);
                ressetColor(globalModel);
                if(intersected instanceof THREE.Mesh){
                    intersected.material = new THREE.MeshStandardMaterial({color:0xf15656, metalness: 0.2, roughness: 0.9});
                    isSelectModel = true;
                }
                // showPanels();
            }

        }

        function animate() {
            // requestAnimationFrame( animate );
            // var delta = clock.getDelta();
            // if ( mixer ) mixer.update( delta );
            // renderer.render( scene, camera );
            // stats.update();
        }

        function render() {
            renderer.render( scene, camera );
        }

        function addListener() {
            // //scene 监听
            // window.addEventListener( 'resize', onWindowResize, false );
            // //下面三个电脑端有效 鼠标点击
            // container.addEventListener('mousedown', onContainerMouseDown, false);
            // container.addEventListener('mouseup', onContainerMouseUp, false);
            // container.addEventListener('mousemove', onContainerMouseMove, false );
            //
            // //手势
            // container.addEventListener('touchstart',onContainerMouseDown);
            // container.addEventListener('touchend',onContainerMouseUp);
            // container.addEventListener('touchmove',onContainerMouseMove);
        }

        function init() {
            browserRedirect();
            initContanier();
            initScene();
            initCamera();

            initLight();
            addGround();
            loadFbxModel();
            // loadObjModel();
            // loadMtlModel();
            initRenderer();

            // addSceneControllers();
            // addListener();

            //  stats
            // stats = new Stats();
            // container.appendChild(stats.dom);
        }

    }

    /**
     * 开始Three
     *
     * @memberof ThreeBim
     */
    componentDidMount(){
        console.log("1 leftSlideWidth =  " + this.state.leftOffset)
        let renderWidth =  window.innerWidth - this.state.leftOffset - this.state.contentPadding
        let renderHeight =  300;//window.innerHeight - this.state.headHeight - this.state.contentPadding
        this.initThree(renderWidth, renderHeight);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ leftOffset: this.props.leftSlideWidth}, ()=>{
            // console.log("leftSlideWidth =  " + this.state.leftOffset)
            let renderWidth =  window.innerWidth - (320 - this.state.leftOffset) - this.state.contentPadding
            let renderHeight =  300;//window.innerHeight - this.state.headHeight - this.state.contentPadding

            camera.aspect = renderWidth / renderHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(renderWidth, renderHeight);
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.render( scene, camera );
        });
    }

    render() {
        return (
            <div className={"model-bg"} id={"canvas-frame"}>
            </div>
        );
    }
}

export default ShowModels;
