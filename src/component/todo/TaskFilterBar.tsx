import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { TaskCategory, TaskPriority, TaskStatus, TodoFilters } from '@/types/todo';

interface TaskFilterBarProps {
  filters: TodoFilters;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: 'ALL' | TaskStatus) => void;
  onPriorityChange: (value: 'ALL' | TaskPriority) => void;
  onCategoryChange: (value: 'ALL' | TaskCategory) => void;
  onClearFilters: () => void;
}

export function TaskFilterBar({
  filters,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
  onClearFilters,
}: TaskFilterBarProps) {
  return (
    <section
      aria-label="Task filters"
      className="flex flex-col gap-3 rounded-xl border border-zinc-800/90 bg-[#121214] p-3 sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          type="text"
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="h-9 border-zinc-800 bg-[#18181b] pl-9 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <Select
          value={filters.status}
          onValueChange={(value) => onStatusChange(value as 'ALL' | TaskStatus)}
        >
          <SelectTrigger
            aria-label="Filter by status"
            className="h-9 w-[128px] border-zinc-800 bg-[#18181b] text-sm text-zinc-200 focus:ring-zinc-700"
          >
            <SelectValue placeholder=" " />
          </SelectTrigger>
          <SelectContent className="border-zinc-800 bg-[#18181b] text-zinc-200">
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.priority}
          onValueChange={(value) =>
            onPriorityChange(value as 'ALL' | TaskPriority)
          }
        >
          <SelectTrigger
            aria-label="Filter by priority"
            className="h-9 w-[128px] border-zinc-800 bg-[#18181b] text-sm text-zinc-200 focus:ring-zinc-700"
          >
            <SelectValue placeholder=" " />
          </SelectTrigger>
          <SelectContent className="border-zinc-800 bg-[#18181b] text-zinc-200">
            <SelectItem value="ALL">All Priority</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.category}
          onValueChange={(value) =>
            onCategoryChange(value as 'ALL' | TaskCategory)
          }
        >
          <SelectTrigger
            aria-label="Filter by category"
            className="h-9 w-[128px] border-zinc-800 bg-[#18181b] text-sm text-zinc-200 focus:ring-zinc-700"
          >
            <SelectValue placeholder=" " />
          </SelectTrigger>
          <SelectContent className="border-zinc-800 bg-[#18181b] text-zinc-200">
            <SelectItem value="ALL">All Category</SelectItem>
            <SelectItem value="WORK">Work</SelectItem>
            <SelectItem value="PERSONAL">Personal</SelectItem>
            <SelectItem value="GENERAL">General</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="ghost"
          onClick={onClearFilters}
          className="h-9 px-2.5 text-sm font-normal text-zinc-300 hover:bg-zinc-800/70 hover:text-zinc-100"
        >
          <X className="mr-1.5 h-3.5 w-3.5 text-zinc-400" />
          Clear
        </Button>
      </div>
    </section>
  );
}