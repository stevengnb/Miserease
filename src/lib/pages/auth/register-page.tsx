import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { UserRegister } from "../../types/user-type";
import { loginUser, registerUser } from "../../services/user-service";
import Loader from "../../../components/loader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Post } from "../../types/post-type";
import AuthPostCard from "./auth-post-card";

export default function RegisterPage() {
  const dummyPost: Post = {
    postID: "1",
    title: "I failed my exam so bad :(",
    postedDate: new Date(),
    content: "This is a sample post about React Context.",
    resolvedComment: "",
    empathizeCount: 42,
  };

  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserRegister>({
    email: "",
    password: "",
    gender: "",
  });
  const [isAbove18, setIsAbove18] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const response = await registerUser(userData);

    if (response.success) {
      setLoading(false);
      toast.success(response.message);
      navigate("/");
      return;
    }

    setLoading(false);
    toast.error(response.message);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-primary">
      <div className="w-full h-full flex justify-center lg:justify-between items-center px-8 py-8">
        <div className="hidden lg:flex w-[50%] bg-gray-800 h-full rounded-lg justify-center items-center">
          <div className="w-96">
            <AuthPostCard post={dummyPost} />
          </div>
        </div>
        <div className="w-96 lg:w-[50%] h-full flex justify-center items-center p-2 sm:p-10">
          <div className="w-full h-full flex flex-col lg:pl-10 xl:pr-48 gap-3 justify-center text-white">
            <div className="text-2xl font-bold text-accent">Register</div>
            <div className="text-base text-gray-500">
              Hello! Enter information about yourself to register!
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
            <div className="flex items-center bg-secondary rounded-3xl px-5 focus-within:border">

              <select
                className="py-4 placeholder:text-sm w-full text-sm bg-transparent focus-visible:outline-none"
                value={userData.gender}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option className="text-black" value="male">Male</option>
                <option className="text-black" value="female">Female</option>
                <option className="text-black" value="other">Other</option>
              </select>
            </div>
            <div className="flex items-center rounded-3xl">
              <input
                id="ageBox"
                type="checkbox"
                checked={isAbove18}
                onChange={(e) => setIsAbove18(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="ageBox" className="text-sm text-accent">
                I confirm that I am above 15 years old.
              </label>
            </div>
            {loading ? (
              <button className=" bg-neutral rounded-3xl text-accent font-bold p-3 flex justify-center items-center hover:cursor-default">
                <Loader />
              </button>
            ) : (
              <button
                className=" bg-neutral rounded-3xl text-accent font-bold p-3 hover:bg-accent hover:text-neutral transition-all duration-300 ease-in-out active:scale-95"
                onClick={handleRegister}
              >
                Register
              </button>
            )}
            <p className="mt-6 text-sm text-accent">
              Already have an account?{" "}
              <span className="font-bold hover:cursor-pointer hover:text-neutral transition-all duration-300 ease-in-out">
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
