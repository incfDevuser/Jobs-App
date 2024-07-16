import pool from "../config/db.js";
const getUsers = async () => {
  try {
    const query = "SELECT * FROM usuarios";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion");
  }
};
const findUser = async (email) => {
  try {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const response = await pool.query(query, [email]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion");
  }
};
const createUser = async ({ email, password, rol, lenguaje, isadmin }) => {
  try {
    const query =
      "INSERT INTO usuarios(email, password, rol, lenguaje, isadmin) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [email, password, rol, lenguaje, isadmin];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion");
  }
};
const deleteUser = async (id) => {
  try {
    const query = "DELETE FROM usuarios WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion");
  }
};
export const userModel = {
  getUsers,
  createUser,
  deleteUser,
  findUser,
};
