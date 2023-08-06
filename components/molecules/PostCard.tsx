'use client';
import {useTranslations} from "next-intl";
import Icon from "@/components/atoms/Icon";
import Post from "@/types/Post";
import classNames from "classnames";
import {InteractiveTag} from "@/components/atoms/InteractiveTag";
import {VideoTag} from "@/components/atoms/VideoTag";
import {Link} from "@/components/atoms/Link";
import {CoopTag} from "@/components/atoms/CoopTag";

const replaceAllSpacesWithDashes = (str: string) => str.replace(/\s/g, '-');

export const PostCard = ({
   post,
   isLean,
   isLarge
}: {
   post: Post
   isLean?: boolean
   isLarge?: boolean
}) => {
   const t = useTranslations('PostCard');
   const {id, title, excerpt, imageSrc, timeToRead, isInteractive, hasVideo} = post;
   const cardContainerClasses = classNames("flex flex-col items-center text-right hover:text-blue-500 cursor-pointer", {
      "bg-white shadow-sm max-w-[288px] w-full": !isLean && !isLarge,
      "w-60": isLean,
      "border-b border-gray-300": isLarge
   });

   const imageContainerClasses = classNames("overflow-hidden", {
      "h-[50vh]": isLarge,
      "aspect-[9/5]": !isLarge,
      "h-40": !isLean && !isLarge
   });

   const textContainerClasses = classNames("text-right w-full flex justify-between py-2", {
      "flex-col": !isLarge,
      "px-4": !isLean && !isLarge,
      "items-center h-full": isLarge
   });

   const titleContainerClasses = classNames({
      "my-4": isLarge,
      "mb-2": !isLarge
   });

   const titleClasses = classNames("font-bold open-sans", {
      "text-4xl": isLarge,
      "text-lg": !isLarge
   });

   const tagContainerClasses = classNames("flex", {
      "items-center gap-2": isLarge,
      "gap-1": !isLarge
   });

   return (
      <Link href={`/posts/${id}/${replaceAllSpacesWithDashes(title)}`}>
         <div className={cardContainerClasses}>
            <div className={imageContainerClasses}>
               <img src={imageSrc} alt={title} className="object-cover object-center w-full"/>
            </div>
            <div className={textContainerClasses}>
               <div className={titleContainerClasses}>
                  <h1 className={titleClasses}>{title}</h1>
                  <p className="text-base leading-4">{excerpt}</p>
               </div>
               <div className={tagContainerClasses}>
                  {isInteractive && <InteractiveTag/>}
                  {hasVideo && <VideoTag/>}
                  {post.tags?.includes("שת\"פ") && <CoopTag/>}
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                     <Icon name="Clock" size={Icon.Sizes.SMALL}/>
                     {timeToRead} {t('minRead')}
                  </p>
               </div>
            </div>
         </div>
      </Link>
   );
};
