import React, { useEffect, useRef, useState } from 'react'
import Styles from "./navbar.module.css"
import ProviderImporder from '../provider-importer/ProviderImporder'
import CustomSnackbar from '../snackbar/Snackbar';
import { AUTO_HIDE_DURATION, LOCAL_STORAGE_KEY_WORK_FLOWS, NODE, NODE_TYPE_INITIALIZER } from '../../constants';
import CustomControls from '../custom-controls/CustomControls';
import { Box, Button, FormLabel, Input, MenuItem, Select, Tooltip } from '@mui/material';
import { useNodeAndEdge } from '../../context/NodeAndEdgeRecordsContext';
import CustomModal from '../custom-modal/CustomModal';
import { Option } from '@mui/base/Option';
import { useReactFlow } from '@xyflow/react';
import { getUuid } from '../../utils/helper';


const Navbar = ({ handleSaveWorkFlow, handleLoadWorkFlow, handleAutoArrangeNodes, handleSaveLayout, handleLoadLayout }: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<{ ["severity"]: string, ["message"]: string }>({ severity: 'success', message: "Everything Fine." });
    const closeSnackbarIntervalId = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [isWorkFlowSaved, setIsWorkFlowSaved] = useState<boolean>(false);
    const { items } = useNodeAndEdge();
    const [saveWorkFlowModal, setSaveWorkFlowModal] = useState<boolean>(false);
    const [inputState, setInputState] = useState("");
    const [modalType, setModalType] = useState<string | null>("save");
    const [selectedWorkFlow, setSelectedWorkFlow] = useState<any>("");
    const { fitView, setNodes } = useReactFlow();
    const { addItem } = useNodeAndEdge();

    const lsData = localStorage.getItem(LOCAL_STORAGE_KEY_WORK_FLOWS);
    const totalWorkFlows = lsData ? JSON.parse(lsData) : {};

    const handleAddNode = () => {

        setNodes(prev => {
            return [...prev, {
                id: getUuid(),
                position: { x: 0, y: 100 },
                data: { amount: inputState },
                type: NODE_TYPE_INITIALIZER,
            }]
        });
        addItem(NODE);
        setSaveWorkFlowModal(false);
        setInputState("");
    }


    const handleError = (props: { message: string, severity: string }) => {
        setOpen(true);
        setError({ severity: props?.severity, message: props?.message })
        closeSnackbarIntervalId.current = setTimeout(() => {
            setOpen(false)
        }, AUTO_HIDE_DURATION)
    };

    const handlePanToCenter = () => {
        fitView({ duration: 800, padding: 0.2 });
    };


    useEffect(() => {
        setIsWorkFlowSaved(false) // Taking asurity that saving work state should be updated all the time.
    }, [items]);


    useEffect(() => {

        if (Object.keys(totalWorkFlows)?.length) {
            setError({ severity: "warning", message: "Saved Work Flow Detected." })
            setOpen(true);
            setModalType("load");
            setSaveWorkFlowModal(true);
        }

        return () => {
            if (closeSnackbarIntervalId.current !== null) {
                clearTimeout(closeSnackbarIntervalId.current);
            }
        }
    }, []);


    return (<>
        <div className={Styles.main_container}>
            <ProviderImporder handleError={handleError} />
            <CustomControls />

            <Tooltip title="Add Initializer">
                <Button variant='contained' onClick={() => {
                    setModalType("initialized");
                    setSaveWorkFlowModal(true);
                }}>
                    ➕
                </Button>
            </Tooltip>

            <Tooltip title="Save Work Flow">
                <Button disabled={isWorkFlowSaved} variant='contained' onClick={() => {
                    setError({ severity: "success", message: "Work Flow has been saved" })
                    setModalType("save");
                    setSaveWorkFlowModal(true);
                }}>Save</Button>
            </Tooltip>

            <Tooltip title="Load Work Flow">
                <Button
                    disabled={Object.keys(totalWorkFlows)?.length ? false : true}
                    onClick={() => {
                        setModalType("load");
                        setSaveWorkFlowModal(true);
                    }} variant='contained'>Load</Button>
            </Tooltip>

            <Tooltip title="Pan to center">
                <Button
                    // disabled={Object.keys(totalWorkFlows)?.length ? false : true}
                    onClick={() => {
                        handlePanToCenter();
                    }} variant='contained'>Pan to center</Button>
            </Tooltip>

            <Tooltip title="Auto Arrange">
                <Button
                    onClick={() => {
                        handleAutoArrangeNodes();
                    }} variant='contained'>Auto Arrange</Button>
            </Tooltip>

            <Button variant='contained'>
                <label >
                    Import Layout
                    <input accept=".json" style={{ display: "none" }} type="file" onChange={(e) => {
                        handleLoadLayout(e);
                    }} placeholder='Import Layout' name='importLayout' />
                </label>
            </Button>

        </div>
        <CustomSnackbar open={open} severity={error?.severity as "success" | "error" | "warning" | "info" | undefined} onClose={() => { setOpen(false) }} message={error?.message} />
        <CustomModal handleClose={() => setSaveWorkFlowModal(false)} open={saveWorkFlowModal}>
            <div className={Styles.save_work_flow_main_container} >
                {modalType === "save" ? <>
                    <Input onChange={(e) => {
                        setInputState(e.target.value)
                    }} autoFocus={true} style={{ width: "100%" }} placeholder='Enter Work Flow Name.' defaultValue={`Work_Flow_${Object.keys(totalWorkFlows)?.length + 1}`} />
                    <Button onClick={() => {
                        handleSaveWorkFlow(inputState === "" ? `Work_Flow_${Object.keys(totalWorkFlows)?.length + 1}` : inputState?.split(" ").join("_"));
                        setOpen(true);
                        setIsWorkFlowSaved(true);
                        setSaveWorkFlowModal(false);
                        setInputState("");
                    }} variant='contained'>Save Work Flow</Button>

                    <Button onClick={handleSaveLayout} variant='contained'>Export Layout</Button>
                </>
                    :
                    modalType === "load" ? <>
                        <FormLabel>Select Work Flow</FormLabel>
                        <Select style={{ width: "100%" }} onChange={e => {
                            setSelectedWorkFlow(e?.target?.value);
                        }}>
                            {Object.keys(totalWorkFlows)?.map(item => {
                                return <MenuItem value={item}>{item?.split("_")?.join(" ")}</MenuItem>
                            })}
                        </Select>
                        <Button variant='contained' style={{ backgroundColor: "red" }} onClick={() => {
                            localStorage.removeItem(LOCAL_STORAGE_KEY_WORK_FLOWS);
                            setError({ severity: "success", message: "All Work Flows has been deleted." })
                            setOpen(true);
                            setSaveWorkFlowModal(false);
                        }}>Clear All</Button>

                        <Button variant='contained' style={{ backgroundColor: "red" }} onClick={() => {
                            delete totalWorkFlows[selectedWorkFlow]
                            localStorage.setItem(LOCAL_STORAGE_KEY_WORK_FLOWS, JSON.stringify(totalWorkFlows));
                            setError({ severity: "success", message: "All Work Flows has been deleted." })
                            setOpen(true);
                            setSaveWorkFlowModal(false);
                        }}>Selected Delete</Button>

                        <Button disabled={selectedWorkFlow === "" ? true : false} variant='contained' style={{ backgroundColor: "green",color:"white" }} onClick={() => {
                            handleLoadWorkFlow(selectedWorkFlow)
                            setSaveWorkFlowModal(false);
                            setError({ severity: "success", message: `${selectedWorkFlow?.split("_").join(" ")} has been loaded.` })
                            setOpen(true);
                        }}>Load</Button>

                        <Button variant='contained'>
                            <label >
                                Import Layout
                                <input style={{ display: "none" }} type="file" onChange={() => {
                                    handleLoadLayout()
                                }} placeholder='Import Layout' name='importLayout' />
                            </label>
                        </Button>

                    </> : <>
                        <Input onChange={e => setInputState(e?.target?.value)} placeholder='Add Threshold Limit' />
                        <Button onClick={handleAddNode} style={{ background: "green", color: "white" }}>Add</Button>
                    </>
                }
                <Button onClick={() => setSaveWorkFlowModal(false)}>Close</Button>
            </div>
        </CustomModal>
    </>
    )
}

export default Navbar