import {ContentType} from "@/enums/Content";
import {noop} from "lodash";
import classNames from "classnames";
import {useState} from "react";
import {Spinner} from "@phosphor-icons/react";

export const EditButton = ({
    content,
    chapterId,
    onSuccess = noop,
    onError = noop,
    type,
    isDisabled = false
}: {
    content: string,
    type: ContentType,
    onSuccess?: () => void,
    onError?: () => void,
    isDisabled?: boolean,
    chapterId?: number
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const notAllowed = isDisabled || isLoading || !content || !chapterId;

    return (
        <button
            disabled={notAllowed}
            className={classNames("p-2 bg-white hover:bg-black hover:text-white border border-black text-sm", {
                "cursor-not-allowed opacity-30": notAllowed
            })}
            onClick={async () => {
                console.log({content});
                setIsLoading(true);
                const path = type === ContentType.ORIGINAL ? "/story/update" : "/story/translate/update";
                try {
                    await fetch(path, {
                        method: "POST", body: JSON.stringify({
                            content: content,
                            chapterId: chapterId,
                        })
                    }).then(res => res.json());

                    onSuccess();
                } catch (e) {
                    console.error(e);
                    setIsError(true);
                    onError();
                } finally {
                    setIsLoading(false);
                }
            }}>
            {isLoading ? <Spinner size={16} className="animate-spin"/> : "EDIT"}
            {isError ? "ERROR" : null}
        </button>
    )
}