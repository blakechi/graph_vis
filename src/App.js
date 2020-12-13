import React, { Component } from "react";
import "./App.css";
import Grid from "./Grid";
import Graphs from "./data/ENZYMES_details.json";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedKey: "train_1",
        };
    }

    onChangeGraphSelector = ({ currentTarget }) => {
        console.log(currentTarget.value);
        this.setState({ selectedKey: currentTarget.value });
    };

    render() {
        const { selectedKey } = this.state;
        return (
            <div className="App">
                <Grid
                    graphKeys={Object.keys(Graphs)}
                    selectedGraph={Graphs[selectedKey]}
                    onChangeGraphSelector={this.onChangeGraphSelector}
                />
            </div>
        );
    }
}

export default App;
