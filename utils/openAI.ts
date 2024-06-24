import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

export const chat = async (prompt: string) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{
            role: "system",
            content: prompt,
        }],
    });

    return completion.choices[0]?.message?.content || "";
};