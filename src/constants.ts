import { Edge, Node } from "@xyflow/react";
import { getUuid } from "./utils/helper";
import US_FLAG from "./assets/images/united-states.png"
import ENG_FLAG from "./assets/images/united-kingdom.png"

export const NODE_TYPE_INITIALIZER = "initializer"
export const NODE_TYPE_CURRENCY = "currency"
export const NODE_TYPE_PROVIDER = "provider"
export const NODE_TYPE_IMPORT_PROVIDER = "importProvider"


export const initialNodes: Node[] = [
    {
        id: getUuid(),
        position: { x: 10, y: 100 },
        data: { amount: 100 },
        type: NODE_TYPE_INITIALIZER,
    },
    {
        id: getUuid(),
        position: { x: 150, y: 100 },
        data: { currencyType: "$", country: "United State", flagURL: US_FLAG, code: "usa" },
        type: NODE_TYPE_CURRENCY
    },
    {
        id: getUuid(),
        position: { x: 150, y: 200 },
        data: { currencyType: "£", country: "England", flagURL: ENG_FLAG, code: "eng" },
        type: NODE_TYPE_CURRENCY
    },
    {
        id: getUuid(),
        position: { x: 300, y: 100 },
        data: { name: "Google Pay", code: "googlePay" },
        type: NODE_TYPE_PROVIDER,
        resizing: true,
    },
]


export const initialEdges: Edge[] = [];

export const PROVIDERS = {
    googlePay: "Google Pay",
    amazonPay: "Amazon Pay",
    paypalPay: "Paypal Pay",
    stripePay: "Stripe Pay",
    applePay: "Apple Pay"
}

export const NODE_SOURCE = {
    [NODE_TYPE_INITIALIZER]: NODE_TYPE_PROVIDER,
    [NODE_TYPE_CURRENCY]: NODE_TYPE_PROVIDER,
    [NODE_TYPE_PROVIDER]: null,
}

export const AUTO_HIDE_DURATION = 6000;
export const NODE = "node";
export const EDGE = "edge";
export const LOCAL_STORAGE_KEY_WORK_FLOWS = "work_flows"