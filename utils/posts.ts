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
   const {data, error} = await supabase
      .from('posts')
      .select('*, postAuthors:postAuthors!postId (authorId:authors!id(name))')
      .eq('isDraft', false)
      .order('createdAt', {ascending: false});

   const posts = (data || []).map((post: Post) => {
      return {
         ...post,
         authors: post.postAuthors,
         timeToRead: calculateReadingTime(post.content)
      };
   });
   
   if (error) {
      console.log('getPosts error', error);
   }

   return {posts, error};
};

export const getPost = async (id: number) => {
   const supabase = createServerComponentClient({cookies})
   const {data, error} = await supabase
      .from('posts')
      .select('*, postAuthors(author:authors(*))')
      .eq('id', id)
      .eq('isDraft', false)
      .single();

   const post = {
      ...data,
      authors: data.postAuthors,
      timeToRead: calculateReadingTime(data.content)
   };

   return {post, error};
};

export const trackPostViews = async (post: Post) => {
   const supabase = createServerComponentClient({cookies})

   supabase
      .from('postsViews')
      .select()
      .eq('postId', post.id)
      .then(({data}) => {
         supabase
            .from('postsViews')
            .upsert({
               count: (data && data[0]?.count || 0) + 1,
               postId: post.id
            })
            .eq('postId', post.id)
            .then(({data, error}) => {
               if (error) {
                  console.log(error);
               }
            })
      });
}