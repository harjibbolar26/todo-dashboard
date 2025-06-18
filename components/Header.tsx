"use client";

import { ICONS } from "@/assets/Icons";
import Image from "next/image";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Projects from "./Projects";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="">
      <div className="w-full lg:px-8 lg:py-7 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="lg:hidden" onClick={() => setShowMenu(true)}>
              <ICONS.Menu2 />
            </div>
            <p className="text-primary font-bold lg:text-xl text-lg">
              Welcome back, Vincent 👋
            </p>
          </div>
          <div className="flex items-center gap-5">
            <ICONS.Search />
            <ICONS.Notification />
            <ICONS.Calendar />
            <p className="font-semibold text-subdued">
              {new Date()
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(/ /g, " ")}
            </p>
            <Image
              src={"/Image.png"}
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30">
          <div className="flex z-50">
            <div className="fixed inset-0 w-[90px]">
              <Sidebar />
            </div>
            <div className="ml-[90px] w-[300px] fixed inset-0">
              <Projects />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
