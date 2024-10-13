import { Handle, Position } from '@xyflow/react'
import Styles from "./currency-node.module.css"

const CurrencyNode = ({ data }: any) => {
    return (
        <>
            <div
                className={Styles.main_container}
            >
                <img className={Styles.image} src={data?.flagURL} alt={data?.country} />
                <div className={Styles.details_container}>
                    <span className={Styles.label} aria-label='payment initialiser'>{data?.country}</span>
                    <span className={Styles.amount} aria-label='amount'>{data?.currencyType}</span>
                </div>
            </div>
            <Handle type='target' position={Position.Left} />
            <Handle type='source' position={Position.Right} />
        </>
    )
}

export default CurrencyNode