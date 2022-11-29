import axios from "axios";
import { Props } from "framer-motion/types/types";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthContextType, UserToken } from "./context.types";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: Props) {
  const { isUserLoggedIn, token:savedToken  } = JSON.parse(localStorage?.getItem('login') || '{}') || { isUserLoggedIn: false, token: null };
  const [login, setLogin] = useState(isUserLoggedIn);
  const [token, setToken] = useState(savedToken);
  const [toggleCard, setToggle] = useState(false);

  async function loginUserwithGmail(gmailToken: string): Promise<void> {
    try {
      const api = "https://QuizApp.sauravkumar007.repl.co/users/signin";
      const response = await axios.post<UserToken>(api, { gmailToken });
      if (response.status === 200) {
        return loginUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function loginUser(data: any) {
    setToken(data.token);
    setLogin(true);
    localStorage?.setItem(
      "login",
      JSON.stringify({ isUserLoggedIn: true, token: data.token })
    );
  }

  function logout() {
    setToken(null);
    setLogin(false);
    localStorage?.removeItem("login");
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        token,
        toggleCard,
        setToggle,
        loginUserwithGmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
