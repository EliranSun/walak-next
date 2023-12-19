import Link from "next/link";
import { relatives } from "@/utils/relations";

export default async function Index() {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <h1 className="font-black text-9xl">🌞</h1>
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
        </div>
    );
}