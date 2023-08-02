export const PostsListSkeleton = () => {
   const posts = new Array(10).fill(null);

   return (
      <section className="p-10 pb-0 md:max-w-5xl">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(() => {
               return (
                  <div
                     className="w-72 flex flex-col items-center text-right hover:text-blue-500 cursor-pointer bg-white">
                     <div className="w-full h-40 animate-pulse bg-slate-200"/>
                     <div className="text-right animate-pulse w-full flex justify-between py-2 h-24">
                        <div>
                           <h1 className="font-bold open-sans"></h1>
                           <p className="text-base leading-tight"></p>
                        </div>
                        <div className="flex">
                           <p className="text-xs text-gray-400 flex items-center gap-1">

                           </p>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </section>
   )
}