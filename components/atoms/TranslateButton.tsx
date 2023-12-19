const HEBREW_LANGUAGE_TARGET = "he";

export const TranslateButton = ({
    content,
    onTranslate,
}: {
    content: string,
    onTranslate: (translation: string) => void
}) => {
    return (
        <button
            className={"my-4 p-2 bg-white hover:bg-black hover:text-white border border-black text-sm"}
            onClick={async () => {
                const translationResponse = await fetch("/story/translate", {
                    method: "POST",
                    body: JSON.stringify({
                        content: content,
                        targetLanguages: [HEBREW_LANGUAGE_TARGET]
                    })
                }).then(res => res.json());

                onTranslate(translationResponse[HEBREW_LANGUAGE_TARGET]);
            }}>
            TRANSLATE
        </button>
    )
}