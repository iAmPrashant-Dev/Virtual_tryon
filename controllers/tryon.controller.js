import { runTryon } from "../services/replicate.service.js";

export const generateTryon = async (
    req,
    res
) => {
    const { garm_img, human_img, garment_des } = req.body;

    try {
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
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Generation failed",
        });
    }
};