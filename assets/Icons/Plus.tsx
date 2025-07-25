import { Iconprops } from "@/types";
import { FC } from "react";

const Plus: FC<Iconprops> = (props) => {
  return (
    <svg
      width={props?.width || "10"}
      height={props?.height || "10"}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.4">
        <path
          d="M9 5L1 5"
          stroke={props?.stroke || "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 9L5 1"
          stroke={props?.stroke || "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default Plus;
