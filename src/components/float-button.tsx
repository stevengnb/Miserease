import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface FloatingButtonProps {
  isFixed?: boolean;
  isDetail?: boolean;
  navigateTo?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  children: ReactNode;
}

export default function FloatingButton({
  isFixed = false,
  isDetail = false,
  navigateTo = "/",
  position = "top-left",
  children,
}: FloatingButtonProps) {
  const navigate = useNavigate();

  const getPositionClass = () => {
    switch (position) {
      case "top-left":
        return "top-5 left-5";
      case "top-right":
        return "top-5 right-5";
      case "bottom-left":
        return "bottom-5 left-5";
      case "bottom-right":
        return "bottom-10 right-10";
      default:
        return "top-5 left-5";
    }
  };

  const getButtonClass = () => {
    if (isDetail) {
      return "top-5 left-5 p-4 rounded-full bg-accent text-neutral hover:bg-neutral hover:text-accent flex items-center justify-center transition-all duration-300 shadow-xl";
    }

    if (isFixed) {
      return `fixed ${getPositionClass()} p-4 rounded-full bg-accent text-neutral hover:bg-neutral hover:text-accent flex items-center justify-center transition-all duration-300 shadow-xl`;
    }

    return `absolute ${getPositionClass()} p-4 rounded-full bg-accent text-neutral hover:bg-neutral hover:text-accent flex items-center justify-center transition-all duration-300 shadow-xl`;
  };

  const handleNavigate = () => {
    const rootPath = navigateTo.startsWith("/") ? navigateTo : `/${navigateTo}`;
    navigate(rootPath, { replace: true });
  };

  return (
    <button
      className={getButtonClass()}
      onClick={handleNavigate}
    >
      {children}
    </button>
  );
}
