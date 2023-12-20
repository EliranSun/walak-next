import {ArrowCircleLeft} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {db} from "@vercel/postgres";
import {ChaptersByTitles} from "@/components/molecules/ChaptersByTitles";
import {getRelation} from "@/utils/relations";
import {upperFirst} from "lodash";
import {NewChapter} from "@/components/molecules/NewChapter";
import {Chapter} from "@/types/Chapter";

const dynamic = 'force-dynamic';
const revalidate = 0;
export default async function Page({params}: {
   params: {
      personName: string
   }
}) {
   const {personName} = params;
   const client = await db.connect();
   const {rows: chapters} = await client.sql`SELECT * FROM chapters WHERE sibling = ${personName} ORDER BY id ASC`;
   const lastTitle = chapters.at(0)?.title;
   const theStoryThusFar = chapters.reduce((acc, chapter) => {
      return acc + '\n\n----\n\n' + chapter.content;
   }, '');
   const theme = chapters.at(0)?.theme;
   const genre = chapters.at(0)?.genre;
   const foo = chapters as Chapter[];

   return (
      <div className="flex flex-col">
         <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-white w-full py-10 px-20">
            <h1 className="text-xl font-black">
               Me & My {getRelation(personName)} {upperFirst(personName)}
            </h1>
            <Link href={`/stories-dashboard/${personName}/new`}>
               <button
                  className="bg-black text-white p-4 rounded-lg hover:bg-white hover:text-black border border-black">
                  GENERATE NEW STORY
               </button>
            </Link>
         </div>
         <ChaptersByTitles chapters={foo}/>
         {theStoryThusFar ?
            <NewChapter
               title={lastTitle}
               personName={personName}
               genre={genre}
               theme={theme}
               theStoryThusFar={theStoryThusFar}/> : null}
      </div>
   )
}