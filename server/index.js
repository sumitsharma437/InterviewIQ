import dns from "dns"

// Fix MongoDB Atlas SRV DNS resolution
dns.setServers(["8.8.8.8", "1.1.1.1"])

import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"

import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// API routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/payment", paymentRouter)

// Serve frontend build
const distPath = path.join(__dirname, "../client/dist")
app.use(express.static(distPath))
app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next()
    res.sendFile(path.join(distPath, "index.html"))
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDb()
})