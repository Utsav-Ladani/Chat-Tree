import { useEffect } from 'react';
import './App.css'
import Sidebar from './components/Sidebar'
import { getAllConversations, deleteConversation } from './db/conversation';
import { buildTree, deleteNodeFromTree } from './utils/tree';
import { useState } from 'react';
import { useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ChatTreeWrapper from './components/ChatTreeWrapper';

function App() {
  const [chatRootNodes, setChatRootNodes] = useState([]);
  const parentRef = useRef(null);
  const [reRender, setReRender] = useState(0);
  const navigate = useNavigate();

  function addRootNode() {
    const newRootNode = {
      parentId: null,
      id: Date.now(),
      user: '',
      assistant: '',
      children: [],
    };

    setChatRootNodes((rootNode) => [newRootNode, ...rootNode]);
    setReRender((prev) => prev + 1);
    navigate(`/chat/${newRootNode.id}`);
  }

  function addChildNode(parentId) {
    function addChildRecursive(node) {
      if (node.id === parentId) {
        const tempId = Date.now();
        const newChild = {
          id: tempId,
          parentId: parentId,
          user: '',
          assistant: '',
          children: [],
        };
        return {
          ...node,
          children: node.children ? [newChild, ...node.children] : [newChild],
        };
      } else if (node.children) {
        return {
          ...node,
          children: node.children.map(addChildRecursive),
        };
      } else {
        return node;
      }
    }
    setChatRootNodes((rootNodes) => rootNodes.map(addChildRecursive));
    setReRender((prev) => prev + 1);
  }

  function updateNodeData(nodeId, data) {
    function updateNodeRecursive(node) {
      if (node.id === nodeId) {
        return { ...node, ...data };
      }

      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateNodeRecursive),
        };
      }

      return node;
    }
    setChatRootNodes((rootNodes) => rootNodes.map(updateNodeRecursive));
    setReRender((prev) => prev + 1);
  }

  function deleteNode(nodeId) {
    async function deleteNodeRecursive(node) {
      // Delete this node from DB
      await deleteConversation(node.id);
      // Recursively delete children
      if (node.children && node.children.length > 0) {
        for (const child of node.children) {
          await deleteNodeRecursive(child);
        }
      }
    }

    // Find the node to delete (and its children)
    const findNode = (nodes) => {
      for (const node of nodes) {
        if (node.id === nodeId) return node;
        if (node.children) {
          const found = findNode(node.children);
          if (found) return found;
        }
      }
      return null;
    };

    const nodeToDelete = findNode(chatRootNodes);

    if (nodeToDelete) {
      deleteNodeRecursive(nodeToDelete).then(() => {
        setChatRootNodes((rootNodes) => deleteNodeFromTree(rootNodes, nodeId));
        setReRender((prev) => prev + 1);
        navigate('/');
      });
    }
  }

  useEffect(() => {
    getAllConversations().then(records => {
      setChatRootNodes(buildTree(records) ?? []);
    });
  }, []);

  return (
    <div className="grid grid-cols-[auto_1fr] h-screen w-full">
      <Sidebar
        chatRootNodes={chatRootNodes}
        onNewChat={() => {
          addRootNode();
        }}
        onDeleteNode={deleteNode}
      />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-2xl font-bold">Hello 👋</h2>
              <p className="text-lg">Select a chat tree to get started</p>
            </div>
          } />

        <Route
          path="/chat/:id"
          element={
              <ChatTreeWrapper
                chatRootNodes={chatRootNodes}
                parentRef={parentRef}
                onAddChild={addChildNode}
                reRender={reRender}
                updateNodeData={updateNodeData}
                onDeleteNode={deleteNode}
              />
          } />
      </Routes>
    </div>
  )
}

export default App
