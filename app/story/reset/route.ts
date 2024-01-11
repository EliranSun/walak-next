import {NextRequest, NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function GET(request: NextRequest) {
   const client = await sql.connect();
   const searchParams = request.nextUrl.searchParams;
   const title = searchParams.get("title");
   const siblingName = searchParams.get("siblingName");

   if (!title || !siblingName) {
      return NextResponse.json({error: "title and siblingName are required"})
   }

   try {
      await client.sql`
        DELETE FROM chapters WHERE sibling = ${siblingName}
    `;

      await client.sql`
        DELETE FROM stories WHERE sibling = ${siblingName}
    `;

      return NextResponse.json({
         success: true
      });
   } catch (error) {
      return NextResponse.json({
         error: "Something went wrong while trying to delete the story"
      });
   } finally {
      client.release();
   }
}