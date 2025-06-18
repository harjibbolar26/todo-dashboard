import React from "react";
import TaskColumn from "./TaskColumn";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types";

const BoardView = () => {
  const { tasks } = useTasks();

  const groupByStatus: { [key: string]: Task[] } = {
    TODO: [],
    PROGRESS: [],
    DONE: [],
  };

  tasks.forEach((task) => {
    if (
      task.status &&
      groupByStatus[task.status as keyof typeof groupByStatus]
    ) {
      groupByStatus[task.status as keyof typeof groupByStatus].push(task);
    }
  });
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <TaskColumn title="Todo" tasks={groupByStatus.TODO} />
        <TaskColumn title="In progress" tasks={groupByStatus.PROGRESS} />
        <TaskColumn title="Done" tasks={groupByStatus.DONE} />
      </div>
    </div>
  );
};

export default BoardView;
