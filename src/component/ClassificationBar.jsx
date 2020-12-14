import React from "react";
import { Group } from "@vx/group";
import { BarGroup } from "@vx/shape";
import { AxisBottom } from "@vx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import ClassificationBarLegend from "./ClassificationBarLegend";

const blue = "#aeeef8";
const green = "#e5fd3d";
const purple = "#9caff6";
const barColor = [blue, green, purple];
export const background = "#28272c";

const defaultMargin = { top: 70, right: 20, bottom: 40, left: 0 };
const keys = ["label", "y_hat", "y_logit"];
const formatGraphClass = (graphClass) => "0" + graphClass;

// accessors
const getGraphClass = (d) => d.graphClass;

// scales
const yScale = scaleLinear({
    domain: [0, 1.0],
});
const x1Scale = scaleBand({
    domain: keys,
    padding: 0.1,
});
const colorScale = scaleOrdinal({
    domain: keys,
    range: barColor,
});

function generateBarData(graph) {
    return graph.y_hat.map((ele, idx) => {
        return {
            graphClass: idx,
            label: graph.y === idx ? 1 : 0,
            y_hat: ele,
            y_logit: graph.y_logit[idx],
        };
    });
}

export default function ClassificationBar({
    width,
    height,
    graph,
    events = false,
    margin = defaultMargin,
}) {
    const _width = parseInt(width);
    const _height = parseInt(height);

    const data = generateBarData(graph);

    const x0Scale = scaleBand({
        domain: data.map(getGraphClass),
        padding: 0.2,
    });

    const xMax = _width - margin.left - margin.right;
    const yMax = _height - margin.top - margin.bottom;

    // update scale output dimensions
    x0Scale.rangeRound([0, xMax]);
    x1Scale.rangeRound([0, x0Scale.bandwidth()]);
    yScale.range([yMax, 0]);

    return _width < 10 ? null : (
        <React.Fragment>
            <ClassificationBarLegend label={keys} color={barColor} />
            <svg width={_width} height={_height}>
                <rect x={0} y={0} width={_width} height={_height} fill={background} rx={14} />
                <Group top={margin.top} left={margin.left}>
                    <BarGroup
                        data={data}
                        keys={keys}
                        height={yMax}
                        x0={getGraphClass}
                        x0Scale={x0Scale}
                        x1Scale={x1Scale}
                        yScale={yScale}
                        color={colorScale}
                    >
                        {(barGroups) =>
                            barGroups.map((barGroup) => (
                                <Group
                                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                                    left={barGroup.x0}
                                >
                                    {barGroup.bars.map((bar) => (
                                        <rect
                                            key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                                            x={bar.x}
                                            y={bar.y}
                                            width={bar.width}
                                            height={bar.height}
                                            fill={bar.color}
                                            rx={4}
                                            onClick={() => {
                                                if (!events) return;
                                                const { key, value } = bar;
                                                alert(JSON.stringify({ key, value }));
                                            }}
                                        />
                                    ))}
                                </Group>
                            ))
                        }
                    </BarGroup>
                </Group>
                <AxisBottom
                    top={yMax + margin.top}
                    tickFormat={formatGraphClass}
                    scale={x0Scale}
                    stroke={green}
                    tickStroke={green}
                    hideAxisLine
                    tickLabelProps={() => ({
                        fill: green,
                        fontSize: 11,
                        textAnchor: "middle",
                    })}
                />
            </svg>
        </React.Fragment>
    );
}
