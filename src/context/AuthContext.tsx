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

  const saveLoginData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<LoginData>(token); // تحديد النوع هنا
      setLoginData(decodedToken);
      console.log(decodedToken)
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
