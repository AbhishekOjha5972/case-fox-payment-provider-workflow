import { Handle, Position, useReactFlow } from '@xyflow/react'
import Styles from "./initializer-node.module.css"
import CustomModal from '../../custom-modal/CustomModal';
import { useState } from 'react';
import { Button } from 'rsuite';
import { Tooltip } from '@mui/material';

const InitializerNode = ({ id, data }: any) => {
    const [amount, setAmount] = useState(1);


    const handleIncreaseSize = () => {
        setAmount(prev => {
            if (prev > data?.amount) {
                return prev
            }
            else {
                return prev + 1
            };
        });
    }

    const handleDecreasingSize = () => {
        setAmount(prev => {
            if (prev === 1) return prev
            else {
                return prev - 1
            };
        });
    }

    return (
        <>
            <div
                className={Styles.main_container}
                style={amount > data?.amount ? {
                    boxShadow: "rgba(234, 18, 18, 0.575) 0px 10px 20px,  rgba(234, 18, 18, 0.575) 0px 6px 6px"
                } : {}}
            >
                <span className={Styles.label} aria-label='payment initialiser'>Payment Initialized</span>
                <div className={Styles.details}>
                    <Tooltip title="Amount / Threshold Limit">
                        <span className={Styles.amount} aria-label='amount'>${amount} / ${data?.amount}</span>
                    </Tooltip>
                    <div className={Styles.resize}>
                        <Button onClick={handleIncreaseSize}>+</Button>
                        <Button onClick={handleDecreasingSize}>-</Button>
                    </div>
                </div>
            </div>
            <Handle type='source' position={Position.Right} />
        </>
    )
}

export default InitializerNode