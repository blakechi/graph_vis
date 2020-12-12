export default function brewNetworkInput(data) {
    const nodes = data.node_positions.map((pos, idx) => ({
        x: pos[0],
        y: pos[1],
        label: data.node_label[idx],
    }));

    const links = [];
    for (let src_idx = 0; src_idx < data.adjacency_matrix.length; src_idx++) {
        for (let tgt_idx = 0; tgt_idx < data.adjacency_matrix[0].length; tgt_idx++) {
            if (src_idx > tgt_idx) continue;

            links.push({ source: nodes[src_idx], target: nodes[tgt_idx] });
        }
    }

    return { nodes, links };
}
