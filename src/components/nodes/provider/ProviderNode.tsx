import React, { useEffect, useState } from 'react'
import Styles from "./provider-node.module.css"
import { Handle, Position, useReactFlow } from '@xyflow/react'

import googlePay from "../../../assets/images/google-pay.png"
import amazonPay from "../../../assets/images/amazon-pay.png"
import paypalPay from "../../../assets/images/paypal.png"
import stripePay from "../../../assets/images/letter-s.png"
import applePay from "../../../assets/images/apple-pay.png"
import closeIcon from "../../../assets/images/close.png"
import { useNodeAndEdge } from '../../../context/NodeAndEdgeRecordsContext'
import { NODE } from '../../../constants'
import { Button } from 'rsuite'


const imageURLs: { [code: string]: string } = {
    googlePay,
    amazonPay,
    paypalPay,
    stripePay,
    applePay
}

const ProviderNode = ({ data, id }: any) => {
    const { setNodes } = useReactFlow();
    const { removeItem, handleAddRemoveNodeOrEdge } = useNodeAndEdge();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleRemoveNode = () => {
        setNodes(prev => (prev?.filter(node => {
            if (node.id !== id) return true
            else {
                removeItem(null, true);
                handleAddRemoveNodeOrEdge({ element: node, type: NODE });
            }
        })));
    }

    const handleIncreaseSize = () => {
        setHeight(prev => prev + 1);
        setWidth(prev => prev + 1);
    }

    const handleDecreasingSize = () => {
        setHeight(prev => prev - 1);
        setWidth(prev => prev - 1);
    }

    useEffect(() => {
        const divContainer = document.getElementById('provider_container');
        const clientHeight = divContainer?.clientHeight || 0;
        const clientWidth = divContainer?.clientWidth || 0;
        setHeight(clientHeight)
        setWidth(clientWidth)
    }, [])

    return (
        <>
            <div
                className={Styles.main_container}
                style={(height && width) ? { height: `${height}px`, width: `${width}px` } : {}}
                id="provider_container"
            >
                <img className={Styles.image} src={imageURLs[data?.code]} alt={data?.name} />
                <div className={Styles.middle}>
                    <div className={Styles.details_container}>
                        <span className={Styles.label} aria-label='payment initialiser'>{data?.name}</span>
                    </div>
                    <img
                        className={Styles.close}
                        src={closeIcon}
                        alt='close'
                        onClick={handleRemoveNode}
                        loading='lazy'
                    />
                </div>
                <div className={Styles.resize}>
                    <Button onClick={handleIncreaseSize}>+</Button>
                    <Button onClick={handleDecreasingSize}>-</Button>
                </div>
            </div>

            <Handle type='target' position={Position.Left} />
        </>
    )
}

export default ProviderNode