// Header.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAutenticado, logout, user } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-around items-center p-7 cursor-pointer">
      <div className="bg-blue-200 p-3 rounded-3xl">
        <p className="font-semibold text-blue-800">JobsApp</p>
      </div>
      <div className="flex items-center gap-10">
        {isAutenticado ? (
          <>
            <Link
              to="/profile"
              className="p-2 font-medium rounded-md text-black"
            >
              Perfil
            </Link>
            {user.isadmin && ( 
              <Link
                to="/admin"
                className="p-2 font-medium border-2 rounded-md border-blue-600 text-blue-600"
              >
                Ver Usuarios
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-blue-600 rounded-md p-2 border-2 border-blue-600 font-medium text-white"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="font-medium">
              Home
            </Link>
            <Link
              to="/login"
              className="p-2 font-medium border-2 rounded-md border-blue-600 text-blue-600"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 rounded-md p-2 border-2 border-blue-600 font-medium text-white"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
