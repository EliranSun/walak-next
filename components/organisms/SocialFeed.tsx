'use client';
import {FacebookLogo} from "@phosphor-icons/react";
import {TwitterTweetEmbed, TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton} from "react-twitter-embed";
import {Comments, EmbeddedPost, FacebookProvider, ShareButton} from "react-facebook";

export const SocialFeed = () => {

   return (
      <div className="w-full overflow-hidden px-4" dir="ltr">
         {/*<TwitterTimelineEmbed*/}
         {/*   sourceType="profile"*/}
         {/*   screenName="WalakOffical"*/}
         {/*   options={{height: 600, width: '80%'}}*/}
         {/*/>*/}
         <TwitterTweetEmbed
            tweetId="1690727206392135680"
            options={{width: "100%", height: "400px"}}
         />
         <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">Hello world</p>
            &mdash; Walak (@WalakOffical)
            <a href="https://twitter.com/WalakOffical/status/1686674308855181312?ref_src=twsrc%5Etfw">
               August 2, 2023
            </a>
         </blockquote>
         <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
         <TwitterShareButton
            options={{
               text: "קלטו את הסיפור המגניב הזה בוואלק",
               via: "WalakOffical",
            }}
            url={"https://walak-next.vercel.app/posts/30/the-swiss-watch"}/>
         <TwitterFollowButton screenName={"WalakOffical"}/>
         <FacebookProvider appId="476469699198928">
            <ShareButton
               href="http://www.facebook.com"
               display="popup"
               // @ts-ignore-next-line 
               className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 h-10">
               Share on Facebook
               <FacebookLogo size={32} color="#fff"/>
            </ShareButton>
            {/*<EmbeddedPost href="https://fb.watch/m9UaEOxnZN/" width="80%"/>*/}
            <Comments href="https://www.facebook.com/walak.co.il"/>
         </FacebookProvider>
         <iframe
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fwalak.co.il%2Fposts%2F1072720786118597&show_text=true&width=500"
            width="100%"
            height="400px"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"/>
      </div>
   );
};
