import { LuLoader2 } from "react-icons/lu";

export default function Loader() {
  return (
    <div className="w-6 h-6 border-4 border-solid border-gray-300 border-opacity-10 rounded-full animate-spin">
      <LuLoader2 />
    </div>
  );
}
