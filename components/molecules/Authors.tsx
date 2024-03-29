import {useTranslations} from "next-intl";
import Author from "@/types/Author";

const Authors = ({authors}: { authors: { author: Author }[] }) => {
   const t = useTranslations('Author');
   const authorsNames = authors.map(({author}: { author: Author }) => author.name).join(', ');

   return (
      <div className="flex flex-col justify-start pb-2 md:border-b border-gray-300">
         <div className="flex gap-2">
            {authors.map(({author}) => {
               return (
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden">
                     <img
                        className="grayscale bright"
                        src={author.imageSrc}
                        alt={t("image.alt", {name: author.name})}
                     />
                  </div>
               );
            })}
         </div>
         <h3 className="w-full md:w-10/12 md:text-xl font-bold open-sans">
            {authorsNames}
         </h3>
      </div>
   );
};

export default Authors;
