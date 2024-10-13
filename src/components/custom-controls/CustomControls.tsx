import { Button, Tooltip } from '@mui/material';
import Styles from "./custom-controls.module.css"
import { useReactFlow } from '@xyflow/react';
import React, { useState } from 'react'
import UndoIcon from "../../assets/images/undo.png";
import ReduIcon from "../../assets/images/redo.png"
import { useNodeAndEdge } from '../../context/NodeAndEdgeRecordsContext';
import { EDGE, NODE } from '../../constants';

const CustomControls = () => {
    const [redoStack, setRedoStack] = useState<any>([]);
    const { setNodes, setEdges } = useReactFlow();
    const { items, removeItem, addItem, handleAddRemoveNodeOrEdge, removedItems, handleRemoveRemovedNodeOrEdge } = useNodeAndEdge();

    const handleUndo = () => {

        const removed = removeItem(null, true);
        if (removed === NODE) {
            setNodes(prev => {
                const lastElement = prev[prev?.length - 1];
                const updatedPrev = prev?.slice(0, prev?.length - 1)
                // setRedoStack((prev: any) => ([...prev, lastElement]));
                handleAddRemoveNodeOrEdge({ element: lastElement, type: removed });
                // setRedoStack((prev: any) => ([...prev, { element: lastElement, type: removed }]));
                return updatedPrev
            });
        } else if (removed === EDGE) {
            // For Edges 
            setEdges(prev => {
                const lastElement = prev[prev?.length - 1];
                const updatedPrev = prev?.slice(0, prev.length - 1)
                handleAddRemoveNodeOrEdge({ element: lastElement, type: removed });
                // setRedoStack((prev: any) => ([...prev, { element: lastElement, type: removed }]));
                return updatedPrev
            })
        }

    };

    const handleRedo = () => {
        if (removedItems?.length > 0) {
            // setRedoStack((prev: any) => {
            // const updatedRedoStack = prev?.slice(0, prev?.length - 1)
            const lastElement = removedItems[removedItems?.length - 1];
            handleRemoveRemovedNodeOrEdge();
            if (lastElement?.type === NODE) {
                setNodes(prev => {
                    const needToAdd = lastElement?.element
                    return [...prev, needToAdd]
                });
            } else {
                setEdges(prev => {
                    const needToAdd = lastElement?.element
                    return [...prev, needToAdd]
                });
            }
            addItem(lastElement?.type);
            // return updatedRedoStack;
            // })
        }
    }



    return (
        <div className={Styles.main_container}>
            <div className={Styles.undo_redo_container}>
                <Tooltip title="Undo">
                    <Button style={{ height: "38px", width: "38px" }} disabled={false} variant='outlined' onClick={handleUndo}>
                        <img src={UndoIcon} style={{ width: "15px" }} alt='Undo' />
                    </Button>
                </Tooltip>
                <Tooltip title="Redo">
                    <Button style={{ height: "38px", width: "38px" }} disabled={removedItems?.length === 0 ? true : false} variant='outlined' onClick={handleRedo}>
                        <img src={ReduIcon} style={{ width: "15px" }} alt='Redo' />
                    </Button>
                </Tooltip>
                
            </div>
        </div>
    )
}

export default CustomControls