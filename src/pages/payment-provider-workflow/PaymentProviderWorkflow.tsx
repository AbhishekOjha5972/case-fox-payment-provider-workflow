import Styles from "./payment-provider-workflow.module.css"
import { addEdge, Background, Connection, Controls, Edge, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import '@xyflow/react/dist/style.css';
import { AUTO_HIDE_DURATION, EDGE, initialEdges, initialNodes, LOCAL_STORAGE_KEY_WORK_FLOWS, NODE_SOURCE, NODE_TYPE_CURRENCY, NODE_TYPE_IMPORT_PROVIDER, NODE_TYPE_INITIALIZER, NODE_TYPE_PROVIDER } from "../../constants";
import { getLayoutedNodesAndEdges, getUuid } from "../../utils/helper";
import CurrencyNode from "../../components/nodes/currency/CurrencyNode";
import InitializerNode from "../../components/nodes/initialiser/InitializerNode";
import ProviderNode from "../../components/nodes/provider/ProviderNode";
import CustomSnackbar from "../../components/snackbar/Snackbar";
import CustomEdge from "../../components/edges/custom-edge/CustomEdge";
import Navbar from "../../components/navbar/Navbar";
import { useNodeAndEdge } from "../../context/NodeAndEdgeRecordsContext";

type SourceKeys = keyof typeof NODE_SOURCE;

const nodeTypes = {
    [NODE_TYPE_INITIALIZER]: InitializerNode,
    [NODE_TYPE_CURRENCY]: CurrencyNode,
    [NODE_TYPE_PROVIDER]: ProviderNode,
}

const edgeTypes = {
    customEdge: CustomEdge,
};

const PaymentProviderWorkflow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<{ ["severity"]: string, ["message"]: string }>({ severity: 'success', message: "Everything Fine." });
    const closeSnackbarIntervalId = useRef<ReturnType<typeof setTimeout> | null>(null)
    const { addItem } = useNodeAndEdge();
    const { fitView } = useReactFlow();

    const onConnect = useCallback(
        (connection: Connection) => {
            const sourceId = connection.source;
            const targetId = connection.target;

            let isClear = true;

            setNodes(prev => {
                // Find the corresponding nodes based on these IDs
                const sourceNode = prev.find((node: any) => node.id === sourceId);
                const targetNode = prev.find((node: any) => node.id === targetId);

                const sourceType = sourceNode?.type as SourceKeys;

                const targetShouldBe = NODE_SOURCE[sourceType];

                if (targetShouldBe !== targetNode?.type) {
                    isClear = false
                    setOpen(true);
                    setError({ severity: "warning", message: `Unable to connect to the payment ${sourceType}, Please ensure the payment ${sourceType} only connect to ${targetShouldBe}` })
                    closeSnackbarIntervalId.current = setTimeout(() => {
                        setOpen(false)
                    }, AUTO_HIDE_DURATION)
                }
                return prev
            })

            if (isClear) {
                addItem(EDGE);
                const edge = {
                    ...connection,
                    animated: true,
                    id: getUuid(),
                    type: "customEdge",
                };
                setEdges((prevEdges: any) => addEdge(edge, prevEdges));
            }
        },
        [edges]
    );


    // Saving the work flow in the local starage
    const handleSaveWorkFlow = useCallback((name: string) => {
        const workflow = { nodes, edges };
        const lsData = localStorage.getItem(LOCAL_STORAGE_KEY_WORK_FLOWS);
        const parsedData = lsData ? JSON.parse(lsData) : null;
        localStorage.setItem(LOCAL_STORAGE_KEY_WORK_FLOWS, JSON.stringify({ ...(parsedData || {}), [name]: workflow }));
    }, [nodes, edges]);

    const handleLoadWorkFlow = useCallback((key: string) => {
        const lsData = localStorage.getItem(LOCAL_STORAGE_KEY_WORK_FLOWS);
        const parsedData = lsData ? JSON.parse(lsData) : null;
        const { nodes, edges } = parsedData[key];
        setNodes(nodes);
        setEdges(edges);
    }, []);

    // Function to auto-arrange the nodes using Dagre
    const autoArrangeNodes = () => {
        const { layoutedNodes, layoutedEdges } = getLayoutedNodesAndEdges(nodes, edges, 'TB');
        setNodes(layoutedNodes); // Update nodes with new positions
        setEdges(layoutedEdges); // Update edges if needed (edges layout is optional)
        fitView({ duration: 800, padding: 0.5 });
    };


    const handleSaveLayout = () => {
        const layoutData = {
            nodes: nodes.map(node => ({ id: node.id, type: node.type, position: node.position, data: node.data })),
            edges: edges.map(edge => ({ id: edge.id, source: edge.source, target: edge.target })),
        };
        const json = JSON.stringify(layoutData, null, 2); // Pretty-print the JSON

        // Create a blob and download the file
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'layout.json'; // Name of the downloaded file
        a.click();
        URL.revokeObjectURL(url);
    };

    // Function to load layout from JSON file
    const handleLoadLayout = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const text = await file.text();
            const { nodes, edges } = JSON.parse(text);
            setNodes(nodes);
            setEdges(edges);
        }
    };

    useEffect(() => {
        return () => {
            if (closeSnackbarIntervalId.current !== null) {
                clearTimeout(closeSnackbarIntervalId.current);
            }
        }
    }, []);

    return (
        <>
            <div className={Styles.main_container}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onConnect={onConnect}
                    fitView
                >
                    <Background />
                    <Controls />
                    <Navbar
                        handleSaveWorkFlow={handleSaveWorkFlow}
                        handleLoadWorkFlow={handleLoadWorkFlow}
                        handleAutoArrangeNodes={autoArrangeNodes}
                        handleSaveLayout={handleSaveLayout}
                        handleLoadLayout={handleLoadLayout}
                    />
                </ReactFlow>
            </div>
            <CustomSnackbar open={open} severity={error?.severity as "success" | "error" | "warning" | "info" | undefined} onClose={() => { setOpen(false) }} message={error?.message} />
        </>
    )
}

export default PaymentProviderWorkflow