import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  fullName: string;
  company: string;
  position: string;
  phone: string;
  inn?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (
    userData: Omit<User, "id"> & { password: string },
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("optikaline_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    // Имитация API вызова
    const savedUsers = JSON.parse(
      localStorage.getItem("optikaline_users") || "[]",
    );
    const foundUser = savedUsers.find(
      (u: any) => u.phone === phone && u.password === password,
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem(
        "optikaline_user",
        JSON.stringify(userWithoutPassword),
      );
      return true;
    }
    return false;
  };

  const register = async (
    userData: Omit<User, "id"> & { password: string },
  ): Promise<boolean> => {
    const newUser: User = {
      id: Date.now().toString(),
      fullName: userData.fullName,
      company: userData.company,
      position: userData.position,
      phone: userData.phone,
      inn: userData.inn,
      email: userData.email,
    };

    const savedUsers = JSON.parse(
      localStorage.getItem("optikaline_users") || "[]",
    );
    const userExists = savedUsers.some((u: any) => u.phone === userData.phone);

    if (userExists) return false;

    savedUsers.push({ ...newUser, password: userData.password });
    localStorage.setItem("optikaline_users", JSON.stringify(savedUsers));

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("optikaline_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("optikaline_user");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("optikaline_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
