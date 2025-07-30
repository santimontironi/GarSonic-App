import { Router } from "express";
import { RegisterUser, LoginUser, DashboardUser } from "../controllers/user-controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/upload.js";

const router = Router()

router.post('/register', upload.single('profilePhoto'), RegisterUser)
router.post('/login',LoginUser)
router.get('/dashboardUser', verifyToken, DashboardUser)

export default router