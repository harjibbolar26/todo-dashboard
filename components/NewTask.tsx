import { useTasks } from "@/hooks/useTasks";
import { Status } from "@/types";
import React, { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";

const NewTask = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    progress: 0,
    date: "",
    status: "TODO",
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

    if (
      !(
        form.title &&
        form.category &&
        form.date &&
        form.progress &&
        form.status
      )
    ) {
      return toast.error("Please fill all valid fields");
    }

    try {
      startTransition(() => {
        createTask({
          ...form,
          progress: Number(form.progress),
          date: new Date(form.date).toISOString(),
          status: form.status as Status,
        });
        toast.success("Task created successfully");
      });
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    }
  };

  return (
    <div>
      <p className="text-primary font-semibold lg:text-lg">
        Fill the details below to add a task
      </p>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 lg:w-1/2 md:w-2/3 w-full mt-5"
      >
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
      <Button
        variant="default"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-5"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};

export default NewTask;
