import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
	const supabase = createServerComponentClient({ cookies });
	const body = await request.json();
	const entryId = body.id;
	const tag = body.tag;

	if (!entryId || !tag) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 }
		);
	}

	const { data, error } = await supabase
		.from("sleep_track_tags")
		.update({ tags: sql`array_append(tags, ${tag})` })
		.eq("id", entryId);

	return NextResponse.json(
		{ data, error },
		{
			headers: {
				"Cache-Control": "no-store, max-age=0",
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			},
		}
	);
}
