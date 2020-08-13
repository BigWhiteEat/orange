import React, {Component} from 'react';
import "./Weather.css"

class Weather extends Component {
    render() {
        return (
            <>
                <div className={"content-bg"}>
                    <img src={"./images/sun.png"}/>
                    <div>
                        <b>7℃ | 0℃</b>
                        <b>wind: NW at 10m/s</b>
                        <b>humidity: 29%</b>
                    </div>
                </div>
            </>
        );
    }
}

export default Weather;
