import { AIIcon } from "../icons/AIIcon";
import { HumanIcon } from "../icons/HumanIcon";

export default function User({ name }) {
    return (
        <div className={`flex-none flex items-center justify-center rounded-full text-white w-8 h-8 capitalize ${name === 'user' ? 'bg-blue-500' : 'bg-gray-600'}`}>
            {name === 'assistant' ? <AIIcon /> : <HumanIcon />}
        </div>
    );
}