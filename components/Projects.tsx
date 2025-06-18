"use client";

import React, { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { ICONS } from "@/assets/Icons";
import { twMerge } from "tailwind-merge";

const Projects = () => {
  const [expandedSections, setExpandedSections] = useState({
    projects: false,
    tasks: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-background1 min-h-screen px-7 py-8 overflow-y-auto flex flex-col hide-scrollbar">
      <div className="flex items-center justify-between">
        <p className="text-primary font-bold lg:text-[30px] text-2xl">
          Projects
        </p>
        <div className="bg-background2 p-3 rounded-full">
          <ICONS.Plus />
        </div>
      </div>

      <div className="mt-9 space-y-5 flex-1">
        <div>
          <div className="flex items-center justify-between mb-2 p-2 cursor-pointer hover:bg-background2 rounded-md">
            <span className="font-bold text-subdued">Team</span>
            <ICONS.ChevronRight />
          </div>
        </div>

        <div>
          <div
            className="flex items-center justify-between mb-4 cursor-pointer hover:bg-background2 rounded-md p-2"
            onClick={() => toggleSection("projects")}
          >
            <span
              className={twMerge(
                "font-bold",
                expandedSections.projects ? "text-primary" : "text-subdued"
              )}
            >
              Projects
            </span>
            {expandedSections.projects ? (
              <ICONS.ChevronDown />
            ) : (
              <ICONS.ChevronRight />
            )}
          </div>
          {expandedSections.projects && (
            <div className="ml-2">
              <div className="flex items-center gap-3">
                <div className="p-1 border-l-2 border-border relative">
                  <p className="ml-4 text-subdued font-semibold hover:bg-[#1C1D220A] hover:dark:bg-[#FFFFFF0A] cursor-pointer rounded-[18px] py-[10px] px-[18px] hover:text-primary">
                    All projects (3)
                  </p>
                  <hr className="absolute transform -translate-y-1/2 top-1/2 left-0 w-3 border border-border" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 border-l-2 border-border relative">
                  <p className="ml-4 text-subdued font-semibold hover:bg-[#1C1D220A] hover:dark:bg-[#FFFFFF0A] cursor-pointer rounded-[18px] py-[10px] px-[18px] hover:text-primary">
                    Design system
                  </p>
                  <hr className="absolute transform -translate-y-1/2 top-1/2 left-0 w-3 border border-border" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 border-l-2 border-border relative">
                  <p className="ml-4 text-subdued font-semibold hover:bg-[#1C1D220A] hover:dark:bg-[#FFFFFF0A] cursor-pointer rounded-[18px] py-[10px] px-[18px] hover:text-primary">
                    User flow
                  </p>
                  <hr className="absolute transform -translate-y-1/2 top-1/2 left-0 w-3 border border-border" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 border-l-2 border-border relative">
                  <p className="ml-4 text-subdued font-semibold hover:bg-[#1C1D220A] hover:dark:bg-[#FFFFFF0A] cursor-pointer rounded-[18px] py-[10px] px-[18px] hover:text-primary">
                    Ux research
                  </p>
                  <hr className="absolute transform -translate-y-1/2 top-1/2 left-0 w-3 border border-border" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div
            className="flex items-center justify-between mb-4 cursor-pointer hover:bg-background2 rounded-md p-2"
            onClick={() => toggleSection("tasks")}
          >
            <span
              className={twMerge(
                "font-bold",
                expandedSections.tasks ? "text-primary" : "text-subdued"
              )}
            >
              Tasks
            </span>
            {expandedSections.tasks ? (
              <ICONS.ChevronDown />
            ) : (
              <ICONS.ChevronRight />
            )}
          </div>
          {expandedSections.tasks && (
            <div className="ml-2">
              <div className="flex items-center gap-3">
                <div className="p-1 border-l-2 border-border relative">
                  <p className="ml-4 text-subdued font-semibold hover:bg-[#1C1D220A] hover:dark:bg-[#FFFFFF0A] cursor-pointer rounded-[18px] py-[10px] px-[18px] hover:text-primary">
                    All tasks (11)
                  </p>
                  <hr className="absolute transform -translate-y-1/2 top-1/2 left-0 w-3 border border-border" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 border-l-2 border-border relative">
                  <p className="ml-4 text-subdued font-semibold hover:bg-[#1C1D220A] hover:dark:bg-[#FFFFFF0A] cursor-pointer rounded-[18px] py-[10px] px-[18px] hover:text-primary">
                    To do (4)
                  </p>
                  <hr className="absolute transform -translate-y-1/2 top-1/2 left-0 w-3 border border-border" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 border-l-2 border-border relative">
                  <p className="ml-4 text-subdued font-semibold hover:bg-[#1C1D220A] hover:dark:bg-[#FFFFFF0A] cursor-pointer rounded-[18px] py-[10px] px-[18px] hover:text-primary">
                    In progress (4)
                  </p>
                  <hr className="absolute transform -translate-y-1/2 top-1/2 left-0 w-3 border border-border" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 border-l-2 border-border relative">
                  <p className="ml-4 text-subdued font-semibold hover:bg-[#1C1D220A] hover:dark:bg-[#FFFFFF0A] cursor-pointer rounded-[18px] py-[10px] px-[18px] hover:text-primary">
                    Done (3)
                  </p>
                  <hr className="absolute transform -translate-y-1/2 top-1/2 left-0 w-3 border border-border" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2 cursor-pointer hover:bg-background2 rounded-md p-2">
            <span className="font-bold text-subdued">Reminders</span>
            <ICONS.ChevronRight />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2 cursor-pointer hover:bg-background2 rounded-md p-2">
            <span className="font-bold text-subdued">Messengers</span>
            <ICONS.ChevronRight />
          </div>
        </div>
      </div>

      <div className="mt-7">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Projects;
