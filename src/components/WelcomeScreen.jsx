import { Settings } from "lucide-react";
import ChatHeader from "./ChatHeader";
import { BotMessageSquare } from "lucide-react";

export default function WelcomeScreen() {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen w-full">
      <ChatHeader title="Welcome" />
      <div className="flex flex-col items-center gap-2 justify-center h-full">
        <h2 className="text-4xl font-bold text-gray-800">Get Started 🚀</h2>
        <p className="text-lg animate-pulse bg-black text-white px-4 py-2 rounded-lg">
          Set your API keys in the <Settings className="inline-block mx-1 text-blue-600" size={20} /> settings and then choose a model <BotMessageSquare className="inline-block mx-1 text-indigo-600" size={20} /> to start branching.
        </p>
      </div>
    </div>
  );
} 