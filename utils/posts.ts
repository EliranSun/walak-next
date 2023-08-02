import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import Post from "@/types/Post";

const AVERAGE_HUMAN_READING_SPEED = 190;

export const calculateReadingTime = (text: string) => {
   const words = text.split(" ");
   const minutes = words.length / AVERAGE_HUMAN_READING_SPEED;
   return Math.round(minutes);
};

export const getPosts = async () => {
   const supabase = createServerComponentClient({cookies})
   const {data, error} = await supabase.from('posts').select().order('createdAt', {ascending: false});
   const posts = (data || []).map((post: Post) => {
      return {
         ...post,
         timeToRead: calculateReadingTime(post.content)
      };
   });

   return {posts, error};
};