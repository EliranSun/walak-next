import classNames from "classnames";

export enum TextSize {
   Large = "text-4xl",
   Normal = "text-lg"
}

export const CardTitle = ({ title, size }: { title: string, size: TextSize }) => {
   return (
      <h1 className={classNames("font-bold open-sans", {
         "text-4xl": size === TextSize.Large,
         "text-lg": size === TextSize.Normal
      })}>
         {title}
      </h1>
   )
};