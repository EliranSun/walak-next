import { ArrowCircleLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { sql } from "@vercel/postgres";
import { ChaptersByTitles } from "@/components/molecules/ChaptersByTitles";
import { getRelation } from "@/utils/relations";
import { upperFirst } from "lodash";
import Chapter from "@/models/Chapter";


export default async function Page({ params }: { params: { personName: string } }) {
    const { personName } = params;
    // TODO: cache issue?
    const { rows: chapters } = await sql`SELECT id, chapter_number, sibling, title, content, translation FROM chapters WHERE sibling='Or' ORDER BY id ASC`;
    // const { rows: chapters } = await sql`SELECT translation FROM chapters WHERE translation IS NOT NULL AND translation != ''`;

    console.log({ chapters: chapters.map(item => item.translation) });
    return (
        <div className="flex flex-col">
            <div className="flex gap-8 items-center bg-white w-full p-10">
                <Link href="/stories-dashboard">
                    <ArrowCircleLeft size={42}/>
                </Link>
                <h1 className="text-5xl font-black">Me & My {getRelation(personName)} {upperFirst(personName)}</h1>
            </div>
            <ChaptersByTitles chapters={chapters}/>
        </div>
    )
}