import React, { Component } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import "./Grid.css";
import MyResponsiveNetwork from "./nivoNetwork";
import NetworkData from "./data/network.json";
import Scene from "./Scene";
import GridWrapper from "./GridWrapper";
import FlatGraphPlot from "./FlatGraphPlot";
import GraphSelector from "./GraphSelector";

const AutoWidthGridLayout = WidthProvider(GridLayout);

class Grid extends Component {
    state = {
        list_1: [0, 1, 2],
        list_2: [0, 1],
        toggle: true,
        layout: [
            { i: "scene", x: 0, y: 0, w: 1260, h: 8, static: true },
            { i: "b", x: 0, y: 8, w: 420, h: 4, minW: 2, maxW: 1260, minH: 2, maxH: 6 },
            { i: "c", x: 4, y: 8, w: 420, h: 4, minW: 2, maxW: 1260, minH: 2, maxH: 6 },
            { i: "d", x: 8, y: 8, w: 420, h: 4, minW: 2, maxW: 1260, minH: 2, maxH: 6 },
        ],
    };

    render() {
        const { layout } = this.state;
        const { graphKeys, selectedGraph, onClickGraphSelector } = this.props;
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
                            toggle={this.state.toggle}
                            cubeList={this.state.toggle ? this.state.list_1 : this.state.list_2}
                        />
                    </GridWrapper>
                    <GridWrapper key="graph">
                        <FlatGraphPlot graph={selectedGraph} />
                    </GridWrapper>
                    <GridWrapper key="cluster">
                        <MyResponsiveNetwork data={NetworkData} />
                    </GridWrapper>
                    <GridWrapper key="selector">
                        <GraphSelector graphKeys={graphKeys} onclick={onClickGraphSelector} />
                    </GridWrapper>
                </AutoWidthGridLayout>
                <button
                    onClick={() => {
                        this.setState({ toggle: !this.state.toggle });
                    }}
                >
                    Here
                </button>
            </React.Fragment>
        );
    }
}

export default Grid;
