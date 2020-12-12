import { DefaultLink, DefaultNode } from "@vx/network";
import Graph from "./vx_network/Graph";
import brewNetworkInput from "./vx_network/brewNetworkInput";

const FlatGraphPlot = ({ graph = [], node_colors = [] }) => {
    const node_components = node_colors.map((color) => DefaultNode({ fill: color }));
    return (
        <Graph
            graph={brewNetworkInput(graph)}
            linkComponent={DefaultLink}
            nodeComponent={node_components}
        />
    );
};

export default FlatGraphPlot;
