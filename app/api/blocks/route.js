import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const Headers = {
    "Cache-Control": "no-store, max-age=0",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
};

export async function POST(request) {
    const data = request?.body;
    if (!data) {
        return new NextResponse("Missing parameters", {
            status: 500,
            headers: Headers
        });
    }

    let fileUrl;
    try {
        const {url} = await put(`blocks/${new Date().toDateString()}.json`, data, {access: 'public'});
        fileUrl = url;
    } catch (error) {
        return new NextResponse(error.message, {
            status: 500,
            headers: Headers
        });
    }

    return NextResponse.json({
        success: true,
        url: fileUrl,
        data,
    }, {
        headers: Headers
    });
}