'use client';

import { ContentType } from "@/enums/Content";
import { TranslateButton } from "@/components/atoms/TranslateButton";
import { Chapter as ChapterType } from "@/types/Chapter";
import { useState } from "react";
import { Chapter } from "@/components/molecules/Chapter";
import { EditButton } from "@/components/atoms/EditButton";
import { noop } from "lodash";

export const ChaptersOfTitle = ({
        chaptersByTitle,
        type
    }: { chaptersByTitle: { [title: string]: ChapterType[] }, type: ContentType }) => {
        const [titleTranslation, setTitleTranslation] = useState<string>("");

        return (
            <div className="flex flex-col bg-white shadow-xl">
                <h4 className="w-full text-center">=== {type} ===</h4>
                {Object.entries(chaptersByTitle).map(([title, chaptersOfTitle]) => {
                    return (
                        <div key={title}>
                            <div dir={type === ContentType.ORIGINAL ? "auto" : "rtl"}>
                                <textarea className="text-xl font-bold w-full" defaultValue={title}/>
                                {type === ContentType.ORIGINAL ?
                                    <TranslateButton content={title} onTranslate={setTitleTranslation}/> :
                                    <EditButton
                                        // FIXME: Either update for each chapter - or the title should be a different entity
                                        // chapterId={chaptersOfTitle[0].id}
                                        content={title} type={type} onSuccess={noop}/>}
                            </div>
                            {chaptersOfTitle.map(({ title, id, chapterNumber, content, translation }) => {
                                return (
                                    <Chapter
                                        title={title}
                                        id={id}
                                        key={`${id}-chapter`}
                                        chapterNumber={chapterNumber}
                                        type={type}
                                        content={type === ContentType.ORIGINAL ? content : translation}/>
                                );
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
;