import React, {Component} from 'react';
import { Map, Markers } from 'react-amap';

import "./OverView.css"
import PieChart from "./PieChart";

const randomMarker = (len) => (
    Array(len).fill(true).map((e, idx) => ({
        position: {
            longitude: 110 + Math.random() * 5,
            latitude: 22.3 + Math.random(),
        },
        myLabel: "",
        myIndex: idx + 1,
    }))
);
const style = {
    padding: '1px',
    backgroundColor: '#fff',
    width: '10px',
    height: '10px',
    borderRadius: '5px',
};

const mouseoverStyle = {
    padding: '1px',
    backgroundColor: '#fff',
    width: '20px',
    height: '20px',
    borderRadius: '10px',
}

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amapKey: "09d157f924ea1c7a939108b47b2b056b",
            containerHeight: (this.props.containerHeight != null) ? this.props.containerHeight : 300,
            useCluster: false,
            mapZoom: 8,
            mapCenter:{longitude: 114, latitude: 23},
            markers: randomMarker(80),
        }

        this.markerEvents = {
            mouseover:(e, marker) => {
                marker.render(this.renderMouseoverLayout);
            },
            mouseout: (e, marker) => {
                marker.render(this.renderMarkerLayout);
            }
        }

    }


    toggleCluster(){
        this.setState({
            useCluster: !this.state.useCluster,
        })
    }

    renderMouseoverLayout(extData){
        if (extData.myIndex === 3){
            return false;
        }
        return <div style={mouseoverStyle}>{extData.myLabel}</div>
    }

    renderMarkerLayout(extData){
        if (extData.myIndex === 3){
            return false;
        }
        return <div style={style}>{extData.myLabel}</div>
    }

    render() {
        return (
            <div className={"overview-container"} style={{height: this.props.containerHeight * 3}}>
                <div className={"map-view"}>
                    <Map amapkey={this.state.amapKey} center={this.state.mapCenter} zoom={this.state.mapZoom} mapStyle={"dark"}>
                        <Markers
                            events={this.markerEvents}
                            markers={this.state.markers}
                            useCluster={this.state.useCluster}
                            render={this.renderMarkerLayout}
                        />
                    </Map>
                </div>

                <div className={"over-table-view"}>
                    <div className={"over-col-items"}>
                        <PieChart containerId={'pie-area-container'} containerHeight={this.props.containerHeight * 1.5}/>
                    </div>
                    <p>Numbers Of Bridges: &nbsp;&nbsp;&nbsp;<b>11054</b>
                        <br/>Total Bridge Deck Area: &nbsp;&nbsp;&nbsp;<b>68307925</b>
                        <br/>Structurally Deficient Deck Area: &nbsp;&nbsp;&nbsp;<b>66144416</b>
                    </p>
                </div>
            </div>
        );
    }
}

export default Overview;

//地图组件y
// https://elemefe.github.io/react-amap/articles/start
