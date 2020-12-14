import React, { Component } from "react";
import "./css/App.css";
import Grid from "./component/Grid";
import Graphs from "./data/ENZYMES_details.json";

class App extends Component {
    constructor(props) {
        super(props);

        const defaultGraphKey = "train_1";
        this.state = {
            selectedGraphKey: defaultGraphKey,
        };
    }

    onChangeGraphSelector = ({ currentTarget }) => {
        const selectedGraphKey = currentTarget.value;
        this.setState({
            selectedGraphKey: selectedGraphKey,
        });
    };

    render() {
        const { selectedGraphKey } = this.state;
        return (
            <div className="App">
                <Grid
                    graphKeys={Object.keys(Graphs)}
                    selectedGraphKey={selectedGraphKey}
                    selectedGraph={Graphs[selectedGraphKey]}
                    onChangeGraphSelector={this.onChangeGraphSelector}
                />
            </div>
        );
    }
}

export default App;
