import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
	const supabase = createServerComponentClient({ cookies });
	const body = await request.json();
	const entryId = body.id;
	const feeling = body.feeling;

	if (!entryId || !feeling) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 }
		);
	}

	const { data, error } = await supabase
		.from("sleepTrack")
		.update({ feeling })
		.eq("id", entryId)
		.select();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(
		{ data, success: true },
		{
			headers: {
				"Cache-Control": "no-store, max-age=0",
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			},
		}
	);
}
