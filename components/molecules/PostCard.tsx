export const PostCard = ({
   title,
   imgSrc,
   excerpt,
   timeToRead
}: {
   title: string,
   imgSrc: string,
   excerpt?: string,
   timeToRead?: number
}) => {
   return (
      <div className="w-full lg:w-56 flex flex-col items-center border border-gray-100 text-right">
         <img src={imgSrc} alt={title} className="w-full"/>
         <div className="p-1 text-right w-full">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm">{excerpt}</p>
            <p className="text-sm">{timeToRead}</p>
         </div>
      </div>
   );
};
