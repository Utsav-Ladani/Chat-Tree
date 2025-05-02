import { AIIcon } from "../icons/AIIcon";
import { HumanIcon } from "../icons/HumanIcon";

export default function User({name}) {
    return (
        <div className="flex-none flex items-center justify-center rounded-full bg-gray-600 text-white w-8 h-8 capitalize">
            {name === 'assistant' ? <AIIcon /> : <HumanIcon />}
        </div>
    );
}