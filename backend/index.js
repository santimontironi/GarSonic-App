import app from "./app.js";
import { connect } from "./db.js";
import serverless from "serverless-http";

import dotenv from "dotenv";

dotenv.config();

connect()

export default serverless(app)


