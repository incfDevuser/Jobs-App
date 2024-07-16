import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center mt-40 cursor-pointer ">
      <div className="p-8 max-w-lg rounded-xl shadow-xl bg-white transform transition-transform duration-500 hover:-translate-y-1">
        {/*Texto de referencia a la funcion*/}
        <div className="flex flex-col items-center">
          <p className="text-4xl mb-4 font-semibold">
            Bienvenido a JobsApp
          </p>
          <p className="mb-4 text-gray-600 text-center w-[250px]">
            La plataforma para monitorear tus tareas y usuarios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
