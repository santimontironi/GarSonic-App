import { useContext } from "react";
import { ContextUser } from "./UserContext";

export function UseContextUser(){
    return useContext(ContextUser)
}