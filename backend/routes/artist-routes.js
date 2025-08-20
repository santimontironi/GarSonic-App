import { Router } from "express"
import { RegisterArtist, LoginArtist, DashboardArtist, Logout } from "../controllers/artist-controller.js"
import { verifyToken } from "../middlewares/verifyTokenArtist.js";
import { upload } from "../middlewares/upload.js";

const router = Router()

router.post('/registerArtist', upload.single('profilePhoto'), RegisterArtist)
router.post('/loginArtist',LoginArtist)
router.get('/dashboardArtist', verifyToken, DashboardArtist)
router.post('/logoutArtist', Logout)

export default router