import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../lib/services/user-service";
import { IoMdExit } from "react-icons/io";

export default function Navbar() {
  const handleLogout = async () => {
    const response = await logoutUser();
    console.log(response.message);
  };

  const handleNavigateToOwned = () => {
    navigate('/owned')
  }

  const navigate = useNavigate();

  return (
    <div className="text-2xl text-accent flex justify-center items-center">
      <div className="px-16 py-8 w-full flex justify-between">
        <div className="flex gap-8 items-center">
          <div className="font-semibold">Miserease</div>
          <button
            onClick={handleNavigateToOwned}
            className="bg-transparent text-accent font-medium text-base"
          >
            Owned
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="bg-secondary text-accent rounded-xl p-3 text-xl"
        >
          <IoMdExit />
        </button>
      </div>
    </div>
  );
}
