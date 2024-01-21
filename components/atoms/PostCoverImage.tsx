import React from "react";

export const PostCoverImage = ({ imageSrc, children }: { imageSrc: string, children: React.ReactNode }) => {
   return (
      <div
         className="w-full h-[1000px] max-h-[66vh] md:h-[70vh] overflow-hidden relative bg-[length:auto_100%] bg-no-repeat md:bg-cover md:bg-fixed bg-[center_bottom_5rem] flex items-end justify-center"
         style={{
            backgroundImage: `url(${imageSrc})`
         }}>
         {children}
      </div>
   )
};