import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Joi from "joi";

dotenv.config();
//Controlador para obtener los usuarios
const usuarios = async (req, res) => {
  try {
    const usuarios = await userModel.getUsers();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};
const user = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await userModel.findUser(email);
    if (!user) {
      res.send("Usuario no existe");
    }
    res.send(user);
  } catch (error) {
    console.error("Error en getUser:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUser(email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Este usuario no existe, registrate" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incoreccta" });
    }
    //Definir el payload
    const payload = {
      id: user.id,
      email: user.email,
      rol: user.rol,
      lenguaje: user.lenguaje,
      isAdmin: user.isadmin,
    };
    //Crear el token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //
    res
      .cookie("token_acceso", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      })
      .send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
const logout = async (req, res) => {
  res.clearCookie("token_acceso").json({ message: "Usuario deslogeado" });
};
const register = async (req, res) => {
  try {
    const { email, password, rol, lenguaje } = req.body;
    const ifExist = await userModel.findUser(email);
    if (ifExist) {
      return res
        .status(400)
        .json({ message: "Usuario ya existe, cambia los datos" });
    }
    // Definir el esquema de validación con Joi
    const registerSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      rol: Joi.string().min(10).max(225).required(),
      lenguaje: Joi.string().min(1).max(225).required(),
    });
    const { error } = registerSchema.validate(
      { email, password, rol, lenguaje },
      { presence: "required" }
    );
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const registerUser = await userModel.createUser({
      email,
      password: hashedPassword,
      rol,
      lenguaje,
    });
    // Generar el token
    const payload = {
      id: registerUser.id,
      email: registerUser.email,
      rol: registerUser.rol,
      lenguaje: registerUser.lenguaje,
      isAdmin: registerUser.isadmin,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res
      .cookie("token_acceso", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      })
      .status(201)
      .json({ message: "Usuario creado correctamente", registerUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.deleteUser(id);
    if (!user) {
      return res.status(400).json({ message: "No se encontró el usuario" });
    }
    const deletedUser = await userModel.deleteUser(id);
    return res.json({ message: "Usuario eliminado", deletedUser });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
export const userController = {
  usuarios,
  user,
  register,
  deleteUser,
  login,
  logout,
};
