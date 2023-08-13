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
            tweetId="1686674308855181312"
            options={{width: "100%"}}
         />
         <TwitterShareButton url={"https://twitter.com/WalakOffical"}/>
         <TwitterFollowButton screenName={"WalakOffical"}/>
         <FacebookProvider appId="476469699198928">
            <ShareButton
               href="http://www.facebook.com"
               display="popup"
               className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 h-10">
               Share on Facebook
               <FacebookLogo size={32} color="#fff"/>
            </ShareButton>
            {/*<EmbeddedPost href="https://fb.watch/m9UaEOxnZN/" width="80%"/>*/}
            <iframe
               src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fwalak.co.il%2Fposts%2F1072720786118597&show_text=true&width=500"
               width="100%"
               height="400px"
               allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"/>
            <Comments href="https://www.facebook.com/walak.co.il/"/>
         </FacebookProvider>
      </div>
   );
};
