import React from "react";
import { Group } from "@vx/group";
import Links from "./Links";
import Nodes from "./Nodes";
import DefaultNode from "@vx/network/lib/DefaultNode";
import DefaultLink from "@vx/network/lib/DefaultLink";

export default function Graph({
    graph,
    linkComponent = DefaultLink,
    nodeComponent = DefaultNode,
    top,
    left,
}) {
    return (
        <Group top={top} left={left}>
            <Links links={graph.links} linkComponent={linkComponent} />
            <Nodes nodes={graph.nodes} nodeComponent={nodeComponent} />
        </Group>
    );
}
