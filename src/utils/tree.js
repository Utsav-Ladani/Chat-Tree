export function buildTree(records) {
    const idToNode = {};
    const roots = [];

    // First, create a map of id to node
    records.forEach(record => {
        idToNode[record.id] = { ...record, children: [] };
    });

    // Then, assign children to their parents
    records.forEach(record => {
        if (record.parentId !== null && record.parentId !== undefined) {
            const parent = idToNode[record.parentId];
            if (parent) {
                parent.children.unshift(idToNode[record.id]);
            }
        } else {
            roots.unshift(idToNode[record.id]);
        }
    });

    // remove orphan nodes
    return roots.filter(root => root.parentId === null);
}