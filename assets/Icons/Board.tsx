import { Iconprops } from "@/types";
import { FC } from "react";

const Board: FC<Iconprops> = (props) => {
  return (
    <svg
      width={props?.width || "18"}
      height={props?.height || "18"}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props?.className}
    >
      <path
        d="M14.25 2.25C15.0784 2.25 15.75 2.92157 15.75 3.75V6.75C15.75 7.57843 15.0784 8.25 14.25 8.25L3.75 8.25C2.92157 8.25 2.25 7.57843 2.25 6.75L2.25 3.75C2.25 2.92157 2.92157 2.25 3.75 2.25L14.25 2.25ZM14.25 6.75V3.75L3.75 3.75L3.75 6.75L14.25 6.75Z"
        fill={props?.stroke || "currentColor"}
      />
      <path
        d="M14.25 9.75C15.0784 9.75 15.75 10.4216 15.75 11.25V14.25C15.75 15.0784 15.0784 15.75 14.25 15.75H3.75C2.92157 15.75 2.25 15.0784 2.25 14.25L2.25 11.25C2.25 10.4216 2.92157 9.75 3.75 9.75L14.25 9.75ZM14.25 14.25V11.25L3.75 11.25L3.75 14.25H14.25Z"
        fill={props?.stroke || "currentColor"}
      />
    </svg>
  );
};

export default Board;
