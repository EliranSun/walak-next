import {useTranslations} from "next-intl";
import Author from "@/types/Author";
import Post from "@/types/Post";

const Author = ({author}: { author: Author }) => {
   const t = useTranslations('Author');

   return (
      <div className="flex flex-col items-center w-full box-border">
         <div>
            <div className="w-24 h-24 rounded-full overflow-hidden">
               <img
                  className="grayscale bright object-cover w-full h-full"
                  src={author.imageSrc || "https://www.gravatar.com/avatar/anonymous?d=identicon&s=200"}
                  alt={t("image.alt", {name: author.name})}
               />
            </div>
         </div>
         <div className="text-right flex flex-col items-center justify-center w-full h-full border-b border-gray-300">
            <h3 className="text-3xl font-bold open-sans">
               {author.name || t('by.anon')}
            </h3>
            <div className="opacity-70 mb-2">{author.title}</div>
         </div>
      </div>
   );
};

export default Author;
