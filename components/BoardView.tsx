import React from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import TaskColumn from "./TaskColumn";
import TaskCard from "./TaskCard";
import { useTasks } from "@/hooks/useTasks";
import { Status, Task } from "@/types";
import { toast } from "react-toastify";

const BoardView = () => {
  const { tasks, updateTask } = useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Status;

    // Find the task being moved
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    if (
      (newStatus === "PROGRESS" || newStatus === "DONE") &&
      (task.progress ?? 0) < 20
    ) {
      toast.error(
        `Task progress must be at least 20% to be in ${newStatus.toLowerCase()}.`
      );
      return;
    }

    try {
      // Update the task status
      await updateTask(taskId, { status: newStatus });
      toast.success("Task status updated successfully");
    } catch (error) {
      console.error("Failed to update task status:", error);
      // You might want to show a toast error here
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="lg:grid grid-cols-3 max-lg:flex max-lg:flex-col gap-6">
        <TaskColumn title="Todo" tasks={groupByStatus.TODO} status="TODO" />
        <TaskColumn
          title="In progress"
          tasks={groupByStatus.PROGRESS}
          status="PROGRESS"
        />
        <TaskColumn title="Done" tasks={groupByStatus.DONE} status="DONE" />
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 opacity-80">
            <TaskCard task={activeTask} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardView;
