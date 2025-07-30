import User from "../models/user-model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const RegisterUser = async (req,res) => {
    try{
        const {name,surname,email,username,password} = req.body

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if(existingUser){
            return res.status(400).json({message: "Ya existe un usuario con estas credenciales."})
        }

        const hashPassword = await bcrypt.hash(password,10)

        const profilePhoto = req.file ? req.file.filename : null

        const newUser = new User({name,surname,email,username,password:hashPassword,profilePhoto})
        await newUser.save()

        res.status(201).json({ message: "Usuario creado correctamente" });
    }
    catch(error){
        return res.status(500).json({message: "Error en registrar el usuario."})
    }
}

export const LoginUser = async (req,res) => {
    try{
        const {identifier,password} = req.body

        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if(!user){
            return res.status(404).json({message:"Usuario no encontrado."})
        }
        
        const validPassword = await bcrypt.compare(password,user.password)

        if(!validPassword){
            return res.status(401).json({message:"Contraseña incorrecta."})
        }

        const token = jwt.sign(
            {id:user._id}, //payload, datos del usuario
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.cookie("token",token,{
            httpOnly: true,         // no accesible desde JS del frontend
            sameSite: "Strict",     // evitar CSRF
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        })

        res.json({ message: "Login exitoso", user })
    }
    catch(error){
        return res.status(500).json({message: "Error al ingresar como usuario."})
    }
}

export const DashboardUser = async (req,res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        res.json({ user });
    } catch (error) {
        console.error("Error en DashboardUser:", error);
        return res.status(500).json({ message: "Error al obtener datos del usuario" });
    }
}

export const LogoutUser = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout exitoso" });
}










