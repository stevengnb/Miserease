import { useState } from "react";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="w-full h-full flex justify-between items-center px-8 py-8">
        <div className="w-[50%] h-full justify-center items-center p-10">
          <div className="w-full h-full flex flex-col pl-10 pr-52 gap-3 justify-center text-white">
            <div className="text-2xl font-bold">Login</div>
            <div className="text-base text-gray-500">
              Hello! Enter your details to log in.
            </div>
            <div className="w-full flex items-center">
              <input
                className="py-4 px-2 rounded-3xl placeholder:text-sm w-full indent-3 text-sm bg-gray-700"
                placeholder="Enter your email"
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="w-full flex items-center">
              <input
                className="py-4 px-2 rounded-3xl placeholder:text-sm w-full indent-3 text-sm bg-gray-700"
                placeholder="Enter your password"
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
            <button className="bg-orange-300 rounded-3xl text-black p-3">
              Login
            </button>
          </div>
        </div>
        <div className="w-[50%] bg-gray-800 h-full rounded-lg"></div>
      </div>
    </div>
  );
}
