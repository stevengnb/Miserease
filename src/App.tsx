import "./App.css";
// import { router } from "@lib/routes/routes";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { router } from "./lib/routes/route";

function App() {
  return (
    <BrowserRouter>
      <div className="font-restart">
        {/* <AuthContextProvider> */}
        <RouterComponent />
        {/* </AuthContextProvider> */}
      </div>
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
    </Routes>
  );
}

export default App;
