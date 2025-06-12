import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request) {
    const data = request?.body;
    if (!data) {
        return new NextResponse("Missing parameters", {
            status: 500,
            headers: {
                "Cache-Control": "no-store, max-age=0",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            }
        });
    }

    const { url } = await put(`blocks/${new Date().toDateString()}.json`, data, { access: 'public' });

    return NextResponse.json({
        success: true,
        url,
        data
    }, {
        headers: {
            "Cache-Control": "no-store, max-age=0",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    });
}