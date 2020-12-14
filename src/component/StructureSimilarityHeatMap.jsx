import React from "react";
import { scaleLinear } from "@vx/scale";
import "../css/StructureSimilarityHeatMap.css";
import HeatMapCircle from "./HeatMapCircle";

const leftHotLow = "#77312f";
const leftHotHigh = "#f33d15";
const rightHotLow = "#2F773B";
const rightHotHigh = "#1CF315";
// const selectedColor = "#FFFFFF";
export const background = "#28272c";

const leftCircleColorScale = scaleLinear({
    range: [leftHotLow, leftHotHigh],
    domain: [0, 1.0],
});
const rightCircleColorScale = scaleLinear({
    range: [rightHotLow, rightHotHigh],
    domain: [0, 1.0],
});
const opacityScale = scaleLinear({
    range: [0.5, 1.0],
    domain: [0, 1.0],
});

function min(data, value) {
    return Math.min(...data.map(value));
}

export function generateBin(data) {
    return data.reverse().map((row, row_idx) => {
        return {
            bin: row_idx,
            bins: row.map((col, col_idx) => {
                return { bin: col_idx, count: col };
            }),
        };
    });
}

const defaultMargin = { top: 10, left: 20, right: 20, bottom: 50 };

const StructureSimilarityHeatMap = ({
    width,
    height,
    leftData = [[]],
    rightData = [[]],
    events = false,
    margin = defaultMargin,
    separation = 20,
}) => {
    const _width = parseInt(width);
    const _height = parseInt(height);

    const heatMapWidth = leftData.length;
    const leftBins = generateBin(leftData);
    const rightBins = generateBin(rightData);

    // scales
    const xScale = scaleLinear({
        domain: [0, heatMapWidth],
    });
    const yScale = scaleLinear({
        domain: [0, heatMapWidth],
    });

    // bounds
    const size =
        _width > margin.left + margin.right
            ? _width - margin.left - margin.right - separation
            : _width;
    const xMax = size / 2;
    const yMax = _height - margin.bottom - margin.top;

    const binWidth = xMax / heatMapWidth;
    const binHeight = yMax / heatMapWidth;
    const radius = min([binWidth, binHeight], (d) => d) / 2;

    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

    return _width < 380 ? null : (
        <div className="heat-map-box">
            <svg width={_width} height={_height}>
                <rect x={0} y={0} width={_width} height={_height} rx={14} fill={background} />
                <HeatMapCircle
                    margin_top={margin.top}
                    margin_left={margin.left}
                    data={leftBins}
                    xScale={xScale}
                    yScale={yScale}
                    colorScale={leftCircleColorScale}
                    opacityScale={opacityScale}
                    radius={radius}
                />
                <HeatMapCircle
                    margin_top={margin.top}
                    margin_left={xMax + margin.left + separation}
                    data={rightBins}
                    xScale={xScale}
                    yScale={yScale}
                    colorScale={rightCircleColorScale}
                    opacityScale={opacityScale}
                    radius={radius}
                />
            </svg>
            <div className="heat-map-title heat-map-left">Structure Similarity</div>
            <div className="heat-map-title heat-map-right">Adjacency Matrix</div>
        </div>
    );
};

export default StructureSimilarityHeatMap;
