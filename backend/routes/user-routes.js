import { Router } from "express";
import { RegisterUser, LoginUser, DashboardUser, LogoutUser } from "../controllers/user-controller.js";
import { verifyToken } from "../middlewares/verifyTokenUser.js";
import { upload } from "../middlewares/upload.js";

const router = Router()

router.post('/register', upload.single('profilePhoto'), RegisterUser)
router.post('/login',LoginUser)
router.post('/logout', LogoutUser)
router.get('/dashboardUser', verifyToken, DashboardUser)

export default router