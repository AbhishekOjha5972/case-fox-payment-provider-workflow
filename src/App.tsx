import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PaymentProviderWorkflow from './pages/payment-provider-workflow/PaymentProviderWorkflow';
import { NodeAndEdgeProvider } from './context/NodeAndEdgeRecordsContext';
import { ReactFlowProvider } from '@xyflow/react';


function App() {
  return (
    <ReactFlowProvider>
      <NodeAndEdgeProvider>
        <div className="App">
          <PaymentProviderWorkflow />
        </div>
      </NodeAndEdgeProvider>
    </ReactFlowProvider>
  );
}

export default App;



