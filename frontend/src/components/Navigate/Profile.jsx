import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/UserContext";
import { Link } from 'react-router-dom'
const Profile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/jobsApp/profile",
          {
            withCredentials: true,
          }
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil de usuario", error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  if (!userProfile) {
    return <div className="text-center">Cargando perfil...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-48 gap-10 cursor-pointer">
      <p>
        Hola <strong>{userProfile.email}</strong> tu puesto es{" "}
        <strong className="text-blue-500">{userProfile.rol}</strong> en <strong>{userProfile.lenguaje}</strong>
      </p>
      <Link to="/" className="text-white bg-[#ffb703] p-2 rounded-lg">
        Volver al Home
      </Link>
    </div>
  );
};

export default Profile;
