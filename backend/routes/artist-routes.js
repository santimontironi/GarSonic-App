import { Router } from "express"
import { RegisterArtist, LoginArtist } from "../controllers/artist-controller.js"

const router = Router()

router.post('/registerArtist',RegisterArtist)
router.post('/loginArtist',LoginArtist)

export default router