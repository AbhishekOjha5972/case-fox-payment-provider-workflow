import { useReactFlow } from '@xyflow/react';
import { SelectPicker } from 'rsuite';
import { getUuid } from '../../utils/helper';
import { NODE, PROVIDERS } from '../../constants';
import { useNodeAndEdge } from '../../context/NodeAndEdgeRecordsContext';
import { MenuItem, Select } from '@mui/material';
import Styles from "./provider-importer.module.css"
type ProviderKeys = keyof typeof PROVIDERS;


const data = [
    { value: "googlePay", label: "Google Pay" },
    { value: "applePay", label: "Apple Pay" },
    { value: "stripePay", label: "Stripe Pay" },
    { value: "amazonPay", label: "Amazon Pay" },
    { value: "paypalPay", label: "Paypal Pay" },
];


interface ProviderImpordeProps {
    handleError: ({ }: { severity: string, message: string }) => void;
}

const ProviderImporder: React.FC<ProviderImpordeProps> = ({ handleError }) => {
    const { setNodes } = useReactFlow();
    const { addItem } = useNodeAndEdge();

    const handleGetProvider = (props: any) => {
        const value = props.target.value as ProviderKeys
        const name = PROVIDERS[value]
        const location = Math.random() * 500;

        setNodes((prevNodes) => {
            const nodeMap: any = {};
            prevNodes?.forEach(node => {
                const key = node?.data?.code as string
                nodeMap[key] = true;
            })
            if (nodeMap[value]) {
                handleError({ severity: "warning", message: `Payment Provider already exists!` })
                return prevNodes
            }
            addItem(NODE);
            return [
                ...prevNodes,
                {
                    id: getUuid(),
                    data: { name: name, code: value },
                    type: "provider",
                    position: { x: location, y: location },
                },
            ]
        });
    }

    return (
        <div className={Styles.main_container} >
            <select style={{ width: "100%", padding: "0.5rem" }} onChange={handleGetProvider}>
                {
                    data?.map(item => {
                        return <option style={{ padding: "0.5rem" }} value={item?.value}>{item?.label}</option>
                    })
                }
            </select>
        </div>
    )
}

export default ProviderImporder