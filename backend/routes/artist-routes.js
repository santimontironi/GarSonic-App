import { Router } from "express"
import { RegisterArtist, LoginArtist } from "../controllers/artist-controller.js"
import { verifyToken } from "../middlewares/verifyTokenArtist.js";
import { upload } from "../middlewares/upload.js";

const router = Router()

router.post('/registerArtist', upload.single('profilePhoto'), RegisterArtist)
router.post('/loginArtist',LoginArtist)

export default router