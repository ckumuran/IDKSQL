import axios from "axios";

export async function generateSQL(prompt: string) {

    const response = await axios.post(
        `${process.env.OLLAMA_URL}/api/generate`,
        {
            model: process.env.OLLAMA_MODEL,
            prompt,
            stream: false
        }
    );

    return response.data.response;
}
