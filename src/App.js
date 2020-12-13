import React, { Component } from "react";
import "./App.css";
import Grid from "./Grid";
import Graphs from "./data/ENZYMES_details.json";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedGraphKey: "train_1",
        };
    }

    onChangeGraphSelector = ({ currentTarget }) => {
        this.setState({ selectedGraphKey: currentTarget.value });
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
