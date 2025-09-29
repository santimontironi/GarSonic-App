import { Router } from "express";
import { helloWorld, RegisterUser, LoginUser, DashboardUser, LogoutUser, CreatePlaylist, GetPlaylists, DeletePlaylist, SearchSongs, AddSongToPlaylist, DeleteSongPlaylist } from "../controllers/user-controller.js";
import { verifyToken } from "../middlewares/verifyTokenUser.js";
import { upload } from "../middlewares/upload.js";

const router = Router()

router.post('/register', upload.single('profilePhoto'), RegisterUser)
router.post('/login',LoginUser)
router.get('/dashboardUser', verifyToken, DashboardUser)
router.post('/createPlaylist',upload.single('coverImage'), verifyToken, CreatePlaylist)
router.get('/playlists',verifyToken,GetPlaylists)
router.delete('/deletePlaylist/:playlistId',verifyToken,DeletePlaylist)
router.post('/logout', LogoutUser)
router.get('/searchSongs', verifyToken, SearchSongs)
router.post('/addSongToPlaylist/:playlistId/:songId', verifyToken, AddSongToPlaylist)
router.delete('/deleteSongPlaylist/:playlistId/:songId', verifyToken, DeleteSongPlaylist)

export default router