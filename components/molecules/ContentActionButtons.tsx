import {TranslateButton} from "@/components/atoms/TranslateButton";
import {EditButton} from "@/components/atoms/EditButton";
import {ContentType} from "@/enums/Content";
import {ButtonPosition} from "@/enums/ButtonPosition";
import classNames from "classnames";

export const ContentActionButtons = ({
    type,
    content,
    setTranslation,
    chapterId
}: { type: ContentType, content: string, setTranslation: (translation: string) => void, chapterId: number }) => {
    const buttonPosition = type === ContentType.ORIGINAL ? ButtonPosition.Right : ButtonPosition.Left;

    return (
        <div className={classNames("flex gap-4 absolute bottom-0", {
            "right-0": buttonPosition === ButtonPosition.Right,
            "left-0": buttonPosition === ButtonPosition.Left
        })}>
            <EditButton
                chapterId={chapterId}
                content={content} type={type} isDisabled={!content}/>
            {type !== ContentType.TRANSLATION ?
                <TranslateButton content={content} onTranslate={setTranslation}/> : null}
            {type === ContentType.TRANSLATION ?
                <button className="hover:bg-green-500 hover:text-white bg-white text-black border border-black">
                    WHATSAPP
                </button> : null}
            {type === ContentType.ORIGINAL ?
                <button
                    onClick={async () => {
                        await fetch(`/story/v2/chapter`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({chapterId}),
                        });
                    }}
                    className="hover:bg-red-500 hover:text-white bg-white text-black border border-black">
                    DELETE
                </button> : null}
        </div>
    )
}