import 'dotenv/config'
import express from "express";
import cors from "cors";
import tryonRoutes from "./routes/tryon.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/tryon", tryonRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "VTON Service Running",
    });
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});