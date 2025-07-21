import app from "./app.js";
import { connect } from "./db.js";

connect()
app.listen(3000)
console.log("Running on port 3000")

