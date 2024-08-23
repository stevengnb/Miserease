import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../lib/services/user-service";
import { IoMdExit } from "react-icons/io";
import styles from "./navbar.module.css";
import { IoGridOutline } from "react-icons/io5";

export default function Navbar() {
  const handleLogout = async () => {
    const response = await logoutUser();
    console.log(response.message);
  };

  const handleNavigateToOwned = () => {
    navigate("/yours");
  };

  const navigate = useNavigate();

  return (
    <div className="text-2xl text-accent flex justify-center items-center">
      <div className="px-16 py-8 w-full flex justify-between">
        <div className="flex gap-8 items-center">
          <Link className="font-semibold" to={"/home"}>Miserease</Link>
          <button
            onClick={handleNavigateToOwned}
            className={`bg-transparent text-accent font-medium text-base ${styles.navbarItem}`}
          >
            <span className="hidden lg:block">Your Posts</span>
          </button>
        </div>
        <div className="flex gap-4 ">
          <span onClick={handleNavigateToOwned} className="block lg:hidden bg-secondary rounded-xl p-3 text-xl hover:cursor-pointer">
            <IoGridOutline />
          </span>
          <button
            onClick={handleLogout}
            className="bg-secondary text-accent rounded-xl p-3 text-xl"
          >
            <IoMdExit />
          </button>
        </div>
      </div>
    </div>
  );
}
