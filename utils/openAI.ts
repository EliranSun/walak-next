import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "sk-proj-Axqb4TptAhtI6yaifxrpT3BlbkFJBtEKykFkTGDGvwVyMPUO",
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