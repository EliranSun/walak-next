import Post from "@/types/Post";

export const PostContent = ({post}: { post: Post }) => {
   return (
      <div className="relative">
         <div
            className="max-w-2xl text-xl leading-relaxed bg-white p-16 box-content content"
            dangerouslySetInnerHTML={{__html: post.content}}/>
         {(post.highlights || []).map((highlight, index) => {
            return (
               <blockquote
                  key={index}
                  className="absolute -left-52 w-48 text-2xl open-sans border-t border-b border-gray-500 py-4 text-gray-500"
                  style={{top: `${100 / (post.highlights.length + 1) * (index + 1)}%`}}>
                  <i>{highlight}</i>
               </blockquote>
            )
         })}
      </div>
   );
};
