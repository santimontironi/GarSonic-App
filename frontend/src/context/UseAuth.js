import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function UseAuth(){
    return useContext(AuthContext)
}