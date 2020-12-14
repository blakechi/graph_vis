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

        const fullWidth = window.innerWidth - 20;
        const smallGridWidth = Math.floor(fullWidth / 3);
        this.state = {
            layout: [
                { i: "scene", x: 0, y: 0, w: fullWidth, h: 8, static: true },
                {
                    i: "graph",
                    x: 0,
                    y: 8,
                    w: smallGridWidth,
                    h: 4,
                    minW: 2,
                    maxW: fullWidth,
                    minH: 2,
                    maxH: 6,
                },
                {
                    i: "heatmap",
                    x: 4,
                    y: 8,
                    w: smallGridWidth,
                    h: 4,
                    minW: 2,
                    maxW: fullWidth,
                    minH: 2,
                    maxH: 6,
                },
                {
                    i: "bar",
                    x: 8,
                    y: 8,
                    w: smallGridWidth,
                    h: 4,
                    minW: 2,
                    maxW: fullWidth,
                    minH: 2,
                    maxH: 6,
                },
                { i: "anchor", x: 0, y: 12, w: fullWidth, h: 0.01, static: true },
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
                    cols={window.innerWidth - 20}
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
                        />
                    </GridWrapper>
                    <GridWrapper key="bar">
                        <ClassificationBar graph={selectedGraph} />
                    </GridWrapper>
                    <GridWrapper key="anchor">
                        <div className="grid-anchor" />
                    </GridWrapper>
                </AutoWidthGridLayout>
            </React.Fragment>
        );
    }
}

export default Grid;
