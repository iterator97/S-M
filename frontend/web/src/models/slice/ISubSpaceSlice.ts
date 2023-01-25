import { IWorkTask } from "..";

export interface ISubSpaceSlice {
  loading?: boolean;
  workTasks?: Array<IWorkTask> | null;
}
