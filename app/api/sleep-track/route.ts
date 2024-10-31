import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	/* body should have a key of data, in it a string contains lines
    / break the string into lines, and for each line, split it into key and value based on ":"*/

	const lines = body.data.split("\n");
	const data = lines.map((line: string) => {
		const [key, value] = line.split(":");
		return { [key]: value };
	});

	return NextResponse.json({ data });
}
