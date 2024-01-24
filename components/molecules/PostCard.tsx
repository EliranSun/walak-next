'use client';
import Post from "@/types/Post";
import classNames from "classnames";
import {InteractiveTag} from "@/components/atoms/InteractiveTag";
import {VideoTag} from "@/components/atoms/VideoTag";
import {Link} from "@/components/atoms/Link";
import {CoopTag} from "@/components/atoms/CoopTag";
import {TimeToReadTag} from "@/components/atoms/TimeToReadTag";
import {CardContainer} from "@/components/atoms/PostCard/CardContainer";
import {CardTitle, TextSize} from "@/components/atoms/PostCard/CardTitle";
import {ImageContainer} from "@/components/atoms/PostCard/ImageContainer";
import {CardDetailsContainer} from "@/components/atoms/PostCard/CardDetailsContainer";
import {replaceAllSpacesWithDashes} from "@/utils/string";

export const PostCard = ({
   post,
   isLean,
   isLarge
}: {
   post: Post
   isLean?: boolean
   isLarge?: boolean
}) => {
   const {
      id, 
      title, 
      excerpt, 
      imageSrc, 
      timeToRead, 
      isInteractive, 
      hasVideo
   } = post;
   
   return (
      <Link href={`/posts/${id}/${replaceAllSpacesWithDashes(title)}`}>
         <CardContainer isLean={isLean} isLarge={isLarge}>
            <ImageContainer 
               imageSrc={imageSrc} 
               title={title} 
               isLean={isLean} 
               isLarge={isLarge}/>
            <CardDetailsContainer 
               isLean={isLean} 
               isLarge={isLarge}>
               <div className={classNames(isLarge ? "": "mb-2")}>
                  <CardTitle title={title} size={isLarge ? TextSize.Large : TextSize.Normal}/>
                  <p className="text-base leading-4">{excerpt}</p>
               </div>
               <div className={classNames("flex", {
                  "items-center gap-2 p-4": isLarge,
                  "gap-1": !isLarge
               })}>
                  <InteractiveTag isActive={isInteractive}/>
                  <VideoTag isActive={hasVideo}/>
                  <CoopTag isActive={post.tags?.includes("שת\"פ")}/>
                  <TimeToReadTag timeToRead={timeToRead || 0}/>
               </div>
            </CardDetailsContainer>
         </CardContainer>
      </Link>
   );
};
