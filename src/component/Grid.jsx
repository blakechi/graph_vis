import React, { Component } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import "../css/Grid.css";

import GridWrapper from "./GridWrapper";
import Scene from "./Scene";
import FlatGraphPlot from "./FlatGraphPlot";
import StructureSimilarityHeatMap from "./StructureSimilarityHeatMap";
import ClassificationBar from "./ClassificationBar";

const AutoWidthGridLayout = WidthProvider(GridLayout);

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            layout: [
                { i: "scene", x: 0, y: 0, w: 1260, h: 8, static: true },
                { i: "graph", x: 0, y: 8, w: 420, h: 4, minW: 2, maxW: 1260, minH: 2, maxH: 6 },
                { i: "heatmap", x: 4, y: 8, w: 420, h: 4, minW: 2, maxW: 1260, minH: 2, maxH: 6 },
                { i: "cluster", x: 8, y: 8, w: 420, h: 4, minW: 2, maxW: 1260, minH: 2, maxH: 6 },
            ],
            // structSimilarityBin: generateBin(selectedGraph.struct_simialrity),
            // adjacencyMatrixBin: generateBin(selectedGraph.adjacency_matrix),
        };
    }

    // handleHeatMapHover = ({ target }) => {
    //     const idx_text = target.attributes.value.nodeValue.toString();
    //     const indice = idx_text.split("-").map((ele) => parseInt(ele));

    //     const { structSimilarityBin, adjacencyMatrixBin } = this.state;

    //     structSimilarityBin[indice[0]][indice[1]].selected = true;
    //     adjacencyMatrixBin[indice[0]][indice[1]].selected = true;
    //     this.setState({ structSimilarityBin, adjacencyMatrixBin });
    // };

    render() {
        const { graphKeys, selectedGraphKey, selectedGraph, onChangeGraphSelector } = this.props;
        const { layout } = this.state;

        return (
            <React.Fragment>
                <AutoWidthGridLayout
                    className="layout"
                    layout={layout}
                    cols={1260}
                    rowHeight={50}
                    compactType={"horizontal"}
                    verticalCompact={true}
                >
                    <GridWrapper key="scene">
                        <Scene
                            selectedGraphKey={selectedGraphKey}
                            selectedGraph={selectedGraph}
                            options={graphKeys}
                            onChange={onChangeGraphSelector}
                        />
                    </GridWrapper>
                    <GridWrapper key="graph">
                        <FlatGraphPlot graph={selectedGraph} />
                    </GridWrapper>
                    <GridWrapper key="heatmap">
                        <StructureSimilarityHeatMap
                            leftData={selectedGraph.struct_similarity}
                            rightData={selectedGraph.adjacency_matrix}
                            onHover={() => {}}
                        />
                    </GridWrapper>
                    <GridWrapper key="cluster">
                        <ClassificationBar graph={selectedGraph} />
                    </GridWrapper>
                </AutoWidthGridLayout>
            </React.Fragment>
        );
    }
}

export default Grid;
