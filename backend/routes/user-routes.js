import { Router } from "express";
import { RegisterUser } from "../controllers/user-controller.js";

const router = Router()

router.post('/register',RegisterUser)

export default router