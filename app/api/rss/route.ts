import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
   const URL = "https://www.ynet.co.il/Integration/StoryRss1854.xml";
   const response = await fetch(URL);
   const data = await response.text();
   return new Response(data, {
      headers: {
         "Content-Type": "application/xml",
      }
   });
}
