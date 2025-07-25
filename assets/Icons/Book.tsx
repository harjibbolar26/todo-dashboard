import { Iconprops } from "@/types";
import { FC } from "react";

const Book: FC<Iconprops> = (props) => {
  return (
    <svg
      width={props?.width || "22"}
      height={props?.height || "22"}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props?.className}
    >
      <g opacity="1">
        <path
          d="M7.96012 2.79704C8.14828 2.73432 8.35171 2.73432 8.53987 2.79704L13.75 4.53375L17.7536 3.19922C18.9407 2.80351 20.1667 3.68712 20.1667 4.93847V15.8393C20.1667 16.6284 19.6617 17.329 18.9131 17.5786L14.0399 19.203C13.8517 19.2657 13.6483 19.2657 13.4601 19.203L8.25 17.4663L4.24642 18.8008C3.05928 19.1965 1.83333 18.3129 1.83333 17.0615V6.1607C1.83333 5.37157 2.33829 4.67099 3.08691 4.42144L7.96012 2.79704ZM9.16667 15.8393L12.8333 17.0615V6.1607L9.16667 4.93847V15.8393ZM7.33333 4.93847L3.66667 6.1607V17.0615L7.33333 15.8393V4.93847ZM14.6667 6.1607V17.0615L18.3333 15.8393V4.93847L14.6667 6.1607Z"
           fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default Book;
