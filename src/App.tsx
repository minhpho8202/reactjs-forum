import { createContext } from 'react';
import Header from './layouts/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { IUser } from './types/models';

export const UserContext = createContext<{
  currentUser: IUser | null;
  logout: () => void;
}>({
  currentUser: null,
  logout: () => { },
});

const App = () => {
  const currentUser: IUser | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ currentUser, logout }}>
      <Header />
      <Outlet />
    </UserContext.Provider>
  );
};

export default App
