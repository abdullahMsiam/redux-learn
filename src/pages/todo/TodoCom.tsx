import { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { EmptyTaskState } from '@/component/todo/EmptyTaskState';
import { NewTaskModal } from '@/component/todo/NewTaskModal';
import { TaskFilterBar } from '@/component/todo/TaskFilterBar';
import { TaskStatBar } from '@/component/todo/TaskStatBar';
import { TodoHeader } from '@/component/todo/TodoHeader';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {
  Task,
  TaskCategory,
  TaskPriority,
  TaskStatus,
  TodoFilters,
  TodoStats,
} from '@/types/todo';

const INITIAL_FILTERS: TodoFilters = {
  search: '',
  status: 'ALL',
  priority: 'ALL',
  category: 'ALL',
};

export const TodoCom = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TodoFilters>(INITIAL_FILTERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = useMemo<TodoStats>(
    () => ({
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'PENDING').length,
      inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
      done: tasks.filter((t) => t.status === 'DONE').length,
      high: tasks.filter((t) => t.priority === 'HIGH').length,
      medium: tasks.filter((t) => t.priority === 'MEDIUM').length,
      low: tasks.filter((t) => t.priority === 'LOW').length,
    }),
    [tasks]
  );

  const filteredTodos = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch = !query || task.title.toLowerCase().includes(query);
      const matchesStatus =
        filters.status === 'ALL' || task.status === filters.status;
      const matchesPriority =
        filters.priority === 'ALL' || task.priority === filters.priority;
      const matchesCategory =
        filters.category === 'ALL' || task.category === filters.category;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tasks, filters]);

  const hasActiveFilters =
    filters.search.trim() !== '' ||
    filters.status !== 'ALL' ||
    filters.priority !== 'ALL' ||
    filters.category !== 'ALL';

  const handleAddTask = (newTask: {
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    category: TaskCategory;
  }) => {
    const created: Task = {
      id: crypto.randomUUID(),
      title: newTask.title,
      status: newTask.status,
      priority: newTask.priority,
      category: newTask.category,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [created, ...prev]);
  };

  const handleStatusUpdate = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div>
      <div className="min-h-screen bg-[#09090b] text-zinc-100">
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 sm:px-6">
          <TodoHeader onOpenNewTask={() => setIsModalOpen(true)} />

          <TaskStatBar stats={stats} />

          <TaskFilterBar
            filters={filters}
            onSearchChange={(search) =>
              setFilters((prev) => ({ ...prev, search }))
            }
            onStatusChange={(status) =>
              setFilters((prev) => ({ ...prev, status }))
            }
            onPriorityChange={(priority) =>
              setFilters((prev) => ({ ...prev, priority }))
            }
            onCategoryChange={(category) =>
              setFilters((prev) => ({ ...prev, category }))
            }
            onClearFilters={handleClearFilters}
          />

          {filteredTodos.length === 0 ? (
            <EmptyTaskState
              hasActiveFilters={tasks.length > 0 && hasActiveFilters}
              onResetFilters={handleClearFilters}
            />
          ) : (
            <ul className="space-y-2.5">
              {filteredTodos.map((task) => (
                <li
                  key={task.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800/90 bg-[#121214] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        task.status === 'DONE'
                          ? 'text-sm font-medium text-zinc-500 line-through'
                          : 'text-sm font-medium text-zinc-100'
                      }
                    >
                      {task.title}
                    </span>
                    <span className="rounded bg-zinc-800/80 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
                      {task.priority}
                    </span>
                    <span className="rounded border border-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400">
                      {task.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Select
                      value={task.status}
                      onValueChange={(value) =>
                        handleStatusUpdate(task.id, value as TaskStatus)
                      }
                    >
                      <SelectTrigger className="h-8 w-[130px] border-zinc-800 bg-[#18181b] text-xs text-zinc-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-zinc-800 bg-[#18181b] text-zinc-200">
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="DONE">Done</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTask(task.id)}
                      aria-label={`Delete ${task.title}`}
                      className="h-8 w-8 text-zinc-400 hover:bg-zinc-800 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>

        <NewTaskModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onAddTask={handleAddTask}
        />
      </div>
    </div>
  );
};