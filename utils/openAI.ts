import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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",
});

export const chat = async (prompt: string) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{
            role: "system",
            content: prompt,
        }],
    });

    return completion.choices[0]?.message?.content || "";
};