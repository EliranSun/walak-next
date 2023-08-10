'use client';
import {TwitterTweetEmbed, TwitterTimelineEmbed} from "react-twitter-embed";
import {Comments, EmbeddedPost, FacebookProvider, ShareButton} from "react-facebook";

export const SocialFeed = () => {
   return (
      <div>
         <TwitterTimelineEmbed
            sourceType="profile"
            screenName="WalakOffical"
            options={{height: 600, width: 700}}
         />
         <TwitterTweetEmbed
            tweetId="1686674308855181312"
            options={{width: "700px"}}
         />
         <FacebookProvider appId="476469699198928">
            <ShareButton href="http://www.facebook.com" display="popup">
               Share on Facebook
            </ShareButton>
            <EmbeddedPost href="https://fb.watch/m9UaEOxnZN/" width="320"/>
            <Comments href="https://www.facebook.com/walak.co.il"/>
         </FacebookProvider>
      </div>
   );
};
