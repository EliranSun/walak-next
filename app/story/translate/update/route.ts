import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        const requestJSON = await request.json();
        const {chapterId, content}: { chapterId: string, content: string } = requestJSON;

        if (!chapterId || !content) {
            return NextResponse.json({error: "Missing required fields."});
        }

        console.log("Updating chapter translation...", {chapterId, content});
        await sql`
            UPDATE chapters SET translation = ${content} WHERE id = ${chapterId}
        `;

        return NextResponse.json({success: true});
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({error: "Something went wrong. Please try again. Is that OK?"});
    }
}