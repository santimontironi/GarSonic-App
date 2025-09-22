import app from "./app.js";
import { connect } from "./db.js";

import dotenv from "dotenv";

dotenv.config();

connect()

export default app


