import React from "react";
import cx from "classnames";
import { Group } from "@vx/group";

export default function Links({ links = [], linkComponent, className }) {
    return (
        <>
            {links.map((link, i) => (
                <Group key={`network-link-${i}`} className={cx("visx-network-link", className)}>
                    {React.createElement(linkComponent, { link })}
                </Group>
            ))}
        </>
    );
}
