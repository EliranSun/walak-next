import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "sk-proj-OJtDtq5jxMsMOHjYEHbMT3BlbkFJMwh0jsaKRPuCKEskxBnl",
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