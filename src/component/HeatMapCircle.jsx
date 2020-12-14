import { Group } from "@vx/group";
import { HeatmapCircle } from "@vx/heatmap";

const HeatMapCircle = ({
    margin_top,
    margin_left,
    data,
    xScale,
    yScale,
    colorScale,
    opacityScale,
    radius,
    events = false,
}) => {
    return (
        <Group top={margin_top} left={margin_left}>
            <HeatmapCircle
                data={data}
                xScale={(d) => xScale(d) ?? 0}
                yScale={(d) => yScale(d) ?? 0}
                colorScale={colorScale}
                opacityScale={opacityScale}
                radius={radius}
                gap={2}
            >
                {(heatmap) =>
                    heatmap.map((heatmapBins) =>
                        heatmapBins.map((bin) => (
                            <circle
                                className="vx-heatmap-circle"
                                key={`heatmap-circle-${bin.row}-${bin.column}`}
                                value={`${bin.row}-${bin.column}`}
                                cx={bin.cx}
                                cy={bin.cy}
                                r={radius}
                                fill={bin.color}
                                fillOpacity={bin.opacity}
                                onClick={(e) => {
                                    if (!e) return;
                                    const { row, column } = bin;
                                    alert(JSON.stringify({ row, column, value: bin.bin.count }));
                                }}
                            />
                        ))
                    )
                }
            </HeatmapCircle>
        </Group>
    );
};

export default HeatMapCircle;
