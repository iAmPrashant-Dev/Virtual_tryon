import Replicate from "replicate";

const getReplicateToken = () => {
    const token = process.env.REPLICATE_API_TOKEN;
    if (!token) {
        console.error("CRITICAL: REPLICATE_API_TOKEN is not defined in environment variables");
        return null;
    }
    return token.trim();
};

const replicate = new Replicate({
    auth: getReplicateToken(),
});

export const runTryon = async (
    human_img,
    garm_img,
    garment_des
) => {
    const input = {
        human_img,
        garm_img,
        seed: 22,
        steps: 30,
        garment_des
    }

    console.log("Input to Replicate:", JSON.stringify(input, null, 2));

    try {
        console.log("Starting Replicate prediction (cuuupid/idm-vton)...");
        const startTime = Date.now();
        
        const output = await replicate.run(
            "cuuupid/idm-vton:0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985",
            { input }
        );

        const duration = (Date.now() - startTime) / 1000;
        console.log(`Replicate prediction completed in ${duration}s`);
        console.log("Replicate Output:", output);

        return output;
    } catch (error) {
        console.error("Replicate API Error:", error.message);
        throw error;
    }
};