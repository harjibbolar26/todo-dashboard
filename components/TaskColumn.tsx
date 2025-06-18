import React from "react";
import TaskCard, { TaskCardLoader } from "./TaskCard";
import { Task } from "@/types";
import { useTasks } from "@/hooks/useTasks";

interface TaskColumnProps {
  title: string;
  tasks?: Task[]; // Replace 'any' with a more specific type if available
  status?: string; // Optional, can be used for filtering or styling
}

const TaskColumn = ({ title, tasks }: TaskColumnProps) => {
  const { loading, error } = useTasks();
  return (
    <div className="rounded-[12px] border-2 border-dashed border-[#1C1D2214] bg-white dark:bg-[#24262C] px-4 py-5">
      <p className="text-subdued font-semibold text-sm">
        {title} ({tasks?.length})
      </p>
      <div className="flex flex-col gap-6 mt-6">
        {loading ? (
          [1, 2, 3, 4].map((_, index) => <TaskCardLoader key={index} />)
        ) : tasks && tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : error ? (
          <p className="text-red-500 font-medium text-sm">
            Error loading tasks
          </p>
        ) : (
          <p className="text-subdued font-medium text-sm">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
