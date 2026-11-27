import type { TodoStats } from '@/types/todo';

interface TaskStatBarProps {
  stats: TodoStats;
}

export function TaskStatBar({ stats }: TaskStatBarProps) {
  const metrics = [
    { label: 'TOTAL', value: stats.total, showCount: true },
    { label: 'PENDING', value: stats.pending, showCount: stats.pending > 0 },
    {
      label: 'IN PROGRESS',
      value: stats.inProgress,
      showCount: stats.inProgress > 0,
    },
    { label: 'DONE', value: stats.done, showCount: stats.done > 0 },
    { label: 'HIGH', value: stats.high, showCount: stats.high > 0 },
    { label: 'MEDIUM', value: stats.medium, showCount: stats.medium > 0 },
    { label: 'LOW', value: stats.low, showCount: stats.low > 0 },
  ];

  return (
    <section
      aria-label="Task statistics"
      className="rounded-xl border border-zinc-800/90 bg-[#121214] px-6 py-4"
    >
      <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-4 lg:grid-cols-7 lg:gap-x-6">
        {metrics.map((item) => (
          <div key={item.label} className="flex flex-col items-start">
            <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
              {item.label}
            </span>
            <span className="mt-1 h-7 text-xl font-semibold tabular-nums text-zinc-100">
              {item.showCount ? item.value : ''}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}