import {PostsListSkeleton} from "@/components/molecules/PostsListSkeleton";

export default function Loading() {
   return (
      <div className="flex flex-col items-center text-center">
         <PostsListSkeleton/>
      </div>
   );
}