export type Iconprops = {
  color?: string;
  className?: string;
  onClick?: () => void;
  stroke?: string;
  strokeWidth?: string;
  width?: number;
  height?: number;
  feColorMatrix?: string;
  fillOpacity?: string;
  viewBox?: string;
};

// Define Status type manually if not exported by @prisma/client
export type Status = 'TODO' | 'PROGRESS' | 'DONE';

export type Task = {
  id: string
  title: string
  category: string
  progress?: number
  date: string
  status?: Status
}

export type CreateTaskData = {
  title: string
  category: string
  progress?: number
  date: string
  status?: Status
}

export type UpdateTaskData = Partial<CreateTaskData>

export type SortOption = "name-asc" | "name-desc" | "date-asc" | "date-desc";
