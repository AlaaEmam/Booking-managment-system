import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, ReactNode } from "react";

interface LoginData {
  [key: string]: any; // يمكن استبداله بحقول محددة إذا كنت تعرف محتويات الـ token
}

interface AuthContextProps {
  loginData: LoginData | null;
  saveLoginData: () => void;
}

// توفير نوع افتراضي للـ Context
export let AuthContext = createContext<AuthContextProps | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  // const saveLoginData = () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const decodedToken = jwtDecode<LoginData>(token); // تحديد النوع هنا
  //     setLoginData(decodedToken);
  //     console.log(decodedToken)
  //   }
  // };

  const saveLoginData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Check if the token is in the correct format
      const parts = token.split('.');
      if (parts.length === 3) {
        try {
          const decodedToken = jwtDecode<LoginData>(token); // Specify the type here
          setLoginData(decodedToken);
          console.log(decodedToken);
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      } else {
        console.error("Invalid token format:", token);
        // Handle invalid token format case, e.g., by clearing the token
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData }}>
      {children}
    </AuthContext.Provider>
  );
}
