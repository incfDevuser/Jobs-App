import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/UserContext";

const Register = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("");
  const [lenguaje, setLenguaje] = useState("");
  const navigate = useNavigate();
  const { signup, isAutenticado } = useAuth();

  useEffect(() => {
    if (isAutenticado) {
      navigate("/");
    }
  }, [isAutenticado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup({
        email: correo,
        password: contraseña,
        rol,
        lenguaje,
      });
      toast.success(data.message);
      setCorreo("");
      setContraseña("");
      setRol("");
      setLenguaje("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="flex justify-center items-center m-7">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] flex flex-col items-center gap-3 border rounded-lg shadow-2xl p-7"
      >
        <div className="flex flex-col">
          <p className="font-bold text-xl">Informacion Personal</p>
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
        <div>
          <p className="font-bold text-xl">Informacion de trabajo</p>
          <div className="flex flex-col gap-1">
            <label className="text-gray-500">Rol</label>
            <input
              type="text"
              placeholder="Ingresa tu rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="rounded-md h-[40px] w-[280px] p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-500">Lenguaje</label>
            <input
              type="text"
              placeholder="Ingresa tu stack"
              value={lenguaje}
              onChange={(e) => setLenguaje(e.target.value)}
              className="rounded-md h-[40px] w-[280px] p-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 h-[50px] w-[280px] p-2 rounded-md font-bold text-white mt-2"
        >
          Registrarse
        </button>
        {/*Redirects link*/}
        <div className="flex gap-1">
          <p>Ya tienes una cuenta?</p>
          <Link to="/login" className="text-blue-600 font-semibold">
            Inicia Sesion
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
