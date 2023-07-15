import { useState } from "react";
import { login } from "./service";
import Button from "../shared/button";
import { useLocation, useNavigate } from "react-router-dom";
import "./loginPage.css";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [keepSession, setKeepSession] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await login(credentials, keepSession);
      setIsLoading(false);
      
      onLogin();
      
      const to = location.state?.from?.pathname || "/";
      navigate(to);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      return;
    }
  };
  /* datos en el formulario */
  const handleChange = (event) => {
    
     if (event.target.name === "email") {
       setCredentials({ ...credentials, email: event.target.value });
     }
     if (event.target.name === "password") {
       setCredentials({ ...credentials, password: event.target.value });
     }
    
  };

  const handleKeepSessionChange = (event) => {
    setKeepSession(event.target.checked); //
  };

  const buttonDisabled =
    !credentials.email || !credentials.password || isLoading;
  return (
    <div     
      style={{
        textAlign: "center",
      }}
    >
      <h1>Log in to NodePop</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={credentials.email}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
          />
        </div>
        <div>
          <Button type="submit"  disabled={buttonDisabled}>
            Log in
          </Button>
          <input
            type="checkbox"
            name="check"
            onChange={handleKeepSessionChange}
            checked={keepSession}
          />
          <label>Recordar</label>
        </div>
      </form>
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default LoginPage;
