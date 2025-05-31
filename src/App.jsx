import Sidebar from './components/Sidebar';
import ChatTreeWrapper from './components/ChatTreeWrapper';
import WelcomeScreen from './components/WelcomeScreen';
import { Routes, Route, useNavigate } from 'react-router-dom';
import useChatTree from './useChatTree';
import './App.css';
import { SidebarProvider } from './components/SidebarContext';

export default function App() {
  const {
    chatRootNodes,
    parentRef,
    reRender,
    addRootNode,
    addChildNode,
    updateNodeData,
    deleteNode,
  } = useChatTree();
  const navigate = useNavigate();

  function handleAddRootNode() {
    const newId = addRootNode();
    navigate(`/chat/${newId}`);
  }

  function handleDeleteNode(nodeId) {
    deleteNode(nodeId, (deletedNode) => {
      if (!deletedNode.parentId) {
        navigate('/');
      }
    });
  }

  return (
    <SidebarProvider>
      <div className="grid grid-cols-[auto_1fr] h-screen w-full">
        <Sidebar
          chatRootNodes={chatRootNodes}
          onNewChat={handleAddRootNode}
          onDeleteNode={handleDeleteNode}
        />
        <Routes>
          <Route
            path="/"
            element={<WelcomeScreen />}
          />
          <Route
            path="/chat/:id"
            element={
              <ChatTreeWrapper
                chatRootNodes={chatRootNodes}
                parentRef={parentRef}
                onAddChild={addChildNode}
                reRender={reRender}
                updateNodeData={updateNodeData}
                onDeleteNode={handleDeleteNode}
              />
            }
          />
        </Routes>
      </div>
    </SidebarProvider>
  );
}
