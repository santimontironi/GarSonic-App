import { Router } from "express";
import { RegisterUser, LoginUser, DashboardUser } from "../controllers/user-controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router()

router.post('/register',RegisterUser)
router.post('/login',LoginUser)
router.get('/dashboardUser', verifyToken, DashboardUser)

export default router