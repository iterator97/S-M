import { IWorkTask } from "../workTask/IWorkTask";

export interface IWorkTaskSlice {
  workTasks?: Array<IWorkTask> | null;
  loading?: boolean;
}
