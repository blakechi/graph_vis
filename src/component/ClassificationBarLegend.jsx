import React from "react";
import { scaleOrdinal } from "@vx/scale";
import { LegendItem, LegendLabel, LegendOrdinal } from "@vx/legend";
import "../css/Legend.css";

const legendGlyphSize = 15;

export default function ClassificationBarLegend({ label, color, events = false }) {
    const ordinalColorScale = scaleOrdinal({
        domain: label,
        range: color,
    });

    return (
        <div className="legend-position">
            <LegendBox title={null}>
                <LegendOrdinal
                    scale={ordinalColorScale}
                    labelFormat={(label) => `${label.toUpperCase()}`}
                >
                    {(labels) => (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            {labels.map((label, i) => (
                                <LegendItem
                                    key={`legend-quantile-${i}`}
                                    margin="0 5px"
                                    onClick={() => {
                                        if (events) alert(`clicked: ${JSON.stringify(label)}`);
                                    }}
                                >
                                    <svg width={legendGlyphSize} height={legendGlyphSize}>
                                        <rect
                                            fill={label.value}
                                            width={legendGlyphSize}
                                            height={legendGlyphSize}
                                        />
                                    </svg>
                                    <LegendLabel align="left" margin="0 0 0 4px">
                                        {label.text}
                                    </LegendLabel>
                                </LegendItem>
                            ))}
                        </div>
                    )}
                </LegendOrdinal>
            </LegendBox>
        </div>
    );
}

function LegendBox({ title, children }) {
    return (
        <div className="legend-box">
            <div className="title-close">{title}</div>
            {children}
        </div>
    );
}
