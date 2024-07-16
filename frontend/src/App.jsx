import Home from "./components/Navigate/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Header from "./components/Navigate/Header";
import Profile from './components/Navigate/Profile'
import Users from "./components/Admin/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./components/context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<Users/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
