"use client";

import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types";
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

type Props = {
  task: Task;
  onClose: () => void;
};

export default function EditTaskDialog({ task, onClose }: Props) {
  const { updateTask } = useTasks();
  const [form, setForm] = useState({
    title: task.title,
    category: task.category,
    progress: task.progress || 0,
    date: task.date.slice(0, 10), // format for input[type="date"]
    status: task.status || "TODO",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [isEditing, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      (form.status === "PROGRESS" || form.status === "DONE") &&
      Number(form.progress) < 20
    ) {
      toast.error(
        `Task progress must be at least 20% to be in ${form.status.toLowerCase()}`
      );
      return;
    }

    try {
      startTransition(() => {
        updateTask(task.id, {
          ...form,
          progress: Number(form.progress),
          date: new Date(form.date).toISOString(),
        });
        toast.success("Task updated successfully");
        onClose();
      });
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="">
            <label htmlFor="title" className="text-primary font-semibold">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border rounded px-3 py-2 mt-2"
              required
            />
          </div>
          <div className="">
            <label htmlFor="category" className="text-primary font-semibold">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border rounded px-3 py-2 mt-2"
              required
            />
          </div>
          <div className="">
            <label htmlFor="progress" className="text-primary font-semibold">
              Progress (%)
            </label>
            <input
              name="progress"
              type="number"
              value={form.progress}
              onChange={handleChange}
              min={0}
              max={100}
              className="w-full border rounded px-3 py-2 mt-2"
              required
            />
          </div>
          <div className="">
            <label htmlFor="date" className="text-primary font-semibold">
              Date
            </label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-2"
              required
            />
          </div>
          <div className="">
            <label htmlFor="status" className="text-primary font-semibold">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-2 dar:text-white"
            >
              <option value="TODO" className="dark:text-black">
                To Do
              </option>
              <option value="PROGRESS" className="dark:text-black">
                In Progress
              </option>
              <option value="DONE" className="dark:text-black">
                Done
              </option>
            </select>
          </div>
        </form>
        <DialogFooter className="flex gap-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit} disabled={isEditing}>
            {isEditing ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
