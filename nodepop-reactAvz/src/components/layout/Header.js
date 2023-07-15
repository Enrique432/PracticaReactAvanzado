import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Icon } from "../../assets/nodepop.svg";
import { logout } from "../Auth/service";
import "./Header.css";
import Button from "../shared/button";


const Header = ({ isLogged, onLogout }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogoutClick = async () => {
    if (showConfirmation) {
      await logout();
      onLogout();
    } else {
      setShowConfirmation(true);
    }
  };

  return (
    <header className="paper">
      <Link to="/">
        <div>
          <Icon width="60" height="60" />
        </div>
      </Link>
      <NavLink to="/adverts/new">Nuevo Anuncio</NavLink> |{" "}
      <NavLink to="/adverts" end>
        Listado de Anuncios
      </NavLink>
      <nav>
        {isLogged ? (
          showConfirmation ? (
            <>
              <Button onClick={handleLogoutClick}>Confirmar</Button>
              <Button onClick={() => setShowConfirmation(false)}>Cancelar</Button>
            </>
          ) : (
            <Button onClick={handleLogoutClick}>Logout</Button>
          )
        ) : (
          <Link to="/login/">
            <Button variant="relleno">Login</Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
