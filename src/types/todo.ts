export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskCategory = 'WORK' | 'PERSONAL' | 'GENERAL';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  createdAt: string;
}

export interface TodoFilters {
  search: string;
  status: 'ALL' | TaskStatus;
  priority: 'ALL' | TaskPriority;
  category: 'ALL' | TaskCategory;
}

export interface TodoStats {
  total: number;
  pending: number;
  inProgress: number;
  done: number;
  high: number;
  medium: number;
  low: number;
}