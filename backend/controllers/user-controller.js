import User from "../models/user-model.js"
import bcrypt from 'bcrypt'

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

        const newUser = new User({name,surname,email,username,password:hashPassword})
        await newUser.save()

        res.status(201).json({ message: "Usuario creado correctamente" });
    }
    catch(error){
        return res.status(500).json({message: "Error en registrar el usuario."})
    }
}