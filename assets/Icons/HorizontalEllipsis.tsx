import { Iconprops } from "@/types";
import { FC } from "react";

const HorizontalEllipsis: FC<Iconprops> = (props) => {
  return (
    <svg
      width={props?.width || "10"}
      height={props?.height || "2"}
      viewBox="0 0 10 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props?.className}
    >
      <circle cx="9" cy="1" r="1" fill={props?.stroke || "currentColor"} />
      <circle cx="5" cy="1" r="1" fill={props?.stroke || "currentColor"} />
      <circle cx="1" cy="1" r="1" fill={props?.stroke || "currentColor"} />
    </svg>
  );
};

export default HorizontalEllipsis;
