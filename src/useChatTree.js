import { useState, useRef, useEffect } from 'react';
import { getAllConversations, deleteConversation } from './db/conversation';
import { buildTree, deleteNodeFromTree } from './utils/tree';

export default function useChatTree() {
  const [chatRootNodes, setChatRootNodes] = useState([]);
  const parentRef = useRef(null);
  const [reRender, setReRender] = useState(0);

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
    return newRootNode.id;
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

  function deleteNode(nodeId, onDeleted) {
    async function deleteNodeRecursive(node) {
      await deleteConversation(node.id);
      if (node.children && node.children.length > 0) {
        for (const child of node.children) {
          await deleteNodeRecursive(child);
        }
      }
    }
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
        if (onDeleted) onDeleted();
      });
    }
  }

  useEffect(() => {
    getAllConversations().then(records => {
      setChatRootNodes(buildTree(records) ?? []);
    });
  }, []);

  return {
    chatRootNodes,
    parentRef,
    reRender,
    addRootNode,
    addChildNode,
    updateNodeData,
    deleteNode,
  };
} 