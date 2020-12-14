import React from "react";
import cx from "classnames";
import { Group } from "@vx/group";

import DefaultNode from "@vx/network/lib/DefaultNode";

export default function Nodes({
    nodes = [],
    nodeComponent = DefaultNode,
    className,
    x = (d) => (d && d.x) || 0,
    y = (d) => (d && d.y) || 0,
    label = (d) => (d && d.label) || 0,
}) {
    return (
        <>
            {nodes.map((node, i) => (
                <Group
                    key={`network-node-${i}`}
                    className={cx("visx-network-node", className)}
                    left={x(node)}
                    top={y(node)}
                >
                    {React.createElement(nodeComponent[label(node)], { node })}
                </Group>
            ))}
        </>
    );
}
