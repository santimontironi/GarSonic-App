import User from "../models/user-model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Playlist from "../models/playlist-model.js";
import Dayjs from 'dayjs'
import Song from "../models/song-model.js";
import cloudinary from "./cloudinary.js";

dotenv.config();

export const RegisterUser = async (req, res) => {
    try {
        const { name, surname, email, username, password } = req.body

        console.log("🧩 Body recibido:", req.body);
        console.log("🖼️ Archivo recibido:", req.file);

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "Ya existe un usuario con estas credenciales." })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(fileBase64, {
            folder: "users_profiles",
        });

        const profilePhoto = result.secure_url;

        const newUser = new User({ name, surname, email, username, password: hashPassword, profilePhoto })
        await newUser.save()

        res.status(201).json({ message: "Usuario creado correctamente" });
    }
    catch (error) {
        console.error("Error en RegisterUser:", error.message);
        return res.status(500).json({ message: "Error en registrar el usuario.", error: error.message })
    }
}

export const LoginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body

        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta." })
        }

        const token = jwt.sign(
            { id: user._id }, //payload, datos del usuario
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 86400000
        });

        res.json({ message: "Login exitoso", user })
    }
    catch (error) {
        console.error("Error en LoginUser:", error);
        return res.status(500).json({ message: "Error al ingresar como usuario.", error: error.message })
    }
}

export const DashboardUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ authenticated: true, user });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener datos del usuario", error: error.message });
    }
}

export const CreatePlaylist = async (req, res) => {
    try {

        const userId = req.userId;

        const { playlistName, description } = req.body;

        const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(fileBase64, {
            folder: "playlists_covers",
        });

        const coverImage = result.secure_url;

        const newPlaylist = new Playlist({
            playlistName,
            description,
            owner: userId,
            coverImage
        });

        await newPlaylist.save();

        res.status(201).json({ message: "Lista de reproducción creada correctamente", playlist: newPlaylist });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al crear la lista de reproducción", error: error.message });
    }
}

export const GetPlaylists = async (req, res) => {
    try {
        const userId = req.userId;

        const playlists = await Playlist.find({ owner: userId, active: true }).populate({ path: "songs", populate: { path: "artist" } });

        const playlistFormated = playlists.map(playlist => ({
            ...playlist.toObject(),
            createdAt: Dayjs(playlist.createdAt).format('DD/MM/YYYY')
        }))

        res.json(playlistFormated);
    }
    catch (error) {
        return res.status(500).json({ message: "Error al obtener las listas de reproducción", error: error.message });
    }
}

export const DeletePlaylist = async (req, res) => {
    try {
        const playlistId = req.params.playlistId;
        const userId = req.userId;

        const playlist = await Playlist.findOneAndUpdate(
            { _id: playlistId, owner: userId },
            { active: false },
            { new: true } // devuelve el documento actualizado
        );

        await Playlist.findByIdAndDelete(playlistId);

        res.json({ message: "Lista de reproducción eliminada correctamente", playlist });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al eliminar la lista de reproducción", error: error.message });
    }
}

export const SearchSongs = async (req, res) => {
    try {
        const { q } = req.query;

        // se buscan canciones activas y solo con artistas activos
        const songs = await Song.find({ active: true })
            .populate({
                path: "artist", // campo que referencia a otro modelo
                match: { isVerified: true }, // condición extra: solo artistas verificados
                select: "artistName", // qué campos traer del artista (solo artistName)
            });

        // se filtran las canciones que sí tienen artista válido
        const validSongs = songs.filter(song => song.artist);

        // se filtran solo las que coincidan con título o artista
        const filteredSongs = validSongs.filter(song =>
            song.title.match(new RegExp(q, "i")) ||
            song.artist.artistName.match(new RegExp(q, "i"))
        );

        res.json(filteredSongs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error buscando canciones." });
    }
};

export const AddSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;
        const userId = req.userId;

        const playlist = await Playlist.findOne({ _id: playlistId, owner: userId, active: true });

        if (!playlist) {
            return res.status(404).json({ message: "Playlist no encontrada" });
        }

        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ message: "La canción ya está en la playlist" });
        }

        playlist.songs.push(songId);
        await playlist.save();

        res.json({ message: "Canción agregada correctamente", playlist });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar canción a playlist.", error: error.message });
    }
};

export const DeleteSongPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;
        const userId = req.userId;

        const playlist = await Playlist.findOne({ _id: playlistId, owner: userId, active: true });

        const song = await Song.findById(songId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist no encontrada" });
        }

        if (!song) {
            return res.status(404).json({ message: "Canción no encontrada" });
        }

        playlist.songs.pull(songId);
        await playlist.save();

        res.json({
            message: "Canción eliminada de la playlist.",
            playlist
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la cancion de la playlist.", error: error.message });
    }
}

export const LogoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true
    });
    res.json({ message: "Logout exitoso" });
}










