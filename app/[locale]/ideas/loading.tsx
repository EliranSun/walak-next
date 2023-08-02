import {MainTitle} from "@/components/atoms/Title";
import {PostsListSkeleton} from "@/components/molecules/PostsListSkeleton";

export default function PostsPageLoadingSkeleton() {
    return (
        <div className="flex flex-col items-center text-center">
            <MainTitle translationKey="ideas"/>
            <PostsListSkeleton/>
        </div>
    );
}