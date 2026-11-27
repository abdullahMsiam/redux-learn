import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TodoHeaderProps {
  onOpenNewTask: () => void;
}

export function TodoHeader({ onOpenNewTask }: TodoHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Todo
        </h1>
        <p className="mt-0.5 text-sm text-zinc-400">
          State managed using React state
        </p>
      </div>

      <Button
        type="button"
        onClick={onOpenNewTask}
        className="h-9 rounded-md bg-zinc-100 px-3.5 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
      >
        <Plus className="mr-1.5 h-4 w-4 stroke-[2.2]" />
        New Task
      </Button>
    </header>
  );
}