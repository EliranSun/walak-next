import Link from "next/link";
import {relatives} from "@/utils/relations";
import {sql} from "@vercel/postgres";

export default async function Index() {
    const {rows: chapters} = await sql`SELECT * FROM chapters ORDER BY id DESC LIMIT 50`;

    return (
        <div className="w-screen flex flex-col items-center justify-center p-8">
            <h1 className="font-black text-9xl text-yellow-500 font-black">☀</h1>
            <section className="py-8 flex gap-8 flex-wrap justify-center items-center">
                {relatives.map((relative) => {
                    return (
                        <Link
                            key={relative.name}
                            className="text-9xl text-center font-extrabold cursor-pointer bg-white border border-10 border-black p-4 w-1/2 max-w-2xl min-w-fit hover:bg-black hover:text-white font-mono"
                            href={`/stories-dashboard/${relative.name.toLowerCase()}`}>
                            <button>
                                {relative.name.toUpperCase()}
                            </button>
                        </Link>
                    )
                })}
            </section>
            <section>
                {chapters.map((chapter) => {
                    return (
                        <table>
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>chapter_number</th>
                                <th>sibling</th>
                                <th>title</th>
                                <th>content</th>
                                <th>translation</th>
                                <th>genre</th>
                                <th>theme</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className='w-1/12 text-center'>{chapter.id}</td>
                                <td className='w-1/12 text-center'>{chapter.chapter_number}</td>
                                <td className='w-1/12 text-center'>{chapter.sibling}</td>
                                <td className='w-1/12'>{chapter.title}</td>
                                <td className="w-1/4">{chapter.content}</td>
                                <td className="w-1/4">{chapter.translation}</td>
                                <td className="w-1/4 text-center">{chapter.genre}</td>
                                <td className="w-1/4 text-center">{chapter.theme}</td>
                            </tr>
                            </tbody>
                        </table>
                    )
                })}
            </section>
        </div>
    );
}
