import 'dotenv/config';
import app from "./src/app.js";
import connectDb from './src/config/db.config.js';
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

connectDb();
app.listen(port, () => {
    console.log(`Server started listening on port ${port}`)
})