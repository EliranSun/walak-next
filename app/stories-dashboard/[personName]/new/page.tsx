import {getRelation} from "@/utils/relations";
import {upperFirst} from "lodash";
import {NewStoryGenerationTemplate} from "@/components/templates/NewStoryGenerationTemplate";
import Link from "next/link";

export default async function Page({params}: { params: { personName: string } }) {
    const {personName} = params;

    return (
        <section>
            <Link href={`/stories-dashboard/${personName}`}>
                BACK
            </Link>
            <h1 className="font-black px-10 py-4 text-5xl bg-white w-full flex items-center">
                Me & My {getRelation(personName)} {upperFirst(personName)}
            </h1>
            <NewStoryGenerationTemplate personName={personName}/>
        </section>
    );
};