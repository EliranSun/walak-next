'use client';
import {useState, useRef, useEffect} from "react";
import {ContentType} from "@/enums/Content";
import {ContentActionButtons} from "@/components/molecules/ContentActionButtons";
import {Spinner} from "@phosphor-icons/react";

export const Chapter = ({
        id,
        content,
        chapterNumber,
        type
    }: {
        id: number,
        content: string,
        chapterNumber: number,
        type: ContentType
    }) => {
        const ref = useRef<HTMLTextAreaElement>(null);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [translation, setTranslation] = useState<string>("");
        const [editedContent, setEditedContent] = useState<string>(content);

        useEffect(() => {
            if (ref.current) {
                ref.current.style.height = ref.current.scrollHeight + "px";
            }
        }, [ref]);

        if (!content)
            return null;

        return (
            <div key={`${id}-${type.toLowerCase()}`} className="bg-white p-8 w-fit">
                <div>
                    <div className="relative">
                        <h4>{chapterNumber} ~ {id}</h4>
                        <textarea
                            value={editedContent}
                            ref={ref}
                            onChange={(e) => setEditedContent(e.target.value || "")}
                            dir={type === ContentType.ORIGINAL ? "auto" : "rtl"}
                            className="w-[40vw] max-w-full py-8 whitespace-pre-wrap"/>
                        <ContentActionButtons
                            chapterId={id}
                            type={type} content={editedContent} setTranslation={setTranslation}/>
                    </div>
                    {translation &&
                        <div className="relative">
                            <div
                                contentEditable
                                suppressContentEditableWarning
                                dir={type === ContentType.ORIGINAL ? "auto" : "rtl"}>
                                {translation}
                            </div>
                            <button
                                className="absolute left-0 bottom-0 translate-y-full p-2 bg-white hover:bg-black hover:text-white border border-black text-sm"
                                onClick={async () => {
                                    setIsLoading(true);

                                    try {
                                        await fetch("/story/translate/update", {
                                            method: "POST",
                                            body: JSON.stringify({
                                                chapterId: id,
                                                content: translation
                                            })
                                        });

                                        setTranslation("");
                                    } catch (e) {
                                        console.error(e);
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }}>
                                {isLoading ? <Spinner rotate={10} size={32}/> : "SAVE TRANSLATION"}
                            </button>
                        </div>}
                </div>
            </div>
        );
    }
;