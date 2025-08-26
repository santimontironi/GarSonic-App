import { Router } from "express"
import { RegisterArtist, LoginArtist, DashboardArtist, UploadSong, GetSongs, Logout } from "../controllers/artist-controller.js"
import { verifyToken } from "../middlewares/verifyTokenArtist.js";
import { upload } from "../middlewares/upload.js";

const router = Router()

router.post('/registerArtist', upload.single('profilePhoto'), RegisterArtist)
router.post('/loginArtist',LoginArtist)
router.get('/dashboardArtist', verifyToken, DashboardArtist)
router.post('/uploadSong', verifyToken, upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'audioFile', maxCount: 1 }]), UploadSong)
router.get('/mySongs',verifyToken,GetSongs)
router.post('/logoutArtist', Logout)

export default router