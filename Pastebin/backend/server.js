import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js"
import pasteRouter from "./routes/pasteR.js";
dotenv.config()


const app= express()
const PORT= process.env.PORT||3003;

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", // React frontend
    methods: ["GET","POST","PUT","DELETE"]
  }));


app.use("/api/pastes",pasteRouter)

console.log("Current directory:", process.cwd());


connectDB();
app.listen(PORT,() => {
    console.log(`the ${PORT} server is allright`)
})