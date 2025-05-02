import './App.css'
import ChatTree from './components/ChatTree'

function App() {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen w-full">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold">Chat Tree App</h1>
        <button className="bg-black text-white px-4 py-1 rounded">Settings</button>
      </header>
      <ChatTree />
    </div>
  )
}

export default App
