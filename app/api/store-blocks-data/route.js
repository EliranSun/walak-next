import { NextResponse } from "next/server";
import { put, get } from "@vercel/blob";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const Headers = {
    "Cache-Control": "no-store, max-age=0",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
};

export async function POST(request) {
    const body = await request.json();

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
        const { url } = await put(`blocks/${key}.json`, JSON.stringify(data), {
            access: 'public',
            allowOverwrite: true
        });

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

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
        return new NextResponse("Missing parameters", {
            status: 500,
            headers: Headers
        });
    }

    let data;
    try {
        const { text } = await get(`blocks/${key}.json`);
        data = JSON.parse(text);
    } catch (error) {
        return new NextResponse(error.message, {
            status: 500,
            headers: Headers
        });
    }

    return NextResponse.json(data, {
        headers: Headers
    });
}
