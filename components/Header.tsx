"use client";

import { ICONS } from "@/assets/Icons";
import Image from "next/image";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Projects from "./Projects";
import { Menu } from "lucide-react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="">
      <div className="w-full lg:px-8 lg:py-7 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="lg:hidden" onClick={() => setShowMenu(true)}>
              <Menu />
            </div>
            <p className="text-primary font-bold lg:text-xl text-lg">
              Welcome back, Vincent 👋
            </p>
          </div>
          <div className="flex items-center gap-5">
            <ICONS.Search className="max-md:hidden" />
            <ICONS.Notification className="max-md:hidden" />
            <ICONS.Calendar className="max-md:hidden" />
            <p className="font-semibold text-subdued max-md:hidden">
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
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
            onClick={() => setShowMenu(false)}
          />

          <div className="fixed inset-0 flex z-50 pointer-events-none">
            <div className="w-[90px] pointer-events-auto">
              <Sidebar />
            </div>
            <div className="w-[300px] pointer-events-auto">
              <Projects setShowMenu={setShowMenu} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
