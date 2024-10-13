declare module 'react-resizable' {
    import * as React from 'react';

    export interface ResizableProps {
        width: number;
        height: number;
        onResize: (event: React.SyntheticEvent, data: { size: { width: number; height: number } }) => void;
        minConstraints?: [number, number];
        maxConstraints?: [number, number];
        handle?: React.ReactNode; // You can define this further if needed
        children: React.ReactNode;
        // Add any additional props if necessary
    }

    export class Resizable extends React.Component<ResizableProps> {}
}
