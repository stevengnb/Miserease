import "./App.css";
// import { router } from "@lib/routes/routes";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { router } from "./lib/routes/route";
import UserContextProvider from "./lib/contexts/user-context";


function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className="font-restart">
          {/* <AuthContextProvider> */}
          <RouterComponent />
          {/* </AuthContextProvider> */}
        </div>
      </UserContextProvider>
    </BrowserRouter>
  );
}

function RouterComponent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    
    <Routes>
      {router.map((route: any, index: number) => {
        return <Route key={index} path={route.path} element={route.element} />;
      })}
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
