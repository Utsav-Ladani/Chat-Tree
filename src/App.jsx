import { useEffect } from 'react';
import './App.css'
import ChatTree from './components/ChatTree'
import Sidebar from './components/Sidebar'
import { getAllConversations } from './db/conversation';
import { buildTree } from './utils/tree';
import { useState } from 'react';
import { useRef } from 'react';

const DEFAULT_ROOT_NODE = [{
  id: 0,
  user: '',
  assistant: '',
  children: [],
}];

function App() {
  const [chatRootNode, setChatRootNode] = useState(DEFAULT_ROOT_NODE);
  const parentRef = useRef(null);
  const [reRender, setReRender] = useState(0);

  const currentChatRootNode = chatRootNode[0]

  function addChildNode(parentId) {
    function addChildRecursive(node) {
      if (node.id === parentId) {
        const tempId = -Date.now();
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
    setChatRootNode((root) => addChildRecursive(root));
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
    setChatRootNode((root) => updateNodeRecursive(root));
    setReRender((prev) => prev + 1);
  }

  useEffect(() => {
    getAllConversations().then(records => {
      setChatRootNode(buildTree(records) ?? DEFAULT_ROOT_NODE);
    });
  }, []);

  return (
    <div className="grid grid-cols-[auto_1fr] h-screen w-full">
      <Sidebar chatRootNode={chatRootNode} />
      <div className="grid grid-rows-[auto_1fr] h-screen w-full">
        <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
          <h1 className="text-3xl font-bold">Chat Tree App</h1>
          <button className="bg-black text-white px-4 py-1 rounded">Settings</button>
        </header>
        <ChatTree
          chatRootNode={currentChatRootNode}
          parentRef={parentRef}
          onAddChild={addChildNode}
          reRender={reRender}
          updateNodeData={updateNodeData}
        />
      </div>
    </div>
  )
}

export default App
