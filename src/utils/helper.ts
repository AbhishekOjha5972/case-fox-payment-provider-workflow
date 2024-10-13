
import { Edge, Node, XYPosition } from '@xyflow/react';
import dagre from "dagre";

export const getUuid = () => {
    return Math.random().toString();
}



export const getLayoutedNodesAndEdges = (nodes: Node[], edges: Edge[], direction = 'TB') => {

    let py = 10;
    let oy = 10;
    const gap = 50
    const layoutedNodes: any[] = nodes?.map(item => {
        const yCordinate = item?.measured?.height ? item?.measured?.height : 0;
        if (item?.type === "provider") {
            const currentYCordinate = py;
            py = currentYCordinate + yCordinate + gap
        } else {
            const currentYCordinate = oy;
            oy = currentYCordinate + yCordinate + gap
        }
        const cordinate = item?.type === "provider" ? { x: 200, y: py } : { x: 10, y: oy };
        return { ...item, ["position"]: cordinate }
    })


    return { layoutedEdges: edges, layoutedNodes }
};