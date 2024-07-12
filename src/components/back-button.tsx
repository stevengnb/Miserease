import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function BackButton({ isFixed = false, navigateTo = "/" }) {
  const navigate = useNavigate();

  return (
    <button
      className={
        isFixed
          ? "fixed top-5 left-5 w-11 h-11 rounded-full bg-accent text-neutral hover:bg-neutral hover:text-accent flex items-center justify-center transition-all duration-300 shadow-xl"
          : "absolute top-7 left-7 w-10 h-10 rounded-full bg-accent text-neutral hover:bg-neutral hover:text-accent flex items-center justify-center transition-all duration-300"
      }
      onClick={() => navigate(navigateTo)}
    >
      <IoArrowBack className="w-6 h-6" />
    </button>
  );
}
