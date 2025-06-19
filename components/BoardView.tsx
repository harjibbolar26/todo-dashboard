import React, { useMemo } from "react";
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
import { Task } from "@/types";

export type SortOption = "name-asc" | "name-desc" | "date-asc" | "date-desc";

interface BoardViewProps {
  sortBy?: SortOption;
  searchQuery?: string;
}

const BoardView = ({ sortBy = "date-desc", searchQuery = "" }: BoardViewProps) => {
  const { tasks, updateTask } = useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.category?.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return sorted;
  }, [tasks, searchQuery, sortBy]);

  const groupByStatus: { [key: string]: Task[] } = {
    TODO: [],
    PROGRESS: [],
    DONE: [],
  };

  filteredAndSortedTasks.forEach((task) => {
    if (
      task.status &&
      groupByStatus[task.status as keyof typeof groupByStatus]
    ) {
      groupByStatus[task.status as keyof typeof groupByStatus].push(task);
    }
  });

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = filteredAndSortedTasks.find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as string;

    const task = filteredAndSortedTasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    try {
      await updateTask(taskId, { status: newStatus as Task["status"] });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  return (
    <div className="mt-6">
      {searchQuery.trim() && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Found {filteredAndSortedTasks.length} task(s) matching &quot;{searchQuery}&quot;
          </p>
        </div>
      )}

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="lg:grid flex flex-col grid-cols-3 gap-6">
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

      {searchQuery.trim() && filteredAndSortedTasks.length === 0 && (
        <div className="mt-8 text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            Try adjusting your search terms or create a new task.
          </p>
        </div>
      )}
    </div>
  );
};

export default BoardView;