import Artist from "../models/artist-model.js"
import Song from "../models/song-model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import Dayjs from 'dayjs'
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import cloudinary from "./cloudinary.js";

dotenv.config();

export const RegisterArtist = async (req, res) => {
    try {
        const { email, password, artistName, genre, description } = req.body
        

        const existingArtist = await Artist.findOne({ email })

        if (existingArtist) {
            return res.status(400).json({ message: "Ya existe un artista con este correo electrónico." })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        // se genera un token de verificación único
        const token = crypto.randomBytes(32).toString("hex");

        const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(fileBase64, {
            folder: "artists_profiles",
        });

        const profilePhoto = result.secure_url;

        const newArtist = new Artist({ profilePhoto, email, password: hashPassword, artistName, genre, description, verificationToken: token, isVerified: false })

        await newArtist.save()

        // Configuración del transporte de nodemailer para enviar el mail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // URL de verificación
        const verifyUrl = `${process.env.FRONTEND_URL}/verify/${token}`;

        // Envío del correo de verificación
        try {
            await transporter.sendMail({
                from: `"GarSonic" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Confirma tu cuenta de artista",
                html:
                    `
                    <div style="background-color: #6a0dad; color: #fff; padding: 40px; font-family: Arial, sans-serif; text-align: center; border-radius: 10px;">
                        <h1 style="color: #fff;">¡Hola ${artistName}!</h1>
                        <p style="font-size: 16px; color: #fff;">Gracias por registrarte en GarSonic. Para activar tu cuenta, por favor confirma haciendo clic en el botón de abajo:</p>
                        <a href="${verifyUrl}" 
                        style="display: inline-block; padding: 15px 25px; margin-top: 20px; background-color: #8a2be2; color: #fff; text-decoration: none; font-weight: bold; border-radius: 5px;">
                        Confirmar Cuenta
                        </a>
                        <p style="margin-top: 30px; font-size: 12px; color: #eee;">Si no te registraste, ignora este correo.</p>
                    </div>
                `
            });
        } catch (error) {
            console.error("Error al enviar el correo de verificación:", error);
        }

        res.status(201).json({
            message: "Registro exitoso. Revisa tu correo para confirmar la cuenta.",
            artist: {
                email: newArtist.email,
                artistName: newArtist.artistName,
                isVerified: newArtist.isVerified
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Error al registrar un artista" })
    }
}

export const VerifyArtist = async (req, res) => {
    try {
        const { token } = req.params;

        // Buscar artista con ese token
        const artist = await Artist.findOne({ verificationToken: token });

        if (!artist) {
            return res.status(400).json({ message: "Token inválido o expirado." });
        }

        // Marcar como verificado
        artist.isVerified = true;
        await artist.save();

        res.json({ message: "Cuenta verificada correctamente. Ya puedes iniciar sesión.", artist });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al verificar la cuenta." });
    }
}

export const LoginArtist = async (req, res) => {
    try {
        const { identifier, password } = req.body

        const artist = await Artist.findOne({
            $or: [{ email: identifier }, { artistName: identifier }],
        });

        if (!artist) {
            return res.status(404).json({ message: "Artista no encontrado." })
        }

        if (!artist.isVerified) {
            return res.status(403).json({ message: "Cuenta no verificada. Revisa tu correo para verificar tu cuenta." });
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

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,         
            sameSite: "none", 
            maxAge: 86400000
        });

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

        const artist = await Artist.findById(artistId)

        if (!artist) {
            return res.status(404).json({ message: "Artista no encontrado." });
        }

        if (!artist.isVerified) {
            return res.status(403).json({ message: "Tu cuenta no está verificada. No puedes subir canciones." });
        }

        const fileBase64Cover = `data:${req.files.coverImage[0].mimetype};base64,${req.files.coverImage[0].buffer.toString("base64")}`;

        const resultCover = await cloudinary.uploader.upload(fileBase64Cover, {
            folder: "songs_covers",
        });

        const coverImage = resultCover.secure_url
        
        const audioFile = req.files.audioFile[0].path;

        const newSong = new Song({ title, coverImage, genre, audioFile, releaseDate, duration, artist: artistId })

        await newSong.save()

        res.status(201).json({ message: "Canción agregada correctamente" });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al subir la canción", error })
    }
}

export const GetSongs = async (req, res) => {
    try {
        const artistId = req.artistId

        const artist = await Artist.findById(artistId)

        if (!artist) {
            return res.status(404).json({ message: "Artista no encontrado." });
        }

        if (!artist.isVerified) {
            return res.status(403).json({ message: "Tu cuenta no está verificada. No puedes subir canciones." });
        }

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

        const artist = await Artist.findById(artistId)

        if (!artist) {
            return res.status(404).json({ message: "Artista no encontrado." });
        }

        if (!artist.isVerified) {
            return res.status(403).json({ message: "Tu cuenta no está verificada. No puedes subir canciones." });
        }

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
            sameSite: "none",
            secure: true
        });
        res.json({ message: "Logout exitoso" });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al cerrar sesión" })
    }
}










