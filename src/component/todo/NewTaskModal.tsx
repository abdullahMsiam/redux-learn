import { useState, type FormEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { TaskCategory, TaskPriority, TaskStatus } from '@/types/todo';

interface NewTaskInput {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
}

interface NewTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: NewTaskInput) => void;
}

export function NewTaskModal({
  open,
  onOpenChange,
  onAddTask,
}: NewTaskModalProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<TaskStatus>('PENDING');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [category, setCategory] = useState<TaskCategory>('GENERAL');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onAddTask({ title: trimmed, status, priority, category });
    setTitle('');
    setStatus('PENDING');
    setPriority('MEDIUM');
    setCategory('GENERAL');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-zinc-800 bg-[#121214] text-zinc-100 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="task-title" className="text-zinc-300">
              Task Title
            </Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Build task filter bar"
              className="border-zinc-800 bg-[#18181b] text-zinc-100"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Status</Label>
              <Select
                value={status}
                onValueChange={(val) => setStatus(val as TaskStatus)}
              >
                <SelectTrigger className="border-zinc-800 bg-[#18181b] text-zinc-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-zinc-800 bg-[#18181b] text-zinc-200">
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-zinc-300">Priority</Label>
              <Select
                value={priority}
                onValueChange={(val) => setPriority(val as TaskPriority)}
              >
                <SelectTrigger className="border-zinc-800 bg-[#18181b] text-zinc-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-zinc-800 bg-[#18181b] text-zinc-200">
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-zinc-300">Category</Label>
              <Select
                value={category}
                onValueChange={(val) => setCategory(val as TaskCategory)}
              >
                <SelectTrigger className="border-zinc-800 bg-[#18181b] text-zinc-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-zinc-800 bg-[#18181b] text-zinc-200">
                  <SelectItem value="GENERAL">General</SelectItem>
                  <SelectItem value="WORK">Work</SelectItem>
                  <SelectItem value="PERSONAL">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
            >
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}