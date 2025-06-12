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
    const body = JSON.parse(request?.body);

    const data = body?.data;
    const key = body?.key;

    if (!data || !key) {
        return new NextResponse("Missing parameters", {
            status: 500,
            headers: Headers
        });
    }

    let fileUrl;
    try {
        const {url} = await put(`blocks/${key}.json`, data, {access: 'public'});
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