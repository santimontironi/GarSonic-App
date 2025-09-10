import Artist from "../models/artist-model.js"
import Song from "../models/song-model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import Dayjs from 'dayjs'
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const RegisterArtist = async (req, res) => {
    try {
        const { email, password, artistName, genre, description } = req.body
        const profilePhoto = req.file.filename;

        const existingArtist = await Artist.findOne({ email })

        if (existingArtist) {
            return res.status(400).json({ message: "Ya existe un artista con este correo electrónico." })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        // se genera un token de verificación único
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const newArtist = new Artist({ profilePhoto, email, password: hashPassword, artistName, genre, description, verificationToken, isVerified: false })

        await newArtist.save()

        // Configuración del transporte de nodemailer para enviar el mail
        const transporter = nodemailer.createTransport({
            service: "gmail", // o tu SMTP
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // URL de verificación
        const verifyUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

        // Envío del correo de verificación
        await transporter.sendMail({
            from: `"GarSonic" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Confirma tu cuenta de artista",
            html: `<p>Hola ${artistName},</p>
                   <p>Por favor confirma tu cuenta haciendo clic en el siguiente enlace:</p>
                   <a href="${verifyUrl}">${verifyUrl}</a>`
        });

        res.status(201).json({ message: "Registro exitoso. Revisa tu correo para confirmar la cuenta." });

    } catch (error) {
        return res.status(500).json({ message: "Error al registrar un artista" })
    }
}

export const LoginArtist = async (req, res) => {
    try {
        const { identifier, password } = req.body

        const artist = await Artist.findOne({
            $or: [{ email: identifier }, { artistName: identifier }]
        });

        if (!artist) {
            return res.status(404).json({ message: "Artista no encontrado." })
        }

        const validPassword = await bcrypt.compare(password, artist.password)

        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta." })
        }

        const token = jwt.sign(
            { id: artist._id }, //payload, datos del artista
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("tokenArtist", token, {
            httpOnly: true,         // no accesible desde JS del frontend
            sameSite: "Lax",      // más permisivo para desarrollo local
            maxAge: 86400000      // 1 día
        })

        res.json({ message: "Login exitoso", artist })
    }
    catch (error) {
        return res.status(500).json({ message: "Error al ingresar como artista." })
    }
}

export const DashboardArtist = async (req, res) => {
    try {
        const artistId = req.artistId;
        const artist = await Artist.findById(artistId);

        if (!artist) {
            return res.status(404).json({ message: "Artista no encontrado" });
        }

        res.json({ authenticated: true, artist });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al obtener datos del artista." })
    }
}

export const UploadSong = async (req, res) => {
    try {
        const artistId = req.artistId
        const { title, genre, releaseDate, duration } = req.body

        const coverImage = req.files.coverImage[0].filename;
        const audioFile = req.files.audioFile[0].filename;

        const newSong = new Song({ title, coverImage, genre, audioFile, releaseDate, duration, artist: artistId })

        await newSong.save()

        res.status(201).json({ message: "Canción agregada correctamente" });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al subir la canción" })
    }
}

export const GetSongs = async (req, res) => {
    try {
        const artistId = req.artistId

        // se obtienen todas las canciones cuyo campo 'artist' sea igual al id del artista logueado (req.artistId)
        const songs = await Song.find({ artist: artistId, active: true }).populate("artist", "artistName");

        // Formatear las fechas de lanzamiento
        const formattedSongs = songs.map(song => ({
            ...song.toObject(),
            releaseDate: Dayjs(song.releaseDate).format('DD/MM/YYYY')
        }));

        res.json(formattedSongs)
    }
    catch (error) {
        return res.status(500).json({ message: "Error al obtener canciones." })
    }
}

export const DeleteSong = async (req, res) => {
    try {
        const { idSong } = req.params;
        const artistId = req.artistId;

        const song = await Song.findOneAndUpdate(
            { _id: idSong, artist: artistId },
            { active: false },
            { new: true } // devuelve el documento actualizado
        );

        if (!song) {
            return res.status(404).json({ message: "Canción no encontrada o no autorizada." });
        }

        return res.json({ message: "Canción desactivada correctamente.", song });
    } catch (error) {
        return res.status(500).json({ message: "Error al desactivar la canción." });
    }
};

export const Logout = async (req, res) => {
    try {
        res.clearCookie("tokenArtist", {
            httpOnly: true,
            sameSite: "Lax"
        });
        res.json({ message: "Logout exitoso" });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al cerrar sesión" })
    }
}










