import { Iconprops } from "@/types";
import { FC } from "react";

const ChevronDown: FC<Iconprops> = (props) => {
  return (
    <svg
      width={props?.width || "10"}
      height={props?.height || "6"}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props?.className}
    >
      <path
        d="M9 1L5 5L1 1"
        stroke={props?.stroke || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronDown;
