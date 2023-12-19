import {ArrowCircleLeft} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {sql} from "@vercel/postgres";
import {ChaptersByTitles} from "@/components/molecules/ChaptersByTitles";
import {getRelation} from "@/utils/relations";
import {upperFirst} from "lodash";
import {NewChapter} from "@/components/molecules/NewChapter";

export default async function Page({params}: { params: { personName: string } }) {
    const {personName} = params;
    console.log({personName});
    const {rows: chapters} = await sql`SELECT * FROM chapters WHERE sibling=${personName} ORDER BY id ASC`;
    const lastTitle = chapters.at(0)?.title;
    const theStoryThusFar = chapters.reduce((acc, chapter) => {
        return acc + '\n\n----\n\n' + chapter.content;
    }, '');
    const theme = chapters.at(0)?.theme;
    const genre = chapters.at(0)?.genre;

    console.log({chapter: chapters.at(0)});

    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-8 items-center bg-white w-full p-10">
                <Link href="/stories-dashboard">
                    <ArrowCircleLeft size={42}/>
                </Link>
                <h1 className="text-5xl">
                    <span className="font-black">Me & My {getRelation(personName)} {upperFirst(personName)}</span>:
                    <i>{lastTitle}</i>
                </h1>
                <Link href={`/stories-dashboard/${personName}/new`}>
                    <button className="bg-black text-white p-4 rounded-lg hover:bg-white hover:text-black border border-black">
                        GENERATE NEW STORY
                    </button>
                </Link>
            </div>
            {/* @ts-ignore */}
            <ChaptersByTitles chapters={chapters}/>
            <NewChapter
                title={lastTitle}
                personName={personName}
                genre={genre}
                theme={theme}
                theStoryThusFar={theStoryThusFar}/>
        </div>
    )
}