import React from "react";
import { Graph, DefaultLink } from "@vx/network";
// import Graph from "./vx_network/Graph";
import brewNetworkInput from "./vx_network/brewNetworkInput";

class NetworkNode extends React.Component {
    render() {
        return <circle r={5} fill={"#FFFFFF"} />;
    }
}

const FlatGraphPlot = ({ graph, width, height }) => {
    return (
        <svg style={{ width: "100%", height: "100%" }}>
            <Graph
                graph={brewNetworkInput(graph, width, height)}
                linkComponent={DefaultLink}
                nodeComponent={NetworkNode}
            />
        </svg>
    );
};

export default FlatGraphPlot;
