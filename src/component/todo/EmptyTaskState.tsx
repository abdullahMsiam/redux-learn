import { ClipboardList } from 'lucide-react';

interface EmptyTaskStateProps {
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export function EmptyTaskState({
  hasActiveFilters,
  onResetFilters,
}: EmptyTaskStateProps) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-zinc-800/90 bg-[#121214] px-6 py-14 text-center">
      <ClipboardList className="mb-3 h-7 w-7 stroke-[1.6] text-zinc-400" />
      <h2 className="text-sm font-semibold text-zinc-100">
        {hasActiveFilters ? 'No matching tasks' : 'No tasks yet'}
      </h2>
      <p className="mt-1 text-xs text-zinc-400">
        {hasActiveFilters ? (
          <>
            Try adjusting your filters or{' '}
            <button
              type="button"
              onClick={onResetFilters}
              className="underline underline-offset-2 hover:text-zinc-200"
            >
              clear filters
            </button>
            .
          </>
        ) : (
          'Click "New Task" to get started.'
        )}
      </p>
    </div>
  );
}