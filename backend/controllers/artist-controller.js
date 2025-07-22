import Artist from "../models/artist-model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


export const RegisterArtist = async (req,res) => {
    try{
        const {email,password,artistName,genre,bio} = req.body

        const existingArtist = Artist.findOne({email})

        if(existingArtist){
            return res.status(400).json({message: "Ya existe un artista con este correo electrónico."})
        }

        const hashPassword = await bcrypt.hash(password,10)

        const newArtist = new Artist({email,password:hashPassword,artistName,genre,bio})

        await newArtist.save()

        res.status(201).json({ message: "Usuario creado correctamente" });

    }
    catch(error){
        return res.status(500).json({message: "Error al registrar un artista"})
    }
}

export const LoginArtist = async () => {

}
