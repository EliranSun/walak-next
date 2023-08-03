import Icon from "@/components/atoms/Icon";
import {Link} from "@/components/atoms/Link";

export const SocialStrip = () => {
   return (
      <div className="flex items-center gap-4">
         <Link href={"https://www.facebook.com/OC-107253934786818"} target="_blank">
            <Icon name="FacebookLogo"/>
         </Link>
         <Link href={"https://twitter.com/OC"} target="_blank">
            <Icon name="TwitterLogo"/>
         </Link>
         <Link href={"https://www.youtube.com/channel/UCvQfQHjX6bQzJQpZqQJjvsg"} target="_blank">
            <Icon name="YoutubeLogo"/>
         </Link>
         <Link href={"mailto:walakoffical@gmail.com"}>
            <Icon name="Envelope"/>
         </Link>
      </div>
   )
}