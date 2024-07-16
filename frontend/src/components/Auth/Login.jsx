import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/UserContext";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();
  const { signin, isAutenticado } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signin({
        email: correo,
        password: contraseña,
      });
      toast.success(data.message);
      setCorreo("");
      setContraseña("");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error al registrar usuario");
    }
  };
  
  return (
    <div className="flex justify-center items-center mt-7">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] flex flex-col items-center gap-3 border rounded-lg shadow-2xl p-7"
      >
        <p className="text-2xl font-semibold">Bienvenido A MyJob</p>
        <p className="text-center text-gray-500 text-sm">
          La mejor plataforma para gestionar tus tareas y/o administrar tu
          equipo
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-500">
              Correo Electronico
            </label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="rounded-md h-[40px] w-[280px] p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-500">Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="rounded-md h-[40px] w-[280px] p-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 h-[50px] w-[280px] p-2 rounded-md font-bold text-white mt-2"
        >
          Iniciar Sesion
        </button>
        {/*Redirects link*/}
        <div className="flex gap-1">
          <p>No tienes una cuenta?</p>
          <Link to="/register" className="text-blue-600 font-semibold">
            Registrate
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
