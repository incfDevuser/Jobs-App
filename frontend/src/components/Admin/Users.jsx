import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Card,
  Badge,
  Title,
} from "@tremor/react";

const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/jobsApp/admin/users",
          {
            withCredentials: true,
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios administradores:", error);
      }
    };

    console.log("Usuario actual:", user);
    if (user && user.isadmin) {
      fetchAdminUsers();
    }
  }, [user]);

  return (
    <div className="mx-auto max-w-4xl mt-7 flex flex-col gap-5  ">
      <Title className="flex gap-2">
        Lista de Usuarios
        <Badge className="rounded-xl">{users.length}</Badge>
      </Title>
      <Card>
        <Table className="mx-auto">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="text-center">Email</TableHeaderCell>
              <TableHeaderCell className="text-center">Rol</TableHeaderCell>
              <TableHeaderCell className="text-center">
                Lenguaje
              </TableHeaderCell>
              <TableHeaderCell className="text-center">Funcion</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell className="text-center">{user.rol}</TableCell>
                <TableCell className="text-center">{user.lenguaje}</TableCell>
                <TableCell className="text-center">
                  {user.isadmin === null ? <Badge className="bg-red-400 text-red-800 border border-red-400">Usuario</Badge> : <Badge className="bg-green-300 text-green-800 border border-green-300">Admin</Badge>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Users;
