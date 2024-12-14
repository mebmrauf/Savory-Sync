import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 2001;

app.use(express.json()); //allows us to accept JSON data in the req.body

app.listen(port, () => {
    connectDB();
    console.log('Express server started at http://localhost:'+port);
});

// DB Pass - gwvnXeBho7kQTFtu