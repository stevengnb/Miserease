import { LuLoader2 } from "react-icons/lu";

export default function Loader({ isNotAccent = false }) {
  return (
    <div className="w-6 h-6 rounded-full animate-spin">
      <LuLoader2
        className={
          isNotAccent ? "text-neutral text-2xl" : "text-accent text-2xl"
        }
      />
    </div>
  );
}
