import React, {Component} from 'react';
import './DashTableView.css'
class DashTableView extends Component {
    render() {
        return (
            <div className={"dash-container"}>
                <iframe src="http://localhost:8050" />
            </div>
        );
    }
}

export default DashTableView;
