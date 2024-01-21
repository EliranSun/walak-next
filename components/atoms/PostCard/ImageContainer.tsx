import classNames from "classnames";
import Image from "next/image";

export const ImageContainer = ({ imageSrc, title, isLean, isLarge }: { imageSrc: string, title: string, isLean?: boolean, isLarge?: boolean }) => {
   return (
      <div className={classNames("w-full h-40 relative overflow-hidden", {
         "md:h-[50vh]": isLarge,
         "md:aspect-[9/5]": !isLarge,
         "md:h-40": !isLean && !isLarge
      })}>
         <Image
            fill={true}
            className="object-cover object-center w-full"
            src={imageSrc}
            alt={title}/>
      </div>
   );
};
