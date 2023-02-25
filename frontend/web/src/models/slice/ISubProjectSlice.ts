import { IWorkTask } from "..";

export interface ISubProjectSlice {
  loading?: boolean;
  workTasks?: Array<IWorkTask> | null;
}
