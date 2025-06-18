import { Iconprops } from "@/types";
import { FC } from "react";

const ChevronRight: FC<Iconprops> = (props) => {
  return (
    <svg
      width={props?.width || "6"}
      height={props?.height || "10"}
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L5 5L1 9"
        stroke={props?.stroke || "currentColor"}
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronRight;
