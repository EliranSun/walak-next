import {NextResponse} from "next/server";

export async function GET(request: Request) {
    let requestJSON;

    try {
        requestJSON = await request.json();
    } catch (error) {
        return NextResponse.json({
            error: "Invalid request JSON"
        });
    }

    const {
        title,
        siblingName,
        genre,
        feeling
    } = requestJSON;
}