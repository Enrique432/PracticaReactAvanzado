import { useState } from "react";
import "./App.css";
import LoginPage from "./components/Auth/LoginPage";
import "./components/adverts/AdvertsPage";
import AdvertsPage from "./components/adverts/AdvertsPage";
import NewAdvertPage from "./components/adverts/NewAdvertPage";
import { Route, Routes, Navigate } from "react-router-dom";
import AdvertPage from "./components/adverts/AdvertPage";
import RequireAuth from "./components/Auth/RequireAuth";

function App({ isInitillyLogged }) {

  const [isLogged, setIsLogged] = useState(isInitillyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <div className="paper">
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route
          path="/adverts"
          element={
          <RequireAuth isLogged={isLogged}>
          <AdvertsPage onLogout={handleLogout} isLogged={isLogged} />
          </RequireAuth>}
        />

        <Route
          path="/adverts/:id"
          element={
          <RequireAuth isLogged={isLogged}>
          <AdvertPage onLogout={handleLogout} isLogged={isLogged} />
          </RequireAuth>}
        />
        <Route
          path="/adverts/new"
          element={
            <RequireAuth isLogged={isLogged}>
              <NewAdvertPage onLogout={handleLogout} isLogged={isLogged} />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route path="/404" element={<div>404 || Not Found</div>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
