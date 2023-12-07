import {NextRequest, NextResponse} from "next/server";
import OpenAI from "openai";
import {sql} from "@vercel/postgres";

const openai = new OpenAI({
    apiKey: "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",
});

const storyTitlePrompt = (feeling: string, genre: string, siblingType: string, siblingName: string) => `
   You are a professional storyteller. 
   Create a story title that will encapsulate the feeling of being ${feeling} and that will fit a story with the genre of ${genre}.
   The story will include me, Eliran, and my ${siblingType} ${siblingName}.
   Use light language/terminology.
   Output nothing but the story title!`;

export async function GET(request: NextRequest) {
    const client = await sql.connect();

    try {
        const searchParams = request.nextUrl.searchParams;
        const feeling = searchParams.get("feeling");
        const genre = searchParams.get("genre");
        const siblingName = searchParams.get("sibling_name");

        if (!feeling || !genre || !siblingName) {
            return NextResponse.json({error: "feelings, genre, sibling_name are required"})
        }

        const {rows: [existingTitle]} = await client.sql`
            SELECT * FROM titles WHERE sibling = ${siblingName}
        `;

        if (existingTitle) {
            return NextResponse.json({
                title: existingTitle.title
            });
        }

        const siblingType = ["or", "yahel"].includes(siblingName.toLowerCase()) ? "brother" : "sister";

        let completion = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [{
                role: "system",
                content: storyTitlePrompt(feeling, genre, siblingType, siblingName)
            }],
        });

        const title = completion.choices[0]?.message?.content || "";
        await client.sql`
            INSERT INTO titles (title, sibling, active_chapter_number)
            VALUES (${title}, ${siblingName}, 1)
        `;

        return NextResponse.json({
            title
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({error: error.message})
    } finally {
        client.release();
    }
}

export async function PUT(request: Request) {
    let requestJSON;
    try {
        requestJSON = await request.json();
    } catch (error) {
        return NextResponse.json({
            error: "Invalid request JSON"
        });
    }

    const {id} = requestJSON;

    if (!id) {
        return NextResponse.json({error: "id is required"})
    }

    const client = await sql.connect();

    try {
        const {rows: titles} = await client.sql`
            SELECT * FROM titles WHERE id = ${id}
        `;

        console.log("title", titles);

        await client.sql`
            UPDATE titles SET active_chapter_number = ${titles[0].active_chapter_number + 1}
            WHERE id = ${id}
        `;
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({error: "Something went wrong. Please try again. Is that OK?"})
    } finally {
        client.release();
    }

    return NextResponse.json({
        success: true
    });
}