export default function brewNetworkInput(data, width, height) {
    const width_int = parseInt(width) - 25;
    const height_int = parseInt(height) - 25;
    const nodes = data.node_positions.map((pos, idx) => ({
        x: pos[0] * width_int + 10,
        y: pos[1] * height_int + 15,
        label: data.node_label[idx],
    }));

    const links = [];
    for (let src_idx = 0; src_idx < data.adjacency_matrix.length; src_idx++) {
        for (let tgt_idx = 0; tgt_idx < data.adjacency_matrix[0].length; tgt_idx++) {
            if (src_idx > tgt_idx) continue;

            if (data.adjacency_matrix[src_idx][tgt_idx])
                links.push({ source: nodes[src_idx], target: nodes[tgt_idx] });
        }
    }

    return { nodes, links };
}
