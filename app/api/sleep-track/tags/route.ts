import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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

	const { data: existingTags, error: existingTagsError } = await supabase
		.from("sleepTrack")
		.select("tags")
		.eq("id", entryId);

	if (existingTagsError) {
		return NextResponse.json(
			{ error: existingTagsError.message },
			{ status: 500 }
		);
	}

	const { data, error } = await supabase
		.from("sleepTrack")
		.update({ tags: existingTags[0].tags.concat(tag) })
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
