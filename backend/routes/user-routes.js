import { Router } from "express";
import { RegisterUser, LoginUser } from "../controllers/user-controller.js";
import { RegisterArtist, LoginArtist } from "../controllers/artist-controller.js";

const router = Router()

router.post('/register',RegisterUser)
router.post('/login',LoginUser)
router.post('/registerArtist',RegisterArtist)
router.post('/loginArtist',LoginArtist)

export default router