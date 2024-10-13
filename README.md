
# Interactive Payment Provider Workflow

This project is an interactive, visually dynamic workflow management tool built using the React Flow library with TypeScript. It allows users to add, manage, and visualize payment provider nodes like Google Pay, Apple Pay, Stripe, and more. The tool supports interactions such as dragging, resizing, deleting, connecting nodes, undo/redo functionality, and saving/loading the workflow state. It is designed to help users customize and manage their payment provider workflows seamlessly.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)

## Features

1. **Add Payment Provider Node**:
    - Add unique payment provider nodes (Google Pay, Stripe, Apple Pay, etc.) from a dropdown list.
    - Duplicate nodes are prevented.

2. **Delete Node**:
    - Each node has a delete button (an “X” icon) for easy removal of nodes.

3. **Drag and Drop**:
    - Nodes can be dragged and repositioned within the canvas in real-time for a smoother interaction.

4. **Node Resizing**:
    - Nodes can be resized for customization, allowing users to increase or decrease their size.

5. **Node Connection Validation**:
    - Ensure logical connections between nodes (e.g., a Payment Initialization node can only connect to a valid payment provider).
    - Invalid connections are visually highlighted.

6. **Conditional Styling**:
    - Dynamic styling based on conditions. For instance, the Payment Initialized node color changes if the payment amount exceeds a certain threshold.

7. **Display Payment Initialization**:
    - Payment initialization nodes display relevant information like payment amounts.

8. **Undo/Redo**:
    - Users can undo or redo recent actions (node addition, deletion, resizing, dragging) to enhance flexibility.

9. **Save and Load Workflow**:
    - Save the current workflow state (nodes, connections) to local storage.
    - Load the saved workflow to restore all nodes, connections, and layouts.

10. **Validation**:
    - Prevent users from adding duplicate payment provider nodes. An error message is displayed when a duplicate is attempted.

11. **Auto Layout**:
    - Automatically arrange nodes to avoid overlap and clutter.
    - Manual trigger for auto-layout is available.

12. **Export/Import**:
    - Export the workflow as a JSON file.
    - Import the JSON file to restore the workflow for future use.

13. **Zoom and Pan**:
    - Zoom in/out and pan across the canvas for better management of large workflows.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/interactive-payment-provider-workflow.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd interactive-payment-provider-workflow
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Run the application**:
    ```bash
    npm start
    ```

5. **Open the application**:
    - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Add Nodes**: Select a payment provider from the dropdown and add it to the canvas.
2. **Drag and Resize**: Drag and resize the nodes as per your workflow requirements.
3. **Delete Nodes**: Use the "X" icon on the node to remove it from the canvas.
4. **Undo/Redo**: Use the provided undo/redo buttons to manage recent actions.
5. **Save Workflow**: Save the current workflow to local storage for future use.
6. **Load Workflow**: Load the previously saved workflow to restore the nodes and connections.
7. **Auto Layout**: Click the auto-layout button to automatically arrange the nodes.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for better code quality.
- **React Flow**: Library for building node-based editors and interactive graphs.
- **React-Resizable**: Used for making the nodes resizable.
- **CSS Modules**: Scoped and modular styling for components.
- **Local Storage**: For persisting workflow data across sessions.

## Project Structure

```bash
src/
│
├── assets/                # Static assets like images
├── components/            # React components for the project
│   ├── ProviderNode.tsx   # Custom node component
│   └── Workflow.tsx       # Main workflow component
├── context/               # Context API for managing state globally
├── hooks/                 # Custom hooks for handling logic
├── pages/                # CSS styles for the project
│   └── PaymentProviderWorkflow
├── utils/                 # Utility functions
├── App.tsx                # Main app component
└── index.tsx              # Entry point for the app
```
