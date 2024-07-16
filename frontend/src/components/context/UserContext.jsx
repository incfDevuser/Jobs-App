import { useState, useEffect, createContext, useContext } from "react";
import {
  registerUser as apiRegister,
  loginUser as apiLogin,
  logoutUser as apiLogout,
} from "../Api/auth";
import axios from "axios";

export const UserContext = createContext();

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Usuario no tiene un contexto");
  }
  return context;
};
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/jobsApp/profile",
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
        setIsAutenticado(true);
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        setUser(null);
        setIsAutenticado(false);
        setIsAdmin(null);
      }
    };
    checkAuth();
  }, []);
  const signup = async (user) => {
    const response = await apiRegister(user);
    setUser(response.data.registerUser);
    setIsAutenticado(true);
    setIsAdmin(response.data.registerUser.isAdmin);
    return response.data;
  };
  const signin = async (user) => {
    try {
      const response = await apiLogin(user);
      setUser(response.data.user);
      setIsAdmin(response.data.user.isAdmin);
      setIsAutenticado(true);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };
  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      setIsAutenticado(false);
      setIsAdmin(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <UserContext.Provider
      value={{ user, signup, signin, logout, isAdmin, isAutenticado }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
