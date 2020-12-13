import React from "react";
import { Graph, DefaultLink } from "@vx/network";
// import Graph from "./vx_network/Graph";
import brewNetworkInput from "./vx_network/brewNetworkInput";

class NetworkNode extends React.Component {
    render() {
        return <circle r={5} fill={"#9280FF"} />;
    }
}

const FlatGraphPlot = (props) => {
    const { graph, width, height } = props;
    return (
        <svg>
            <Graph
                graph={brewNetworkInput(graph, width, height)}
                linkComponent={DefaultLink}
                nodeComponent={NetworkNode}
            />
        </svg>
    );
};

export default FlatGraphPlot;
