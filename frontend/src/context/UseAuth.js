import { useContext } from "react";
import { authContext } from "./AuthContext";

export function UseAuth(){
    return useContext(authContext)
}