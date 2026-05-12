import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN.trim(),
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

    console.log("Input:", input);

    const output = await replicate.run(
        "cuuupid/idm-vton:0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985",
        { input }
    );

    return output;
};