import { Router } from "express";
import { RegisterUser, LoginUser, DashboardUser, LogoutUser, CreatePlaylist, GetPlaylists, DeletePlaylist, SearchSongs, AddSongToPlaylist } from "../controllers/user-controller.js";
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

export default router