import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard, { TaskCardLoader } from "./TaskCard";
import { Task } from "@/types";
import { useTasks } from "@/hooks/useTasks";
import { ICONS } from "@/assets/Icons";
import AddTaskDialog from "./AddNewTask";

interface TaskColumnProps {
  title: string;
  tasks?: Task[];
  status?: Task["status"];
}

const TaskColumn = ({ title, tasks, status }: TaskColumnProps) => {
  const { loading, error } = useTasks();
  const [addTask, setAddTask] = useState(false);

  const { isOver, setNodeRef } = useDroppable({
    id: status || title,
  });

  const style = {
    opacity: isOver ? 0.8 : 1,
  };

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        className={`rounded-[12px] border-2 border-dashed transition-all duration-200 ${
          isOver
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "border-[#1C1D2214] bg-white dark:bg-[#24262C]"
        } px-4 py-5`}
      >
        <div className="flex justify-between items-center">
          <p className="text-subdued font-semibold text-sm">
            {title} ({tasks?.length})
          </p>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setAddTask(true)}
          >
            <div className="bg-background2 p-1 rounded-full">
              <ICONS.Plus />
            </div>
            <p className="text-primary font-semibold text-sm">Add new task</p>
          </div>
        </div>
        <div className="flex lg:flex-col gap-6 mt-6 min-h-[200px] max-lg:overflow-x-auto">
          {loading ? (
            [1, 2, 3, 4].map((_, index) => <TaskCardLoader key={index} />)
          ) : tasks && tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : error ? (
            <p className="text-red-500 font-medium text-sm">
              Error loading tasks
            </p>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-subdued font-medium text-sm">
                {isOver ? "Drop task here" : "No tasks available"}
              </p>
            </div>
          )}
        </div>
      </div>
      {addTask && (
        <AddTaskDialog
          onClose={() => setAddTask(false)}
          status={status ?? "TODO"}
        />
      )}
    </div>
  );
};

export default TaskColumn;
