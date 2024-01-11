import {NextResponse} from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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",
});

export async function POST(request: Request) {
    let requestJSON;
    try {
        requestJSON = await request.json();

        const {personName, content, genre, theme} = requestJSON;

        if (!content || !genre || !theme || !personName) {
            return NextResponse.json({error: "content is required"})
        }

        let completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{
                role: "system",
                content: `You are a professional storyteller. 
                Create a title for the short story below, that contains the names "Eliran" and ${personName}.
                The story is of the ${genre} genre and has a ${theme} theme.
                Output nothing but the title!
                
                The story:
                ${content}`
            }],
        });

        const title = completion.choices[0]?.message?.content || "";

        return NextResponse.json({
            title
        });
    } catch (error) {
        return NextResponse.json({
            error: "Something went wrong. Please try again."
        });
    }
}
