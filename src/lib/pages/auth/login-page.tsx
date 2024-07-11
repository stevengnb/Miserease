import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { UserLogin } from "../../types/user-type";
import { loginUser } from "../../services/user-service";
import Loader from "../../../components/loader";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const response = await loginUser(userData);

    if (response.success) {
      setLoading(false);
      navigate("/");
    }

    setLoading(false);
    console.log(response.message);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-primary">
      <div className="w-full h-full flex justify-center lg:justify-between items-center px-8 py-8">
        <div className="w-96 lg:w-[50%] h-full justify-center items-center p-2 sm:p-10">
          <div className="w-full h-full flex flex-col lg:pl-10 lg:pr-32 xl:pr-52 gap-3 justify-center text-white">
            <div className="text-2xl font-bold text-accent">Login</div>
            <div className="text-base text-gray-500">
              Hello! Enter your details to log in.
            </div>
            <div className="w-full flex items-center bg-secondary rounded-3xl px-5 focus-within:border">
              <MdOutlineMail className="text-xl" />
              <input
                className="py-4 pl-4 placeholder:text-sm w-full indent-3 text-sm bg-transparent focus-visible:outline-none"
                placeholder="Enter your email"
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="flex items-center bg-secondary rounded-3xl px-5 focus-within:border">
              <FiLock className="text-xl" />
              <input
                className="py-4 pl-4 placeholder:text-sm w-full indent-3 text-sm bg-transparent focus-visible:outline-none"
                placeholder="Enter your password"
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
            {loading ? (
              <button className=" bg-neutral rounded-3xl text-accent font-bold p-3 flex justify-center items-center hover:cursor-default">
                <Loader />
              </button>
            ) : (
              <button
                className=" bg-neutral rounded-3xl text-accent font-bold p-3 hover:bg-accent hover:text-neutral transition-all duration-300 ease-in-out active:scale-95"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
            <p className="mt-6 text-sm text-accent">
              Don't have an account?{" "}
              <span className="font-bold hover:cursor-pointer hover:text-neutral transition-all duration-300 ease-in-out">
                Register
              </span>
            </p>
          </div>
        </div>
        <div className="hidden lg:flex w-[50%] bg-gray-800 h-full rounded-lg"></div>
      </div>
    </div>
  );
}
