import ChatHeader from "./ChatHeader";

export default function WelcomeScreen() {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen w-full">
      <ChatHeader title="Welcome" />
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold">Hello 👋</h2>
        <p className="text-lg">Select a chat tree to get started</p>
      </div>
    </div>
  );
} 