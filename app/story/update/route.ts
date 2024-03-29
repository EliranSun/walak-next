import {NextResponse} from "next/server";
import {db} from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        const client = await db.connect();
        const requestJSON = await request.json();
        const {chapterId, content}: { chapterId: string, content: string } = requestJSON;

        if (!chapterId || !content) {
            return NextResponse.json({error: "Missing required fields."});
        }

        await client.sql`
            UPDATE chapters SET content = ${content} WHERE id = ${chapterId}
        `;

        return NextResponse.json({success: true});
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({error: "Something went wrong. Please try again. Is that OK?"});
    }
}