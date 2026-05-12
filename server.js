import 'dotenv/config'
import express from "express";
import cors from "cors";
import tryonRoutes from "./routes/tryon.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - Request received`);
    next();
});

app.use("/api/tryon", tryonRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "VTON Service Running",
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});