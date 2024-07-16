import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authToken = (req, res, next) => {
  try {
    const token = req.cookies.token_acceso;
    if (!token) {
      return res
        .status(403)
        .json({ message: "Acceso denegado, no se encontró el token" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token no válido" });
  }
};
export const isAdmin = (req, res, next) => {
  const user = req.user;
  if (!user || !user.isAdmin) {
    console.log(user);
    return res
      .status(403)
      .json({ message: "Acceso denegado. Solo administradores" });
  }
  next();
};
