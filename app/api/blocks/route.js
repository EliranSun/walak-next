import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST() {
    const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });

    return NextResponse.json({
        success: true,
        url
    }, {
        headers: {
            "Cache-Control": "no-store, max-age=0",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    });
}