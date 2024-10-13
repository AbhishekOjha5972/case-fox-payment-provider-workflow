Interactive Payment Provider Workflow
This project is an interactive, visually dynamic workflow management tool built using the React Flow library with TypeScript. It allows users to add, manage, and visualize payment provider nodes like Google Pay, Apple Pay, Stripe, and more. The tool supports interactions such as dragging, resizing, deleting, connecting nodes, undo/redo functionality, and saving/loading the workflow state. It is designed to help users customize and manage their payment provider workflows seamlessly.

Table of Contents
Features
Bonus Features
Installation
Usage
Technologies Used
Project Structure
Future Improvements
Contributing
License
Features
Add Payment Provider Node:

Add unique payment provider nodes (Google Pay, Stripe, Apple Pay, etc.) from a dropdown list.
Duplicate nodes are prevented.
Delete Node:

Each node has a delete button (an “X” icon) for easy removal of nodes.
Drag and Drop:

Nodes can be dragged and repositioned within the canvas in real-time for a smoother interaction.
Node Resizing:

Nodes can be resized for customization, allowing users to increase or decrease their size.
Node Connection Validation:

Ensure logical connections between nodes (e.g., a Payment Initialization node can only connect to a valid payment provider).
Invalid connections are visually highlighted.
Conditional Styling:

Dynamic styling based on conditions. For instance, the Payment Initialized node color changes if the payment amount exceeds a certain threshold.
Display Payment Initialization:

Payment initialization nodes display relevant information like payment amounts.
Undo/Redo:

Users can undo or redo recent actions (node addition, deletion, resizing, dragging) to enhance flexibility.
Save and Load Workflow:

Save the current workflow state (nodes, connections) to local storage.
Load the saved workflow to restore all nodes, connections, and layouts.
Validation:

Prevent users from adding duplicate payment provider nodes. An error message is displayed when a duplicate is attempted.
Auto Layout:

Automatically arrange nodes to avoid overlap and clutter.
Manual trigger for auto-layout is available.
