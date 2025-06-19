import { ICONS } from "@/assets/Icons";
import React, { useState, useTransition } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Progress } from "./ui/progress";
import { Task } from "@/types";
import { twMerge } from "tailwind-merge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useTasks } from "@/hooks/useTasks";
import { toast } from "react-toastify";
import EditTaskDialog from "./EditDialog";
import { Skeleton } from "./ui/skeleton";

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

const TaskCard = ({ task, isDragging = false }: TaskCardProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { deleteTask } = useTasks();

  const [isDeleting, startTransition] = useTransition();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: isBeingDragged,
  } = useDraggable({
    id: task.id,
    disabled: isDragging,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const handleDelete = () => {
    if (selectedTask) {
      startTransition(() => {
        deleteTask(selectedTask.id);
        toast.success("Task deleted successfully");
        setOpenDeleteDialog(false);
      });
    } else {
      toast.error("No task selected for deletion");
    }
  };

  return (
    <div className="">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`bg-white dark:bg-[#292B31] rounded-[12px] p-6 border-2 border-[#1C1D220F] transition-all duration-200 cursor-grab active:cursor-grabbing max-lg:min-w-[320px] ${
          isBeingDragged ? "opacity-50 rotate-2 scale-105 shadow-lg" : ""
        } ${isDragging ? "cursor-default" : ""} hover:shadow-md`}
      >
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-primary font-bold max-lg:text-sm">
              {task.title}
            </p>
            <p className="mt-[6px] text-subdued font-medium text-sm">
              {task.category}
            </p>
          </div>
          {!isDragging && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className="border-2 border-border rounded-full w-[26px] h-[26px] flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ICONS.HorizontalEllipsis />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onSelect={() => {
                    setSelectedTask(task);
                    setOpenEditDialog(true);
                  }}
                >
                  Edit task
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setSelectedTask(task);
                    setOpenDeleteDialog(true);
                  }}
                >
                  Delete task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="mt-[22px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ICONS.Menu2 />
              <p className="text-subdued font-semibold text-sm">Progress</p>
            </div>
            <p className="text-primary font-semibold text-sm">
              {task.progress}/100
            </p>
          </div>
          <Progress
            value={task.progress}
            className="mt-2 h-1 bg-[#1C1D2214] dark:bg-[#FFFFFF1A]"
            valueBg={twMerge(
              task.status === "TODO"
                ? "bg-[#FF7979]"
                : task.status === "PROGRESS"
                ? "bg-[#FFA048]"
                : "bg-[#78D700]"
            )}
          />
          <div className="flex items-center justify-between mt-5">
            <div className="rounded-[17px] py-[10px] px-4 bg-border text-[#888DA7] dark:text-[#989CAA] font-semibold text-sm w-fit">
              {new Date(task.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <ICONS.Comment />
                <span className="text-subdued text-sm font-semibold">2</span>
              </div>
              <div className="flex items-center gap-1">
                <ICONS.Attach />
                <span className="text-subdued text-sm font-semibold">13</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isDragging && (
        <>
          <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete this task?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your task from the dashboard.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex gap-6">
                <Button variant="secondary">Cancel</Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {openEditDialog && selectedTask && (
            <EditTaskDialog
              task={selectedTask}
              onClose={() => setOpenEditDialog(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TaskCard;

export const TaskCardLoader = () => (
  <Skeleton className="rounded-[12px] bg-muted/50 dark:bg-muted/30 border-2 border-border p-6 max-lg:min-w-[320px]">
    <div>
      <Skeleton className="h-5 w-full rounded-2xl bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-3 w-full mt-2 rounded-2xl bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-full mt-[28px] rounded-2xl bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-2 w-full mt-3 rounded-2xl bg-gray-200 dark:bg-gray-700" />
      <div className="flex items-center justify-between mt-[12px]">
        <Skeleton className="h-7 w-1/2 rounded-2xl bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  </Skeleton>
);
