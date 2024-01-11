import {ActionButton} from "@/components/atoms/ActionButton";
import {Translate} from "@phosphor-icons/react";

const HEBREW_LANGUAGE_TARGET = "he";

export const TranslateButton = ({
   content,
   onTranslate,
}: {
   content: string,
   onTranslate: (translation: string) => void
}) => {
   return (
      <ActionButton
         label={<Translate size={24}/>}
         action={async () => {
            const translationResponse = await fetch("/story/translate", {
               method: "POST",
               body: JSON.stringify({
                  content: content,
                  targetLanguages: [HEBREW_LANGUAGE_TARGET]
               })
            }).then(res => res.json());

            onTranslate(translationResponse[HEBREW_LANGUAGE_TARGET]);
         }}/>
   )
}