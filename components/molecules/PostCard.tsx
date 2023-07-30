export const PostCard = ({
   title,
   imgSrc,
   excerpt
}: {
   title: string,
   imgSrc: string,
   excerpt?: string
}) => {
   return (
      <div className="w-56 flex flex-col items-center border border-gray-100 text-right">
         <img src={imgSrc} alt={title} className="w-full"/>
         <div className="p-1 text-right w-full">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base">{excerpt}</p>
         </div>
      </div>
   );
};
