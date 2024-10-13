import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface NodeAndEdgeContextType {
    items: string[];                     // Array of strings
    addItem: (item: string) => void;      // Function to add a string to the array
    removeItem: (item: string | null | undefined, isLast: boolean) => string | undefined | null;   // Function to remove a string from the array
    removedItems: any;
    handleAddRemoveNodeOrEdge: (element: any) => void;
    handleRemoveRemovedNodeOrEdge: () => void;
}

// Create the context with an initial value of `undefined`
const NodeAndEdgeContext = createContext<NodeAndEdgeContextType | undefined>(undefined);

// Custom hook to use the NodeAndEdgeContext
export const useNodeAndEdge = () => {
    const context = useContext(NodeAndEdgeContext);
    if (!context) {
        throw new Error('useStringArray must be used within a NodeAndEdgeProvider');
    }
    return context;
};



export const NodeAndEdgeProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<string[]>([]);
    const [removedItems, setRemovedItems] = useState<any>([]);

    // Function to add an item to the array
    const addItem = (item: string) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    // Function to remove an item from the array
    const removeItem = (item: string | null | undefined, isLast: boolean) => {
        if (!item && isLast) {
            setItems((prevItems: string[]) => {
                const updatedState = prevItems?.slice(0, prevItems?.length - 1);
                return updatedState
            })
            return items[items?.length - 1]
        } else {
            setItems((prevItems) => prevItems.filter(i => i !== item));
            return item
        }
    };

    const handleAddRemoveNodeOrEdge = (element: any) => {
        setRemovedItems((prev: any) => ([...prev, element]));
    }

    const handleRemoveRemovedNodeOrEdge = () => {
        setRemovedItems((prev: any) => {
            return prev?.slice(0, prev?.length - 1);
        })
    }


    return (
        <NodeAndEdgeContext.Provider value={{ items, addItem, removeItem, removedItems, handleAddRemoveNodeOrEdge, handleRemoveRemovedNodeOrEdge }}>
            {children}
        </NodeAndEdgeContext.Provider>
    );
};
