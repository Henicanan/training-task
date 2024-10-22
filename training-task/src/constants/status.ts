export const taskStatuses = {
  open: "open",
  close: "close",
} as const;

export type TaskStatus = keyof typeof taskStatuses;
