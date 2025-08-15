import Artist from "../models/artist-model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


export const RegisterArtist = async (req,res) => {
    try{
        const {email,password,artistName,genre,bio} = req.body

        const existingArtist = await Artist.findOne({email})

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

export const LoginArtist = async (req,res) => {
    try{
        const {identifier,password} = req.body

        const artist = await Artist.findOne({
            $or: [{ email: identifier }, { artistName: identifier }]
        });

        if(!artist){
            return res.status(404).json({message:"Artista no encontrado."})
        }
        
        const validPassword = await bcrypt.compare(password,artist.password)

        if(!validPassword){
            return res.status(401).json({message:"Contraseña incorrecta."})
        }

        const token = jwt.sign(
            {id:artist._id}, //payload, datos del artista
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.cookie("tokenArtist",token,{
            httpOnly: true,         // no accesible desde JS del frontend
            sameSite: "Lax",      // más permisivo para desarrollo local
            maxAge: 86400000      // 1 día
        })

        res.json({ message: "Login exitoso", artist })
    }
    catch(error){
        return res.status(500).json({message: "Error al ingresar como artista."})
    }
}
