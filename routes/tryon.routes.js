import express from "express";
import multer from "multer";
import { generateTryon } from "../controllers/tryon.controller.js";

const router = express.Router();

router.post(
    "/",
    generateTryon
);

export default router;