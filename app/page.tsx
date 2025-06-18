"use client";

import { ICONS } from "@/assets/Icons";
import BoardView from "@/components/BoardView";
import NewTask from "@/components/NewTask";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="m-8">
      {/* <Menu /> */}
      <Tabs defaultValue="view" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="view">
              <div className="flex items-center gap-2">
                <ICONS.Board />
                <p className="text-primary font-semibold">Board view</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="add">
              <div className="flex items-center gap-2">
                <div className="bg-background2 p-2 rounded-full">
                  <ICONS.Plus />
                </div>
                <p className="text-primary font-semibold">Add view</p>
              </div>
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-4">
            <p className="text-primary font-semibold">Filter</p>
            <p className="text-subdued font-semibold">Sort</p>
            <div className="border-2 border-border rounded-full w-[26px] h-[26px] flex items-center justify-center">
              <ICONS.HorizontalEllipsis />
            </div>
            <Button className="rounded-[19px] font-semibold py-3 px-6 dark:bg-[#4B69FF] dark:text-white">
              New template
            </Button>
          </div>
        </div>
        <TabsContent value="view">
          <BoardView />
        </TabsContent>
        <TabsContent value="add">
          <NewTask />
        </TabsContent>
      </Tabs>
    </div>
  );
}
