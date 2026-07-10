export interface IndexingProgress {
  total: number;
  completed: number;
  failed: number;
  currentGame?: string;
  percentage: number,
  running: boolean;
  cancelled: boolean;
  finished: boolean;
}

