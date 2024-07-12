import { logoutUser } from "../../lib/services/user-service";
import { IoMdExit } from "react-icons/io";

export default function Navbar() {
  const handleLogout = async () => {
    const response = await logoutUser();
    console.log(response.message);
  };


  return (
    <div className="text-2xl text-accent flex justify-center items-center">
      <div className="px-16 py-8 w-full flex justify-between">
        <div className="font-semibold">Miserease</div>
        <button onClick={handleLogout} className="bg-secondary text-accent rounded-xl p-3 text-xl">
            <IoMdExit />
        </button>
      </div>
    </div>
  );
}
