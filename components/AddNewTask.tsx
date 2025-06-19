"use client";

import { useTasks } from "@/hooks/useTasks";
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
  onClose: () => void;
  status: "TODO" | "PROGRESS" | "DONE";
};

export default function AddTaskDialog({ status, onClose }: Props) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    progress: 0,
    date: "",
  });

  const { createTask } = useTasks();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!(form.title && form.category && form.date && form.progress)) {
      return toast.error("Please fill all valid fields");
    }

    try {
      startTransition(() => {
        createTask({
          ...form,
          progress: Number(form.progress),
          date: new Date(form.date).toISOString(),
          status: status,
        });
        toast.success(`Task successfully added to ${status}`);
        onClose();
      });
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task to {status}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 w-full mt-5">
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
              min={new Date().toISOString().split("T")[0]}
              className="w-full border rounded px-3 py-2 mt-2"
              required
            />
          </div>
        </form>
        <DialogFooter className="flex gap-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
