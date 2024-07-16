import { Router } from "express";
import { userController } from "../controllers/userControllers.js";
import { isAdmin, authToken } from "../middlewares/authMiddlewares.js";
const router = Router();

//Ruta para obtener los usuarios
router.get("/admin/users", authToken, isAdmin, userController.usuarios);
//Ruta para cerrar sesion
router.post("/logout", userController.logout);
//Ruta para iniciar sesion
router.post("/login", userController.login);
//Ruta para registrar un usuario
router.post("/register", userController.register);
//Ruta para eliminar un usuario
router.delete("/users/:id",  authToken, isAdmin, userController.deleteUser);
//Ruta para ver mi informacion
router.get("/profile", authToken, userController.user)

export default router;
