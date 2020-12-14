import React from "react";
import { format } from "d3-format";
import { scaleLinear } from "@vx/scale";
import { LegendLinear, LegendItem, LegendLabel } from "@vx/legend";
import "../css/Legend.css";

const oneDecimalFormat = format(".1f");
const legendGlyphSize = 15;
const linearScale = scaleLinear({
    domain: [0, 1.0],
    range: ["#FF7D00", "#FF0000"],
});

export default function SceneLegend({ events = false }) {
    return (
        <div className="legend-position">
            <LegendBox title="Attention">
                <LegendLinear
                    scale={linearScale}
                    labelFormat={(d, i) => (i % 2 === 0 ? oneDecimalFormat(d) : "")}
                >
                    {(labels) =>
                        labels.map((label, i) => (
                            <LegendItem
                                key={`legend-quantile-${i}`}
                                onClick={() => {
                                    if (events) alert(`clicked: ${JSON.stringify(label)}`);
                                }}
                            >
                                <svg
                                    width={legendGlyphSize}
                                    height={legendGlyphSize}
                                    style={{ margin: "2px 0" }}
                                >
                                    <circle
                                        fill={label.value}
                                        r={legendGlyphSize / 2}
                                        cx={legendGlyphSize / 2}
                                        cy={legendGlyphSize / 2}
                                    />
                                </svg>
                                <LegendLabel align="left" margin="0 4px">
                                    {label.text}
                                </LegendLabel>
                            </LegendItem>
                        ))
                    }
                </LegendLinear>
            </LegendBox>
        </div>
    );
}

function LegendBox({ title, children }) {
    return (
        <div className="legend-box">
            <div className="title">{title}</div>
            {children}
        </div>
    );
}
