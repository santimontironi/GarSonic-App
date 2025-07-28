import app from "./app.js";
import { connect } from "./db.js";
import cookieParser from 'cookie-parser';

import dotenv from "dotenv";

dotenv.config();

app.use(cookieParser());

connect()
app.listen(process.env.PORT)
console.log("Running app")

