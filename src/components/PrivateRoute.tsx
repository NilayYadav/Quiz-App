import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export function PrivateRoute({ path, element}:{ path:string, element:JSX.Element}){
    const { login } = useAuth();
    return login ? <Route path={path} element={element} /> : <Navigate state={{from: path}} replace to="/"/> 
}