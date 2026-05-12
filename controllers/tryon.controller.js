import { runTryon } from "../services/replicate.service.js";

export const generateTryon = async (
    req,
    res
) => {
    const { garm_img, human_img, garment_des } = req.body;
    console.log(`[TryOn Controller] Processing request for userId: 135189493112132`);

    // --- KEEP-ALIVE HACK START ---
    // We send a space every 15 seconds to keep Render's proxy from timing out (30s limit)
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');
    
    const keepAliveInterval = setInterval(() => {
        console.log("[Keep-Alive] Sending heartbeat space...");
        // Use res.write to send a space character without closing the connection
        res.write(' '); 
    }, 15000); 
    // --- KEEP-ALIVE HACK END ---

    try {
        if (!garm_img || !human_img) {
            clearInterval(keepAliveInterval);
            console.warn("[TryOn Controller] Missing images in request");
            return res.status(400).end(JSON.stringify({
                success: false,
                message: "Garment image and human image are required",
            }));
        }

        const result = await runTryon(
            human_img,
            garm_img,
            garment_des
        );

        // Replicate output might be an array or a single string
        const image = Array.isArray(result) ? result[0] : result;
        
        console.log(`[TryOn Controller] Success! Image URL: ${image}`);

        // Clear interval and send final response
        clearInterval(keepAliveInterval);
        res.end(JSON.stringify({
            success: true,
            imageUrl: image,
            userId: "135189493112132"
        }));
    } catch (error) {
        console.error("[TryOn Controller] Error generating tryon:", error);
        clearInterval(keepAliveInterval);
        
        // Ensure we send an error response if headers weren't fully closed
        if (!res.writableEnded) {
            res.end(JSON.stringify({
                success: false,
                message: error.message || "Generation failed",
            }));
        }
    }
};