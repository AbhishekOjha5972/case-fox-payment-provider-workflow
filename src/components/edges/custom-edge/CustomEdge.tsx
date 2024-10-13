import { BezierEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, useReactFlow } from '@xyflow/react'
import Styles from "./custom-edge.module.css"
import { Button } from '@mui/material';
import { useNodeAndEdge } from '../../../context/NodeAndEdgeRecordsContext';
import { EDGE } from '../../../constants';

const CustomEdge = (props: EdgeProps) => {

    const { removeItem, handleAddRemoveNodeOrEdge } = useNodeAndEdge();

    const {
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    } = props;

    const { setEdges } = useReactFlow();

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    });


    return (
        <>
            <BezierEdge {...props} />
            <EdgeLabelRenderer>
                <div className={Styles.main_container}>
                    <button
                        style={{
                            position: "absolute",
                            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                            zIndex: 10, // Ensure the button is on top
                            pointerEvents: 'auto', // Allow pointer events on the button
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setEdges((prevEdges) => prevEdges.filter((edge) => {
                                if (edge.id !== id) return true
                                else {
                                    removeItem(null, true);
                                    handleAddRemoveNodeOrEdge({ element: edge, type: EDGE });
                                    return false
                                }
                            }));
                        }}
                    >
                        x
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    )
}

export default CustomEdge