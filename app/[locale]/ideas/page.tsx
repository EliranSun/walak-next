import {Categories} from "@/constants/categories";
import {PostsPageTemplate} from "@/components/templates/PostsPageTemplate";

export default async function Index() {
   return <PostsPageTemplate categoryId={Categories.IDEA} categoryKey="ideas"/>;
};
