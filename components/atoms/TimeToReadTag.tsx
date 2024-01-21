import Icon from "@/components/atoms/Icon";
import {useTranslations} from "next-intl";

export const TimeToReadTag = ({timeToRead}: { timeToRead: number }) => {   
   const t = useTranslations("PostCard");

   return (
      <p className="text-xs text-gray-400 flex items-center gap-1">
         <Icon name="Clock" size={Icon.Sizes.SMALL}/>
         {timeToRead} {t('minRead')}
      </p>
   );
};
