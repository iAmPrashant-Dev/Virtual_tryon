import { runTryon } from "../services/replicate.service.js";

export const generateTryon = async (
    req,
    res
) => {
    const { garm_img, human_img, garment_des } = req.body;
    console.log(`[TryOn Controller] Processing request for userId: 135189493112132`);

    try {
        if (!garm_img || !human_img) {
            console.warn("[TryOn Controller] Missing images in request");
            return res.status(400).json({
                success: false,
                message: "Garment image and human image are required",
            });
        }

        const result = await runTryon(
            human_img,
            garm_img,
            garment_des
        );

        const image = result.toString()

        res.json({
            success: true,
            imageUrl: image,
            userId: "135189493112132"
        });
    } catch (error) {
        console.error("[TryOn Controller] Error generating tryon:", error);

        res.status(500).json({
            success: false,
            message: error.message || "Generation failed",
        });
    }
};