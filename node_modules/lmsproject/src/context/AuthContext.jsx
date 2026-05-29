import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {


  const [user, setUser] = useState({
    isAuthenticated: false,
    role: "",
    name: "",
  });

  // Restore login after refresh
  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  // Login
  const login = (userData) => {

    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
  };

  // Logout
  const logout = () => {

    localStorage.removeItem("user");

    setUser({
      isAuthenticated: false,
      role: "",
      name: "",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;