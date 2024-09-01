import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './db/connectDB.js';
import authRoutes from './routers/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Permite manipular as requisicoes com json payload
app.use(express.json());

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log('Server ins runing on port', PORT)
});