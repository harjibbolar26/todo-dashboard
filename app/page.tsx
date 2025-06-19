"use client";

import { ICONS } from "@/assets/Icons";
import BoardView from "@/components/BoardView";
import NewTask from "@/components/NewTask";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

export type SortOption = "name-asc" | "name-desc" | "date-asc" | "date-desc";

export default function Home() {
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getSortLabel = (sortOption: SortOption) => {
    switch (sortOption) {
      case "name-asc":
        return "Name (A-Z)";
      case "name-desc":
        return "Name (Z-A)";
      case "date-asc":
        return "Date (Oldest)";
      case "date-desc":
        return "Date (Newest)";
      default:
        return "Date (Newest)";
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowFilter(false);
  };

  return (
    <div className="lg:m-8 m-4">
      <Tabs defaultValue="view" className="w-full">
        <div className="flex md:flex-row flex-col gap-1 justify-between lg:items-center">
          <TabsList>
            <TabsTrigger value="view">
              <div className="flex items-center gap-2">
                <ICONS.Board />
                <p className="text-primary font-semibold max-md:text-sm">
                  Board view
                </p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="add">
              <div className="flex items-center gap-2">
                <div className="bg-background2 p-2 rounded-full">
                  <ICONS.Plus />
                </div>
                <p className="text-primary font-semibold max-md:text-sm">
                  Add view
                </p>
              </div>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setShowFilter(!showFilter)}
              className={`font-semibold ${
                showFilter ? "text-blue-600" : "text-primary"
              }`}
            >
              <Search className="w-4 h-4 mr-1" />
              Filter
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-semibold text-subdued">
                  Sort
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setSortBy("name-asc")}
                  className={sortBy === "name-asc" ? "bg-accent" : ""}
                >
                  Name (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("name-desc")}
                  className={sortBy === "name-desc" ? "bg-accent" : ""}
                >
                  Name (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("date-asc")}
                  className={sortBy === "date-asc" ? "bg-accent" : ""}
                >
                  Date (Oldest)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("date-desc")}
                  className={sortBy === "date-desc" ? "bg-accent" : ""}
                >
                  Date (Newest)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="border-2 border-border rounded-full w-[26px] h-[26px] flex items-center justify-center">
              <ICONS.HorizontalEllipsis />
            </div>

            <Button className="rounded-[19px] font-semibold py-3 px-6 dark:bg-[#4B69FF] dark:text-white">
              New template
            </Button>
          </div>
        </div>
        
        {showFilter && (
          <div className="mt-4 flex items-center gap-2 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilter(false)}
            >
              Hide
            </Button>
          </div>
        )}

        {(searchQuery || sortBy !== "date-desc") && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <span>Active filters:</span>
            {searchQuery && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                Search: &quot;{searchQuery}&quot;
              </span>
            )}
            {sortBy !== "date-desc" && (
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                Sort: {getSortLabel(sortBy)}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSortBy("date-desc");
                setShowFilter(false);
              }}
              className="text-xs h-auto p-1"
            >
              Clear all
            </Button>
          </div>
        )}

        <TabsContent value="view">
          <BoardView sortBy={sortBy} searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="add">
          <NewTask />
        </TabsContent>
      </Tabs>
    </div>
  );
}
