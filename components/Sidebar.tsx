import { ICONS } from "@/assets/Icons";
import Ovals from "@/assets/Icons/Ovals";
import Image from "next/image";
import React from "react";

const Sidebar = () => {
  return (
    <div
      className="min-h-screen p-1 overflow-y-auto flex flex-col hide-scrollbar"
      style={{ backgroundColor: "#1C1D22", color: "#FFFFFF" }}
    >
      <div className="mt-6 flex items-center justify-center mx-auto">
        <Ovals />
      </div>
      <div className="mt-10 flex items-center justify-center">
        <Image src={"/todoLogo.png"} alt="logo" width={24} height={26} />
      </div>
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center space-y-5 mt-10">
          <div className="p-3 hover:bg-[#FFFFFF1A] cursor-pointer rounded-full text-[#FFFFFF80] hover:text-white">
            <ICONS.Grid className="transition-colors duration-200" />
          </div>
          <div className="p-3 hover:bg-[#FFFFFF1A] cursor-pointer rounded-full text-[#FFFFFF80] hover:text-white">
            <ICONS.User className="transition-colors duration-200" />
          </div>
          <div className="p-3 hover:bg-[#FFFFFF1A] cursor-pointer rounded-full text-[#FFFFFF80] hover:text-white">
            <ICONS.Calendar className="transition-colors duration-200" />
          </div>
          <div className="p-3 hover:bg-[#FFFFFF1A] cursor-pointer rounded-full text-[#FFFFFF80] hover:text-white">
            <ICONS.Chart className="transition-colors duration-200" />
          </div>
          <div className="p-3 hover:bg-[#FFFFFF1A] cursor-pointer rounded-full text-[#FFFFFF80] hover:text-white">
            <ICONS.UpCloud className="transition-colors duration-200" />
          </div>
          <div className="p-3 hover:bg-[#FFFFFF1A] cursor-pointer rounded-full text-[#FFFFFF80] hover:text-white">
            <ICONS.Book className="transition-colors duration-200" />
          </div>
          <div className="p-3 hover:bg-[#FFFFFF1A] cursor-pointer rounded-full text-[#FFFFFF80] hover:text-white">
            <ICONS.Settings className="transition-colors duration-200" />
          </div>
        </div>
      </div>
      <div className="mb-5 mt-7 mx-auto">
        <ICONS.SignOut />
      </div>
    </div>
  );
};

export default Sidebar;
