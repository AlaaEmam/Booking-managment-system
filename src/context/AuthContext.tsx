
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of the LoginData
interface LoginData {
  token?: string;
  role?: string;
  userName?: string;
  id?: string;
  [key: string]: any;
}

// Define the context properties
interface AuthContextProps {
  loginData: LoginData | null;
  saveLoginData: (token: string) => void;
  clearLoginData: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

// AuthContext Provider Component
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  const saveLoginData = (userData: any) => {
    try {
      console.log(userData);

      setLoginData({
        token: userData?.data?.data?.token,
        role: userData?.data?.data?.user?.role,
        userName: userData.data.data.user.userName,
      });
      console.log("Login data saved:", userData);
    } catch (error) {
      console.error("Failed to save login data:", error);
      clearLoginData();
    }
  };
  const clearLoginData = () => {
    localStorage.removeItem("token");
    setLoginData(null);
  };

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData, clearLoginData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

// Export AuthContext and useAuth
export { AuthContext, useAuth };
