import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connctDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

connctDB();

const app = express();
//Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));
//Api
app.use("/api/user", userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
