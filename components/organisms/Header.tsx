import {Logo} from "@/components/atoms/Logo";
import {Icon} from "@/components/atoms/Icon";

export const Header = () => {
   return (
      <div className="w-full flex flex-row justify-between items-center bg-slate-200 p-4 shadow-sm sticky top-0">
         <Logo/>
         <div className="flex gap-4">
            <Icon name="MagnifyingGlass"/>
            <Icon name="List"/>
         </div>
      </div>
   );
};